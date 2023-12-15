<template>
  <div>
    <Navbar />
    <div class="main">
      <div v-if="loginSuccess" class="success-message">
        <p class="success-text">
          Connexion réussie! Vous pouvez maintenant accéder à votre tableau de
          bord.
        </p>
      </div>
      <div v-if="loginError" class="error-message">
        {{ loginError }}
      </div>
      <div>
        <p class="create">Sign In</p>
        <v-text-field outlined clearable class="input" label="Username" v-model="username"></v-text-field>
        <v-text-field outlined clearable class="input" label="Password" v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"></v-text-field>
      </div>
      <div class="signin">
        <v-btn class="signin_button" @click="signIn"><span>SIGN IN</span></v-btn>
      </div>
      <div style="margin: 2% auto; width: fit-content">
        <router-link to="/forgotten-password" style="color: #2a6a8a; font-weight: bold; text-decoration: none">Forgot
          password?</router-link>
      </div>
      <div style="margin-top: 20px !important">
        <v-btn @click="signInWithGoogle" color="red" dark>
          <v-icon left>mdi-google</v-icon> Sign In with Google
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
/* global gapi */
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      loginSuccess: false,
      loginError: null,
    };
  },
  methods: {
    signInWithGoogle() {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/platform.js";
      script.onload = () => {
        gapi.load("auth2", () => {
          gapi.auth2
            .init({
              client_id: "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",
            })
            .then(() => {
              const auth2 = gapi.auth2.getAuthInstance();
              auth2.signIn().then((googleUser) => {
                const googleToken = googleUser.getAuthResponse().id_token;
                this.handleGoogleSignIn(googleToken);
              });
            })
            .catch((error) => {
              console.error("Error initializing Google Sign-In:", error);
            });
        });
      };
      document.head.appendChild(script);
    },

    handleGoogleSignIn(googleToken) {
      console.log("hellOOOOoos");
      axios
        .get("http://127.0.0.1:8000/connect/google", { token: googleToken })
        .then((response) => {
          console.log("Backend response:", response);
        })
        .catch((error) => {
          console.error("Error during Google sign-in:", error);
        });
    },

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

.create {
  color: #2a6a8a !important;
  font-weight: bold;
  font-size: 32px;
  margin: 0 auto 10% auto !important;
}

.signin {
  margin: 0 auto;
  width: fit-content;
  border-radius: 5px;
}

.signin_button {
  padding: 30%;
  color: white !important;
  font-weight: bold;
  background-color: var(--mediumBlue) !important;
  width: 20vw;
  font-size: 30px;
  ;
}

span.signin_button {
  font-size: 20px;
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

<style scoped>
.main {
  font-family: "Raleway", sans-serif;
  margin: 75px auto 0 auto !important;
  /* the navbar's height is 63px */
}

.input {
  border-radius: 5px;
  margin-bottom: 35px !important;
  font-size: 16px;
  background-color: #E6E6E6;
  height: 55px !important
}
</style>
