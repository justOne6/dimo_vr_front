<template>
  <div>
    <Navbar />
    <div class="main">
      <div class="right">
        <div class="inputs">
          <p class="create">Manage your Account {{ username }} !</p>
        </div>
      </div>
      <div
        class="left"
        style="
          border: solid 1px red;
          width: fit-content;
          padding: 2%;
          margin-top: -200px;
        "
      >
        <p class="edits">Home</p>
        <p class="edits">Personal informations</p>
        <p class="edits">Security and confidentiality</p>
        <p class="edits">Contact and share</p>
        <v-divider style="color: black; height: 2px"></v-divider>
        <p class="edits">About</p>
      </div>
    </div>
  </div>
</template>

<script>
import { generalColors } from "../../globalVars";
import Navbar from "@/components/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      medimuBlue: generalColors.mediumBlue,
      darkBlue: generalColors.darkBlue,
      mediumGrey: generalColors.mediumGrey,
      boldOrange: generalColors.boldOrange,
      lightOrange: generalColors.lightOrange,
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
          this.username = payload.username; // Adjust this line based on your token structure
        } else {
          console.error(
            "Token payload does not contain the expected username."
          );
        }
      } else {
        console.error("No token found.");
      }
    },
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}

.main {
  font-family: "Raleway", sans-serif;
  margin-top: 8%;
  margin-bottom: auto;
}

.edits {
  margin: 10% auto;
  font-size: 18px;
}

.dimo {
  color: var(--lightOrange);
  font-weight: bold;
}

.title {
  font-size: 48px;
  margin: 0 auto !important;
  width: fit-content;
}

.create {
  color: #2a6a8a !important;
  font-weight: bold;
  font-size: 32px;
  margin: 5% auto 10% auto;
}

.input {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10%;
  background-color: #e6e6e6;
  font-size: 16px;
}

.signup {
  margin: 0 auto;
  width: fit-content;
  border-radius: 5px;
}

.signup_button {
  padding: 30%;
  color: white !important;
  font-weight: bold;
  background-color: #219ebc !important;
}

span.signup_button {
  font-size: 20px;
}

.inputs {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 0 auto;
}
</style>
