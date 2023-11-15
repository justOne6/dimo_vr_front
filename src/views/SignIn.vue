<template>
  <div class="main">
    <DimoVR />
    <div v-if="loginSuccess" class="success-message">
      <p class="success-text">
        Connexion réussie! Vous pouvez maintenant accéder à votre tableau de
        bord.
      </p>
    </div>
    <div v-if="loginError" class="error-message">
      {{ loginError }}
    </div>
    <div class="inputs">
      <p class="create">Sign In</p>
      <v-text-field
        class="input"
        label="Username"
        v-model="username"
      ></v-text-field>
      <v-text-field
        class="input"
        label="Password"
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </div>
    <div class="signin">
      <v-btn class="signin_button" @click="signIn"><span>SIGN IN</span></v-btn>
    </div>
    <div style="margin: 2% auto; width: fit-content">
      <router-link
        to="/forgotten-password"
        style="color: #2a6a8a; font-weight: bold; text-decoration: none"
        >Forgot password?</router-link
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
      username: "",
      password: "",
      showPassword: false,
      loginSuccess: false,
      loginError: null,
    };
  },
  methods: {
    signIn() {
      const loginData = {
        username: this.username,
        password: this.password,
      };

      axios
        .post("http://127.0.0.1:8000/api/login_check", loginData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Login response:", response);

          if (response.status === 200) {
            const token = response.data.token;

            localStorage.setItem("token", token);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            this.$router.push("/dashboard");

            console.log("Login successful");
          } else {
            console.error(
              "Login failed. Server response does not indicate success."
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la connexion:", error);

          if (error.response && error.response.status === 401) {
            // Authentication failed, set loginError
            this.loginError =
              "Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer !";
          } else {
            this.loginError = "Erreur lors de la connexion.";
          }
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

.success-message {
  background-color: #4caf50;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

.success-text {
  font-family: "Raleway", sans-serif;
  color: white;
  font-size: 18px;
}

.error-message {
  background-color: #d9534f;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
  color: white;
}
</style>
