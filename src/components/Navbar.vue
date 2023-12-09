<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <router-link to="/"><img src="../assets/Dimo.png" style="width: 35px !important;" /></router-link>
    <span class="dimo" style="margin-left: 10px">Dimo</span>
    <span class="vr">VR</span>
    <div class="links">
      <router-link to="/dashboard" :class="{ 'active-link': $route.path === '/dashboard' }">Dashboard</router-link>
      <router-link to="/manage-account"
        :class="{ 'active-link': $route.path === '/manage-account' }">Account</router-link>
      <router-link to="/custom" :class="{ 'active-link': $route.path === '/custom' }">Custom</router-link>
      <!--<router-link to="/forgotten-password">Forgotten Password</router-link>-->
    </div>
    <div class="logout" @click="logOut"><img src="../assets/logout.png"
        style="width: 15px !important; margin-right:8px" />Log Out</div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  components: {
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.active-link {
  font-weight: bold;
}

.navbar {
  background-color: #2a6a8a;
  font-family: "Raleway", sans-serif;
  padding: 10px;
  display: flex;
  align-items: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin: auto 0 !important;
}

.links {
  width: fit-content;
  margin-left: 10px;
  border-left: solid 1px white;
}

.links a {
  color: white;
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
  background-color: #d9534f !important;
  border-radius: 5px;
  margin-left: auto !important;
}

.logout:hover {
  background-color: #c9302c !important;
}
</style>
