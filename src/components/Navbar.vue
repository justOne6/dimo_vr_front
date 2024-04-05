<template>
  <nav class="navbar">
    <div class="page-restrict-width flex-center-content">
      <div class="nav-left">
        <router-link to="/" class="no-text-decoration flex-center-content"><img src="../assets/Dimo.png" style="width: 35px"/>
          <span class="dimo" style="margin-left: 10px">Dimo</span>
          <span class="vr-logo">VR</span>
        </router-link>
        <div class="links">
          <router-link to="/" :class="{ 'active-link': $route.path === '/' }" class="flex-center-content">
            <span class="material-icons">home</span>
          </router-link>
          <div v-if="isStudent" class="flex-center-content">
            <router-link to="/student/my-timetable" :class="{ 'active-link': $route.path === '/edt' }" class="flex-center-content">
              Emploie du temps
            </router-link>
            <router-link to="/student/my-programs" :class="{ 'active-link': $route.path === '/student-programs' }" class="flex-center-content">
              Mes programmes
            </router-link>
            <router-link to="/student/my-marks" :class="{ 'active-link': $route.path === '/my-marks' }" class="flex-center-content">
              Mes notes
            </router-link>
          </div>
          <div v-else-if="isTeacher" class="flex-center-content">
            <router-link to="/teacher/add-program" :class="{ 'active-link': $route.path === '/teacher/add-program' }" class="flex-center-content">
              Nouveau Programme
            </router-link>
          </div>
          <div v-else-if="isAdmin" class="flex-center-content">
            <router-link to="/admin/register-teacher" :class="{ 'active-link': $route.path === '/register-teacher' }" class="flex-center-content">
              Ajouter un professseur
            </router-link>
          </div>
        </div>
      </div>
      <div class="nav-right">
        <div v-if="isAuthenticated">
          <DropdownAccount/>
        </div>
        <div v-else>
          <router-link to="/sign-in" class="no-text-decoration"><span class="material-icons">login</span>
          </router-link>
        </div>
      </div>
      </div>
  </nav>
</template>

<script>
import axios from "axios";

import {mapGetters, mapState} from "vuex";
import DropdownAccount from "@/components/DropdownAccount.vue";

export default {
  name: "AppNavbar",
  components: {
    DropdownAccount
  },
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
  computed: {
    ...mapGetters(["isRolePresent"]),
    ...mapState(["isAuthenticated"]),
    isStudent() {
      return this.isRolePresent("student");
    },
    isTeacher() {
      return this.isRolePresent("teacher");
    },
    isAdmin() {
      return this.isRolePresent("admin");
    },
  },
};
</script>

<style scoped>
.active-link {
  font-weight: bold;
}

.profile {
  list-style-type: none;
  padding: 15px 30px;
  cursor: pointer;
  color: grey
}

/* When account icon is clicked */
.click_profile {
  background-color: var(--input) !important;
  color: black;
  position: absolute;
  right: 10px;
  margin-top: 18vh;
  width: fit-content;
  border-radius: 5px
}

.profile:hover {
  background-color: var(--lightPurple);
  color: white
}

.vr-logo {
  font-weight: bold;
  font-size: 26px;
  display: inline-block;
  background: linear-gradient(to bottom, var(--nightPurple), white);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar {
  display: flex;
  flex-direction: row;
  background-color: var(--background);
  font-family: "Fredoka One", sans-serif;
  padding: 10px;
  align-items: center;
  color: rgb(10, 8, 8);
  position: fixed !important;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.nav-left{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-right {
  margin-left: auto;
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

.nav-profile{
  background-color: white;
  color: black;
  position: absolute;
  right: 10px;
  margin-top: 18vh;
  width: fit-content;
}

.logout:hover {
  background-color: var(--mediumRed) !important;
}
</style>
