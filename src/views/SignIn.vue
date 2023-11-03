<template>
  <div class="main">
    <DimoVR />
    <div class="inputs">
      <p class="create">Sign In</p>
      <input class="input" type="text" placeholder="Email" v-model="email" />
      <input
        class="input"
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <div class="signup">
      <v-btn class="signin_button" @click="signIn"><span>SIGN IN</span></v-btn>
    </div>
    <div style="margin: 2% auto; width: fit-content">
      <a
        href="/forgotten-password"
        style="color: #2a6a8a; font-weight: bold; text-decoration: none"
        >Forgot password ?</a
      >
    </div>
  </div>
</template>

<script>
import { generalColors } from "../../globalVars";
import DimoVR from "@/components/DimoVR.vue";
import axios from "axios";

export default {
  components: {
    DimoVR,
  },
  data() {
    return {
      medimuBlue: generalColors.mediumBlue,
      darkBlue: generalColors.darkBlue,
      mediumGrey: generalColors.mediumGrey,
      boldOrange: generalColors.boldOrange,
      lightOrange: generalColors.lightOrange,
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      const loginData = {
        username: this.email,
        password: this.password,
      };

      axios
        .post("http://127.0.0.1:8000/api/login_check", loginData)
        .then((response) => {
          if (response.data.token) {
            // Stock jeton JWT dans le localStorage
            localStorage.setItem("jwtToken", response.data.token);
            // router.push("/dashboard");

            console.log(
              "Connexion réussie, jeton JWT stocké:",
              response.data.token
            );
          } else {
            console.error("Le serveur n'a pas renvoyé de jeton.");
          }
        })
        .catch((error) => {
          console.error("Erreur de connexion:", error);
        });
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

.create {
  color: #2a6a8a !important;
  font-weight: bold;
  font-size: 32px;
  margin: 0 auto 10% auto !important;
}

.input {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10%;
  background-color: #e6e6e6;
  font-size: 16px;
}

.signin {
  margin: 0 auto;
  width: fit-content;
  border-radius: 5px;
}

.signin_button {
  color: white !important;
  font-weight: bold;
  padding: 2% 20% !important;
  background-color: #219ebc !important;
}

span.signin_button {
  font-size: 20px;
}

.inputs {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 0 auto !important;
}
</style>
