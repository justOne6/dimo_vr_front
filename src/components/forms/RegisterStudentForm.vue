<template>
  <div>
    <div class="main page-restrict-width">
      <div v-if="registrationError" class="error-message">
        {{ registrationError }}
      </div>
      <div v-if="registrationSuccess" class="success-message">
        Le nouvel étudiant a bien été enregistré.
      </div>
      <div style="margin-top:20px">
        <p class="page_title">Add a new student</p>
        <div class="input_container">
          <p class="input_title">First name</p>
          <input class="input" label="Enter text..." v-model="firstname" placeholder="Enter first name" />
        </div>
        <div class="input_container">
          <p class="input_title">Last name</p>
          <input class="input" label="Enter text..." v-model="lastname" placeholder="Enter last name" />
        </div>
        <div class="input_container">
          <p class="input_title">Email</p>
          <input class="input" label="Enter text..." v-model="email" placeholder="Enter email" />
        </div>
      </div>
      <br />
      <div class="signup">
        <v-btn class="signup_button" @click="signUp"><span>Create</span></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "RegisterTeacherForm",
  components: {
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      email: "",
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
      };

      axios
        .post(`${process.env.VUE_APP_API_URI}/api/register-student`, userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Response: ", response);
          if (response.status === 200) {
            this.registrationSuccess = true;
            // efface les champs
            this.lastname = "";
            this.firstname = "";
            this.email = "";
          }
        })
        .catch((error) => {
          console.error("Error while registering new teacher: ", error)
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
