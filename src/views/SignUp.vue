<template>
  <div>
    <div class="main">
      <div v-if="registrationSuccess" class="success-message">
        Inscription réussie! Vous pouvez maintenant
        <router-link to="/sign-in">vous connecter</router-link>.
      </div>
      <div v-if="registrationError" class="error-message">
        {{ registrationError }}
      </div>
      <div style="margin-top:2px">
        <p class="welcome_message">WELCOME TO DIMOVR</p>
        <p class="page_title">Create Account</p>
        <div style="margin:0 auto">
          <div class="input_container">
            <p class="input_title">First Name</p>
            <input class="input" placeholder="Enter text" v-model="firstname" />
          </div>
          <div class="input_container">
            <p class="input_title">Last Name</p>
            <input class="input" placeholder="Enter text" v-model="lastname" />
          </div>
          <div class="input_container">
            <p class="input_title">Email</p>
            <input class="input" placeholder="Enter text" v-model="email" type="email" />
          </div>
          <div class="input_container">
            <p class="input_title">Password</p>
            <input class="input" placeholder="Enter password" v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword" />
          </div>
        </div>
      </div>
      <div class="signup">
        <v-btn class="button" @click="signUp"><span>SIGN UP</span></v-btn>
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
    signUp() {
      const userData = {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
      };

      axios
        .post(`${process.env.VUE_APP_API_URI}/auth/register`, userData)
        .then((response) => {
          if (response.status === 200) {
            this.registrationSuccess = true;
            // Save the token in the local storage
            const token = response.data.token;
            localStorage.setItem("token", token);
            // Set the default axios authorization header
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
  background-color: var(--background);
}

.create {
  color: var(--nightPurple) !important;
  font-weight: bold;
  font-size: 32px;
  margin: 5% auto 30px auto;
}

.signup {
  margin: 0px auto;
  width: fit-content;
  border-radius: 5px;
}

.signup_button {
  padding: 30%;
  color: white !important;
  font-weight: bold;
  background-color: var(--button) !important;
  width: 22vw;
  font-size: 20px !important;
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
