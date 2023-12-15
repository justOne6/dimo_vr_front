<template>
  <div>
    <Navbar />
    <div class="main">
      <div class="right"></div>
      <h1 class="inputs">Hello, {{ username }}</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
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
  },
};
</script>

<style scoped>
.main {
  margin-top: 80px !important;
}
</style>
