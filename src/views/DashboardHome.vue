<template>
  <div>
    <Navbar />
    <div class="main">
      <div class="right"></div>
      <h1 class="inputs">Hello, {{ username }}</h1>
    </div>
    <div class="container">
      <div>
        <button class="pick square" @click="toggle">Pick a room</button>
        <button class="pick square" @click="openCreateRoomModal">
          Create a room
        </button>
      </div>
      <div
        v-if="active"
        style="display: flex; flex-direction: column; margin-left: 10px"
      >
        <div
          v-for="roomNumber in roomNumbers"
          :key="roomNumber"
          class="room"
          @click="toggleRoom(roomNumber)"
        >
          {{ roomNumber }}
        </div>
      </div>
    </div>

    <div
      v-if="createRoomModalOpen"
      class="modal"
      style="display: flex; flex-direction: column; margin-left: 10px"
    >
      <div class="modal-content">
        <span class="close" @click="closeCreateRoomModal">&times;</span>
        <h2>Create a Class Room</h2>

        <form @submit.prevent="submitCreateRoom">
          <div class="form-group">
            <label for="label">Classroom Name:</label>
            <input
              v-model="newRoomLabel"
              type="text"
              id="label"
              placeholder="Enter room name"
              required
            />
          </div>

          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  components: { Navbar },
  data() {
    return {
      username: "",
      active: false,
      roomNumbers: [],
      createRoomModalOpen: false,
      newRoomLabel: "",
      newRoomTeachers: "",
      newRoomStudents: "",
      activeRoom: "",
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchRoomNumbers();
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    fetchUserData() {
      const token = localStorage.getItem("token");

      if (token) {
        const [, payloadBase64] = token.split(".");
        const payload = JSON.parse(atob(payloadBase64));

        if (payload && payload.username) {
          this.username = payload.username;
        } else {
          console.error("Token payload does not contain the username.");
        }
      } else {
        console.error("No token found.");
      }
    },
    async fetchRoomNumbers() {
      try {
        const response = await axios.get("endpoint");
        this.roomNumbers = response.data;
      } catch (error) {
        console.error("Error fetching room numbers:", error);
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
     // console.log("Open Create Room Modal clicked!");
      this.createRoomModalOpen = true;
    },
    closeCreateRoomModal() {
      this.createRoomModalOpen = false;
    },
    async submitCreateRoom() {
      try {
       // console.log("Sending request to create room...");

        let token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found. Unable to make the request.");
          return;
        }

        const response = await axios.post(
          "http://127.0.0.1:8000/api/lobbies",
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

       // console.log("Request successful. Response:", response);

        const newRoom = response.data;

        const newRoomLabel = newRoom.label;

        this.roomNumbers.push(newRoomLabel);

        this.closeCreateRoomModal();
      } catch (error) {
        console.error("Error creating room:", error);

        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received. Request:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.main {
  margin-top: 80px !important;
  font-family: "Raleway", sans-serif !important;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.pick {
  padding: 30px 40px;
  border-radius: 0;
  background-color: var(--darkBlue);
  color: white;
  border: none;
  margin-right: 10px;
}

.pick:hover {
  background-color: var(--mediumBlue);
  color: white;
}

.room {
  background-color: var(--mediumGrey);
  padding: 30px 40px;
  border-radius: 0;
  margin-bottom: 10px;
  border: none;
}

.room:hover {
  background-color: var(--lightOrange);
  color: white;
}

.container {
  margin-top: 30px;
  justify-content: center;
  display: flex;
  padding: 0 auto !important;
  font-family: Raleway, sans-serif;
}

.room + .room {
  margin-top: 10px;
}
</style>
