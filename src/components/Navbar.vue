<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar">
    <div class="logo-container">
      <DimoVR class="logo" />
    </div>
    <div class="links">
      <router-link to="/dashboard" :class="{ 'active-link': $route.path === '/dashboard' }">Dashboard</router-link>
      <router-link to="/manage-account" :class="{ 'active-link': $route.path === '/manage-account' }">Manage
        Account</router-link>
      <router-link to="/custom" :class="{ 'active-link': $route.path === '/custom' }">Custom</router-link>
      <!--<router-link to="/forgotten-password">Forgotten Password</router-link>-->
    </div>
    <div class="logout" @click="logOut">Log Out</div>
  </nav>
</template>

<script>
import DimoVR from "@/components/DimoVR.vue";
import axios from "axios";

export default {
  components: {
    DimoVR,
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
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  margin-right: 20px;
  /* Espacement à droite du logo */
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
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
}

.logout:hover {
  background-color: #c9302c !important;
}
</style>
