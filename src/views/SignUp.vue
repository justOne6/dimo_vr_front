<template>
  <div>
    <Navbar />
    <div class="main">
      <div v-if="registrationSuccess" class="success-message">
        Inscription réussie! Vous pouvez maintenant
        <router-link to="/sign-in">vous connecter</router-link>.
      </div>
      <div v-if="registrationError" class="error-message">
        {{ registrationError }}
      </div>
      <div>
        <p class="create">Create Account</p>
        <v-text-field outlined clearable class="input" label="Name" v-model="name"></v-text-field>
        <v-text-field outlined clearable class="input" label="Email" v-model="email" type="email"></v-text-field>
        <v-text-field outlined clearable class="input" label="Password" v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"></v-text-field>
      </div><br />
      <div class="signup">
        <v-btn class="signup_button" @click="signUp"><span>SIGN UP</span></v-btn>
      </div>
      <div style="margin: 2% auto; width: fit-content">
        <a href="/sign-in" style="color: var(--nightBlue); font-weight: bold; text-decoration: none">Already have an
          account?</a>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      showPassword: false,
      registrationSuccess: false,
      registrationError: null,
    };
  },
  methods: {
    signUp() {
      const userData = {
        username: this.name,
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://127.0.0.1:8000/api/register", userData)
        .then((response) => {
          if (response.status === 201) {
            console.log("Inscription réussie:", response.data);
            this.registrationSuccess = true;
          } else {
            console.error(
              "Le serveur a renvoyé un statut différent de 201. Statut:",
              response.status
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'inscription:", error);

          if (error.response) {
            if (error.response.status === 500) {
              this.registrationError =
                "Le nom d'utilisateur existe déjà. Veuillez choisir un autre.";
            } else {
              this.registrationError = error.response.data.message;
            }
          } else {
            this.registrationError = "Erreur lors de l'inscription.";
          }

          setTimeout(() => {
            this.registrationError = null;
          }, 5000);
        });
    },
  },
};
</script>

<style>
body {
  background-color: var(--lightGrey);
}

.create {
  color: var(--nightBlue) !important;
  font-weight: bold;
  font-size: 32px;
  margin: 5% auto 10% auto;
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
  background-color: var(--mediumBlue) !important;
  width: 20vw;
  font-size: 30px;
}

span.signup_button {
  font-size: 20px;
}

.error-message {
  background-color: #f44336;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}
</style>

<style scoped>
.input {
  border-radius: 5px;
  margin-bottom: 35px !important;
  font-size: 16px;
  background-color: #E6E6E6;
  height: 55px !important
}

.main {
  font-family: "Raleway", sans-serif;
  margin: 75px auto 0 auto !important;
  /* the navbar's height is 63px */
}
</style>
