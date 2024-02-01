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
<<<<<<< HEAD
        <router-link
          v-for="roomNumber in roomNumbers"
          :key="roomNumber"
          :to="{ name: 'classroom', params: { label: roomNumber } }"
          class="room"
        >
          {{ roomNumber }}
        </router-link>
=======
        <div
          v-for="roomNumber in roomNumbers"
          :key="roomNumber"
          class="room"
          @click="toggleRoom(roomNumber)"
        >
          {{ roomNumber }}
        </div>
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
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
<<<<<<< HEAD
              placeholder="Enter Class Name"
=======
              placeholder="Enter room name"
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
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
  async mounted() {
    this.fetchUserData();
    this.fetchRoomNumbers();
<<<<<<< HEAD
    await this.fetchRoomNumbers();
=======
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
<<<<<<< HEAD
    getUserId() {
      const token = localStorage.getItem("token");
      if (token) {
        const [, payloadBase64] = token.split(".");
        const payload = JSON.parse(atob(payloadBase64));
        if (payload && payload.userId) {
          return payload.userId;
        }
      }
      return null;
    },
=======
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
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
<<<<<<< HEAD
        const userId = localStorage.getItem("user_id");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/lobbies?user_id=${userId}`"
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
=======
        const response = await axios.get("endpoint");
        this.roomNumbers = response.data;
      } catch (error) {
        console.error("Error fetching room numbers:", error);
      }
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
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
<<<<<<< HEAD
      // console.log("Open Create Room Modal clicked!");
=======
      console.log("Open Create Room Modal clicked!");
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
      this.createRoomModalOpen = true;
    },
    closeCreateRoomModal() {
      this.createRoomModalOpen = false;
    },
    async submitCreateRoom() {
      try {
<<<<<<< HEAD
        let token = localStorage.getItem("token");

=======
        console.log("Sending request to create room...");

        // Retrieve the token
        let token = localStorage.getItem("token");

        // Check if the token is available
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
        if (!token) {
          console.error("Token not found. Unable to make the request.");
          return;
        }

<<<<<<< HEAD
=======
        // Check if the token is expired
        const [, payloadBase64] = token.split(".");
        const payload = JSON.parse(atob(payloadBase64));
        const tokenExpiration = payload.exp * 1000; // Convert to milliseconds
        const currentTimestamp = Date.now();

        if (currentTimestamp > tokenExpiration) {
          console.log("Token is expired. Attempting to refresh...");

          // Attempt to refresh the token
          try {
            const refreshResponse = await axios.post(
              "http://your-auth-server/refresh-token-endpoint",
              {
                refreshToken: localStorage.getItem("refreshToken"),
              }
            );

            // If refresh is successful, update the token
            token = refreshResponse.data.accessToken;
            localStorage.setItem("token", token);

            console.log("Token refreshed successfully. New token:", token);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);

            // You might need to prompt the user to log in again
            return;
          }
        }

        // Proceed with the request using the refreshed or existing token
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
        const response = await axios.post(
          "http://127.0.0.1:8000/api/lobbies",
          {
            label: this.newRoomLabel,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
<<<<<<< HEAD
              "Content-Type": "application/ld+json",
=======
              "Content-Type": "application/ld+json", // Set the correct content type here
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
            },
          }
        );

<<<<<<< HEAD
        const newRoom = response.data;

        // Retrieve existing rooms from local storage
        const existingRooms =
          JSON.parse(localStorage.getItem("userRooms")) || [];

        // Add the new room to the array
        existingRooms.push(newRoom.label);

        // Store the updated array back to local storage
        localStorage.setItem("userRooms", JSON.stringify(existingRooms));

        // Update the component's roomNumbers with the stored rooms
        this.roomNumbers = existingRooms;
=======
        console.log("Request successful. Response:", response);

        const newRoom = response.data;

        const newRoomLabel = newRoom.label;

        this.roomNumbers.push(newRoomLabel);
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)

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
<<<<<<< HEAD
  background-color: var(--lightBlue);
  margin: 5% auto;
  padding: 40px; /* Increased padding for more space */
  border: 1px solid var(--darkBlue);
  width: 70%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  font-family: "Raleway", sans-serif;
}

.close {
  color: var(--darkBlue);
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-top: -10px; /* Adjusted margin for better alignment */
=======
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
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
}

.close:hover,
.close:focus {
<<<<<<< HEAD
  color: #555;
=======
  color: black;
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
  text-decoration: none;
  cursor: pointer;
}

<<<<<<< HEAD
.form-group {
  margin-bottom: 20px; /* Increased margin between form elements */
}

/* Adjusted spacing for the submit button */
button[type="submit"] {
  padding: 15px 20px;
  border-radius: 5px;
  background-color: var(--darkBlue);
  color: white;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: var(--mediumBlue);
}

=======
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
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
<<<<<<< HEAD
  cursor: pointer;
  text-decoration: none;
  color: inherit;
=======
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
}

.room:hover {
  background-color: var(--lightOrange);
  color: white;
<<<<<<< HEAD
  text-decoration: underline;
=======
>>>>>>> 65dfaad (fixed the roomNumber loop dynamic + endpoints for creating classroom and joining a classroom added and functionnal)
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
