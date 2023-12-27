<template>
  <div>
    <Navbar />
    <div class="main">
      <div class="right"></div>
      <h1 class="inputs">Hello, {{ username }}</h1>
    </div>
    <div class="container">
      <div><button class="pick" @click="toggle">Pick a room</button>
      </div>
      <div v-if="active" style="display: flex; flex-direction: column; margin-left: 10px;">
        <div class="room" @click="toggleRoom('1')">ROOM 1</div>
        <div class="room" @click="toggleRoom('2')">ROOM 2</div>
        <div class="room" @click="toggleRoom('3')">ROOM 3</div>
        <div class="room" @click="toggleRoom('4')">ROOM 4</div>
        <div class="room" @click="toggleRoom('5')">ROOM 5</div>
      </div>
      <div v-if="active" style="display: flex; flex-direction: column; margin-left: 10px;">
        <div class="room_case" @click="toggleRoom(this.roomNumber)" v-if="activeRoom === '1'">
          C'est la room {{ roomNumber }}
        </div>
        <div class="room_case" @click="toggleRoom(this.roomNumber)" v-if="activeRoom === '2'">
          C'est la room {{ roomNumber }}
        </div>
        <div class="room_case" @click="toggleRoom(this.roomNumber)" v-if="activeRoom === '3'">
          C'est la room {{ roomNumber }}
        </div>
        <div class="room_case" @click="toggleRoom(this.roomNumber)" v-if="activeRoom === '4'">
          C'est la room {{ roomNumber }}
        </div>
        <div class="room_case" @click="toggleRoom(this.roomNumber)" v-if="activeRoom === '5'">
          C'est la room {{ roomNumber }}
        </div>
      </div>
    </div>

  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  data() {
    return {
      username: "",
      active: false,
      activeRoom: '',
      roomNumber: 0,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    toggle () {
        this.active = !this.active
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
    showRoom(roomNumber) {
      this.activeRoom = roomNumber;
    },
    toggleRoom(roomNumber) {
      if (this.activeRoom === roomNumber) {
        this.roomNumber = roomNumber;
        this.activeRoom = '';
      } else {
        this.roomNumber = roomNumber;
        this.activeRoom = roomNumber;
      }
    },
  },
};
</script>

<style scoped>
.pick {
  padding: 30px 40px;
  border-radius: 60px;
  background-color: var(--darkBlue);
  color: white;
}

.pick:hover {
  background-color: var(--mediumBlue);
  color: white;
}

.main {
  margin-top: 80px !important;
  font-family: "Raleway", sans-serif !important;
}

.room {
  background-color: var(--mediumGrey);
  padding: 30px 40px;
  border-radius: 60px;
  margin-bottom: 10px;
}

.room:hover {
  background-color: var(--lightOrange);
  color: white;
}

.room_case {
  border: solid 1px black;
  height: 70vh;
  width: 70vw;
  padding: 10px !important;
  text-align: center;
}

.container {
  margin-top: 30px;
  justify-content: center;
  display: flex;
  padding: 0 auto !important;
  font-family: Raleway, sans-serif;
}
</style>
