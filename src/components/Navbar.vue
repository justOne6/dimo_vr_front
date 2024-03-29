<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <router-link to="/"><img src="../assets/Dimo.png" style="width: 35px !important" /></router-link>
    <div class="links" v-if="$route.path !== '/sign-in' &&
      $route.path !== '/forgotten-password' &&
      $route.path !== '/sign-up'
      ">
      <router-link to="/" :class="{ 'active-link': $route.path === '/dashboard' }"><span class="material-icons">home
        </span></router-link>
      <router-link to="/manage-account"
        :class="{ 'active-link': $route.path === '/manage-account' }">Account</router-link>
      <router-link to="/custom" :class="{ 'active-link': $route.path === '/custom' }">Custom</router-link>
      <router-link to="/quizz" :class="{ 'active-link': $route.path === '/quizz' }">Quizz</router-link>
    </div>
    <div style="
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: auto !important;
      " v-if="$route.path !== '/sign-in' &&
      $route.path !== '/sign-up' &&
      $route.path !== '/forgotten-password'
      ">
      <button @click="clickProfile">
        <span class="material-icons" style="color: var(--bluePurple)">
          account_circle
        </span>
      </button>
    </div>
    <div v-if="this.profileClicked" style="
         background-color: var(--input) !important;
         color: black;
         position: absolute;
         right: 10px;
         margin-top: 18vh;
         width: fit-content;
         border-radius: 5px">
      <li class="profile" @click="editProfile">Edit profile</li>
      <li class="profile" @click="logOut">Log Out</li>
    </div>
    <div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      profileClicked: false,
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      this.$router.push("/sign-in");
    },
    editProfile() {
      this.$router.push("/manage-account");
    },
    clickProfile() {
      this.profileClicked = !this.profileClicked;
      console.log("this.profileChecked : " + this.profileClicked);
    },
  },
};
</script>

<style scoped>
.active-link {
  font-weight: bold;
}

.dimo {
  color: var(--darkPurple);
  /*font-weight: bold;*/
  font-size: 26px;
}

.profile {
  list-style-type: none;
  padding: 15px 30px;
  cursor: pointer;
  color: grey
}

.profile:hover {
  background-color: var(--lightPurple);
  color: white
}

.vr {
  font-weight: bold;
  font-size: 26px;
  display: inline-block;
  background: linear-gradient(to bottom, var(--nightPurple), white);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar {
  background-color: var(--background);
  font-family: "Fredoka One", sans-serif;
  padding: 10px;
  display: flex;
  align-items: center;
  color: rgb(10, 8, 8);
  position: fixed !important;
  top: 0;
  width: 100%;
  margin-bottom: 20px !important;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin: auto 0 !important;
}

.links {
  width: fit-content;
  margin-left: 10px;
  border-left: solid 1px var(--bluePurple);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.links a {
  color: var(--bluePurple);
  text-decoration: none;
  font-size: 16px;
  padding: 10px;
}

.links a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.logout {
  cursor: pointer;
  padding: 10px 20px;
  color: white !important;
  font-weight: bold;
  background-color: var(--lightRed) !important;
  border-radius: 5px;
  margin-left: auto !important;
}

.logout:hover {
  background-color: var(--mediumRed) !important;
}
</style>
