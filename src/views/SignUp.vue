<template>
  <div>
    <div class="main page-restrict-width">
      <div v-if="registrationError" class="error-message">
        {{ registrationError }}
      </div>
      <div style="margin-top:20px">
        <p class="create">Create Account</p>
        <v-text-field outlined clearable class="input" label="First Name" v-model="firstname"></v-text-field>
        <v-text-field outlined clearable class="input" label="Last Name" v-model="lastname"></v-text-field>
        <v-text-field outlined clearable class="input" label="Email" v-model="email" type="email"></v-text-field>
        <v-text-field outlined clearable class="input" label="Password" v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"></v-text-field>
      </div>
      <br />
      <div class="signup">
        <v-btn class="signup_button" @click="signUp"><span>SIGN UP</span></v-btn>
      </div>
      <div style="margin: 2% auto; width: fit-content">
        <a href="/sign-in" style="
            color: var(--nightPurple);
            font-weight: bold;
            text-decoration: none;
          ">Already have an account?</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions} from "vuex";

export default {
  components: {
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      showPassword: false,
      registrationSuccess: false,
      registrationError: null,
    };
  },
  methods: {
    ...mapActions(["updateRoles", "updateIsAuthenticated"]),
    signUp() {
      const userData = {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
      };

      axios
        .post(`${process.env.VUE_APP_API_URI}/api/register`, userData)
        .then((response) => {
          console.log("Response: ", response);
          if (response.status === 200) {
            this.registrationSuccess = true;
            // Save the token in the local storage
            const token = response.data.token;
            localStorage.setItem("token", token);
            // TODO: Comment for Spring Boot backend
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("roles", JSON.stringify(response.data.user.roles));
            this.updateRoles(response.data.user.roles);
            this.updateIsAuthenticated(true);
            // Set the default axios authorization header
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Redirect to Landing page
            this.$router.push("/");
            /* TODO: Decomment for Spring Boot backend
            // fetch the user data
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
            console.log("Login successful");
          }
        })
        .catch((error) => {
          console.error("Error while registering new user: ", error)
          if (error.response) {
            if (error.response.status === 500) {
              this.registrationError = error?.response?.data.message;
            }
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
  color: var(--nightPurple) !important;
  font-weight: bold;
  font-size: 32px;
  margin: 5% auto 30px auto;
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
  background-color: var(--bluePurple) !important;
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
  margin-bottom: 20px !important;
  font-size: 16px;
  background-color: #e6e6e6;
  height: 55px !important;
}

.main {
  font-family: "Fredoka", sans-serif;
  margin: 75px auto 0 auto !important;
  /* the navbar's height is 63px */
}
</style>
