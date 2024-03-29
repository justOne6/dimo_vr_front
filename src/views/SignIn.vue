<template>
  <div>
    <div class="main">
      <div v-if="loginSuccess" class="success-message">
        <p class="success-text">
          Connexion réussie! Vous pouvez maintenant accéder à votre tableau de
          bord.
        </p>
      </div>
      <div style="margin-top:2px">
        <p style="font-size: 40px; color: var(--blue)">WELCOME TO DIMOVR</p>
        <p style="font-size: 30px; margin: 40px 0; font-weight: normal; color: var(--blue)">Sign In</p>
        <div style="display: flex; flex-direction: column; align-items: flex-start; margin: 0 200px">
          <p style="font-size: 20px; color: var(--blue); font-weight: normal;">Email</p>
          <v-text-field outlined clearable background-color=var(--input) label="Enter text..." style="width: 20vw"
            v-model="email"></v-text-field>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; margin: -20px 200px 0 200px">
          <p style="font-size: 20px; color: var(--blue)">Password</p>
          <v-text-field outlined clearable background-color=var(--input) label="Enter password"
            style="width: 20vw; margin: auto" v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"></v-text-field>
        </div>
      </div>
      <div class="signin">
        <v-btn class="signin_button" @click="signIn"><span>LOGIN</span></v-btn>
      </div>
      <div style="margin: 2% auto; width: fit-content">
        <router-link to="/forgotten-password"
          style="color: var(--nightPurple); font-weight: bold; text-decoration: none">Forgot
          password?</router-link>
      </div>
      <div style="width: fit-content">
        <a href="/sign-up" style="
            color: var(--nightBlue);
            font-weight: bold;
            text-decoration: none;
          ">Create a new account?</a>
      </div>
      <div v-if="loginError" class="error-message">
        <span v-html="loginError"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
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
    signIn() {
      const loginData = {
        email: this.email,
        password: this.password,
      };

      axios
        .post(`${process.env.VUE_APP_API_URI}/auth/authenticate`, loginData, {
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

            this.$router.push("/");

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
            this.loginError =
              "Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer !";
          } else {
            this.loginError = "LOGIN FAILED.<br>INVALID CREDENTIALS";
          }
        });
    },
  },
};
</script>

<style>
body {
  background-color: var(--background);
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
  color: #EA8E99 !important;
  background-color: transparent !important;
}

/* Placeholder */
.theme--light.v-label {
  color: grey !important;
  font-weight: normal;
  font-style: italic;
  font-size: 13px;
}
</style>

<style scoped>
.main {
  font-family: "Fredoka One", sans-serif;
  margin: 10px auto 0 auto !important;
  background: var(--background);
  /* the navbar's height is 63px */
}

.input {
  border-radius: 5px;
  margin-bottom: 20px !important;
  font-size: 16px;
  background-color: #e6e6e6;
  height: 55px !important;
}

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
