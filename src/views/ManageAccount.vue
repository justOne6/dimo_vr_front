<template>
  <div>
    <Navbar />
    <div class="main">
      <div class="inputs">
        <p>Manage your account {{ username }} !</p>
      </div>
      <div class="container">
        <div style="
          width: fit-content;
          margin-right: 20px;
          width: 30vw;
        ">
          <p class="edits">Home</p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits" @click="togglePersonal" :class="{ 'font-bold': personalInfo }">Personal informations</p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits" @click="toggleSecurity" :class="{ 'font-bold': showSecurity }">Security and confidentiality</p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits">Contact and share</p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits">About</p>
        </div>
        <div class="personal" v-if="personalInfo">
          <div class="username">
            Your username :
            <a style="font-weight: bold">{{ username }}</a>
            <v-btn class="edit_button" @click="toggleUsername" v-if="showEditUsername">EDIT</v-btn><br />
            <div v-if="!showEditUsername" style="margin-top: 10px">
              <input v-model="newUsername" placeholder="Your new username" class="input " /><br />
              <v-btn class="button" @click="saveUsername">SAVE</v-btn>
            </div>
          </div><br />
          <div class="username">
            Your email address :
            <!--<a style="font-weight: bold">{{ email }}</a>-->
            <a style="font-weight: bold">your email</a>
            <v-btn class="edit_button" @click="toggleEmail" v-if="showEditEmail">EDIT</v-btn><br />
            <div v-if="!showEditEmail" style="margin-top: 10px">
              <input v-model="newEmail" placeholder="Your new email" class="input " /><br />
              <v-btn class="button" @click="saveEmail">SAVE</v-btn>
            </div>
          </div>
        </div>
        <div class="security" v-if="showSecurity">
          <p style="font-weight: bold">Password : </p><br />
          <input placeholder="Current password" class="input " /><br />
          <input placeholder="New password" class="input " /><br />
          <input placeholder="Confirm password" class="input " />
          <v-btn class="button"><span>SAVE</span></v-btn>
        </div>
        <div class="contact">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: { Navbar },
  data() {
    return {
      username: "",
      showEditUsername: true, //used to show the "edit password" button
      showEditEmail: true,
      showSecurity: false,
      editPassword: false, //used to know whether we can edit the password or not
      newUsername: "", //used to change the username
      personalInfo: false, //toggle to show the "Personal Informations" section
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
          console.log("payload : " + JSON.stringify(payload))
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
    toggleSecurity() {
      this.showSecurity = !this.showSecurity;
      this.personalInfo = false;
    },
    togglePassword() {
      this.editPassword = true;
    },
    toggleUsername() {
      this.newUsername = this.username;
      this.showEditUsername = false;
    },
    toggleEmail() {
      this.newEmail = this.email;
      this.showEditEmail = false;
    },
    //Show the "Personal Informations" section
    togglePersonal() {
      this.personalInfo = !this.personalInfo;
      this.showSecurity = false;
    },
    saveUsername() {
      this.username = this.newUsername;
      this.showEditUsername = true;
    },
    saveEmail() {
      this.email = this.newEmail;
      this.showEditEmail = true;
    },
  },
};
</script>

<style>
.button {
  color: white !important;
  font-weight: bold;
  padding: 2% 20% !important;
  background-color: var(--mediumBlue) !important;
}

.edit_button {
  color: white !important;
  font-weight: bold;
  padding: 2% 20% !important;
  background-color: grey !important;
}

.font-bold {
  font-weight: bold;
  background-color: var(--mediumBlue);
}

.container {
  display: flex;
  justify-content: space-between;
}

body {
  background-color: var(--lightGrey);
}

.main {
  font-family: "Raleway", sans-serif;
  margin-top: 8px !important;
  margin-bottom: auto;
}

.edits {
  font-size: 18px;
  //border: solid 1px black;
  padding: 40px 0;
}

.edits:hover {
  background-color: var(--lightBlue);
  color: white;
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
  width: 100% !important;
  height: fit-content !important;
  padding: 0 !important;
  color: #2a6a8a !important;
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 10px !important;
}
</style>
