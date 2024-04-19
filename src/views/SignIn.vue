<template>
  <div>
    <div class="main page-restrict-width">
      <div v-if="loginSuccess" class="success-message">
        <p class="success-text">
          Connexion réussie! Vous pouvez maintenant accéder à votre tableau de
          bord.
        </p>
      </div>
      <div class="container-with-navbar">
        <p class="welcome_message">WELCOME TO DIMOVR</p>
        <p class="page_title">Sign In</p>
        <div class="input_container">
          <p class="input_title">Email</p>
          <input class="input" label="Enter text..." v-model="email" placeholder="Enter email" />
        </div>
        <div class="input_container">
          <p class="input_title">Password</p>
          <input class="input" label="Enter password" v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword" placeholder="Enter password" />
        </div>
      </div>
      <div class="signin">
        <v-row>
          <v-col cols="12" md="6"><v-btn class="button" @click="signIn"><span>LOGIN</span></v-btn></v-col></v-row>
      </div>
      <div style="margin: 2% auto; width: fit-content">
        <router-link to="/forgotten-password"
          style="color: var(--nightPurple); font-weight: bold; text-decoration: none">Forgot
          password ?</router-link>
      </div>
      <div style="width: fit-content; margin: auto">
        <a href="/sign-up" style="
            color: var(--nightPurple);
            font-weight: bold;
            text-decoration: none;
          ">
          Create a new account ?
        </a>
      </div>
      <div v-if="loginError" class="error-message">
        <span v-html="loginError"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loginSuccess: false,
      loginError: null,
    };
  },
  methods: {
    ...mapActions(["updateRoles", "updateIsAuthenticated"]),
    signIn() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      axios
        .post(`${process.env.VUE_APP_API_URI}/api/login`, loginData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {

          if (response.status === 200) {
            const token = response.data.token;

            localStorage.setItem("token", token);
            // TODO: Comment for Spring Boot backend
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("roles", JSON.stringify(response.data.user.roles));
            this.updateRoles(response.data.user.roles);
            this.updateIsAuthenticated(true);

            // Set the default axios authorization header
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // fetch the user data
            // Redirect to Landing page
            this.$router.push("/");

            /* TODO: Decomment for Spring Boot backend
            axios.get(`${process.env.VUE_APP_API_URI}/api/fetchUser`)
              .then((response) => {
                console.log("User data: ", response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                  // Redirect to the dashboard
                  this.$router.push("/");
                })
                .catch((error) => {
                  console.error("Error while fetching user data: ", error);
                });
            */
          } else {
            console.error(
              "Login failed. Server response does not indicate success."
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la connexion:", error);

          if (error.response && error.response.status === 401) {
            this.loginError =
              "Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer !";
          } else {
            this.loginError = "LOGIN FAILED.<br>INVALID CREDENTIALS.";
          }
        });
    },
  },
};
</script>

<style>
body {
  background-color: var(--background) !important;
}

.success-message {
  background-color: #4caf50;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

.success-text {
  font-family: "Fredoka One", sans-serif;
  color: white;
  font-size: 18px;
}

.error-message {
  border-radius: 5px;
  font-size: 20px !important;
  text-align: center;
  color: red !important;
  background-color: transparent !important;
}

/* Placeholder */
.theme--light.v-label {
  color: grey !important;
  font-weight: normal;
  font-size: 13px;
}
</style>

<style scoped>
.signin {
  margin: 0px auto;
  width: fit-content;
  border-radius: 5px;
}

.signin_button {
  padding: 30%;
  color: white !important;
  font-weight: bold;
  background-color: var(--button) !important;
  width: 22vw;
  font-size: 20px !important;
}

span.signin_button {
  font-size: 20px;
}
</style>
