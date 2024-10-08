<template>
  <div>
    <Navbar />
    <div class="container">
      <p class="inputs" style="text-align: center">Hello {{ user.firstname }} !</p>
      <div class="content">
        <div>
          <button class="pick square" @click="toggle">Pick a room</button>
          <button class="pick square" @click="openCreateRoomModal">
            Create a room
          </button>
        </div>
        <div v-if="active" style="display: flex; flex-direction: column; margin-left: 10px">
          <router-link v-for="roomNumber in roomNumbers" :key="roomNumber"
            :to="{ name: 'classroom', params: { label: roomNumber } }" class="room">
            {{ roomNumber }}
          </router-link>
        </div>
      </div>
      <div v-if="createRoomModalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeCreateRoomModal">&times;</span>
          <p class="inputs">
            Create a class room</p>
          <form @submit.prevent="submitCreateRoom">
            <div class="input_container">
              <p class="input_title">Classroom name
              </p>
              <input class="input" v-model="newRoomLabel" placeholder="Enter class name" required />
            </div>
            <button type="submit">Create room</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue"

export default {
  components: { Navbar },
  data() {
    return {
      user: [],
      active: false,
      roomNumbers: [],
      createRoomModalOpen: false,
      newRoomLabel: "",
      newRoomTeachers: "",
      newRoomStudents: "",
      activeRoom: "",
    };
  },
  async mounted() {
    this.fetchUserData();
    await this.fetchRoomNumbers();
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    fetchUserData() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    async fetchRoomNumbers() {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await axios.get(
          `${process.env.VUE_APP_API_URI}/api/findAllLobbiesForCurrentUser`
        );
        console.log("Fetched room numbers:", response.data);

        const fetchedRoomNumbers = response.data["hydra:member"];

        this.roomNumbers = Array.isArray(fetchedRoomNumbers)
          ? fetchedRoomNumbers.map((lobby) => lobby.label)
          : [];

        // Use Promise.all to wait for all subscriptions to complete
        await Promise.all(
          fetchedRoomNumbers.map((lobby) =>
            this.subscribeToLobby(lobby.id, userId, "add")
          )
        );
      } catch (error) {
        console.error("Error fetching room numbers:", error);
      }
    },

    async subscribeToLobby(lobbyId, userId, action) {
      try {
        const response = await axios.post("/api/subscribeLobby", {
          lobby_id: lobbyId,
          user_id: userId,
          action: action,
        });
        console.log("Subscription request successful. Response:", response);
      } catch (error) {
        console.error("Error subscribing to lobby:", error);
      }
    },
    toggleRoom(roomNumber) {
      if (this.activeRoom === roomNumber) {
        this.activeRoom = "";
      } else {
        this.activeRoom = roomNumber;
      }
    },
    showRoom(roomNumber) {
      this.activeRoom = roomNumber;
    },
    openCreateRoomModal() {
      this.createRoomModalOpen = true;
    },
    closeCreateRoomModal() {
      this.createRoomModalOpen = false;
    },
    async submitCreateRoom() {
      try {
        let token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found. Unable to make the request.");
          return;
        }

        const response = await axios.post(
          `${process.env.VUE_APP_API_URI}/createNewLobby`,
          {
            label: this.newRoomLabel,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/ld+json",
            },
          }
        );

        const newRoom = response.data;

        // Retrieve existing rooms from local storage
        const existingRooms = JSON.parse(localStorage.getItem("userRooms")) || [];

        // Add the new room to the array
        existingRooms.push(newRoom.label);

        // Store the updated array back to local storage
        localStorage.setItem("userRooms", JSON.stringify(existingRooms));

        // Update the component's roomNumbers with the stored rooms
        this.roomNumbers = existingRooms;

        this.closeCreateRoomModal();
      } catch (error) {
        console.error("Error creating room:", error);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}

.modal-content {
  background-color: var(--lightPurple);
  margin: 5% auto;
  padding: 40px;
  border: 1px solid var(--darkPurple);
  width: 70%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  font-family: "Fredoka One", sans-serif;
}

.close {
  color: var(--darkPurple);
  text-align: right;
  font-size: 28px;
  font-weight: bold;
  margin-top: -10px;
}

.close:hover,
.close:focus {
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

/* Adjusted spacing for the submit button */
button[type="submit"] {
  padding: 15px 20px;
  border-radius: 5px;
  background-color: var(--darkPurple);
  color: white;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: var(--nightPurple);
}

.pick {
  padding: 30px 40px;
  border-radius: 20px;
  background-color: var(--darkPurple);
  color: white;
  border: none;
  margin-right: 10px;
}

.pick:hover {
  background-color: var(--nightPurple);
  color: white;
}

.room {
  background-color: var(--background);
  padding: 30px 40px;
  border-radius: 0;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.room:hover {
  background-color: var(--lightOrange);
  color: white;
  text-decoration: underline;
}

.content {
  margin-top: 30px;
  justify-content: center;
  display: flex;
  padding: 0 auto !important;
  font-family: 'Fredoka One', sans-serif;
}

.room+.room {
  margin-top: 10px;
}
</style>
