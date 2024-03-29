<template>
  <div>
    <Navbar />
    <div class="main">
      <div class="inputs">
        <p>Manage your account {{ username }} !</p>
      </div>
      <div class="container">
        <div class="sections" :class="{ 'with-border': personalInfo || showSecurity || showContact }"
          style="width: 30vw">
          <p class="edits"><i class="mdi mdi-home" />&nbsp;Home</p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits" @click="togglePersonal" :class="{ 'font-bold': personalInfo }">
            <i class="mdi mdi-account" />&nbsp;Personal informations
          </p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits" @click="toggleSecurity" :class="{ 'font-bold': showSecurity }">
            <i class="mdi mdi-lock" />&nbsp;Security and confidentiality
          </p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits" @click="toggleContact" :class="{ 'font-bold': showContact }">
            <i class="mdi mdi-phone" />&nbsp;Contact and share
          </p>
          <v-divider style=" color: black; height: 2px"></v-divider>
          <p class="edits"><i class="mdi mdi-information" />&nbsp;About</p>
        </div>
        <div class="personal" v-if="personalInfo" style="width: 30vw; margin: auto 0;">
          <div class="username">
            Your username :
            <a style="font-weight: bold">{{ username }}</a><br />
            <v-btn style="margin-top: 10px" class="button" @click="toggleUsername"
              v-if="showEditUsername">EDIT</v-btn><br />
            <div v-if="!showEditUsername">
              <input v-model="newUsername" placeholder="Your new username" class="input " />
              <v-btn class="button" @click="saveUsername">SAVE USERNAME</v-btn>
            </div>
          </div><br />
          <v-divider style="color: black; height: 2px"></v-divider><br />
          <div class="username">
            Your email address :
            <a style="font-weight: bold">your email</a>
            <v-btn style="margin-top: 10px" class="button" @click="toggleEmail" v-if="showEditEmail">EDIT</v-btn><br />
            <div v-if="!showEditEmail" style="margin-top: 10px">
              <input v-model="newEmail" placeholder="Your new email" class="input " /><br />
              <v-btn class="button" @click="saveEmail">SAVE EMAIL</v-btn>
            </div>
          </div>
        </div>
        <div class="security" v-if="showSecurity" style="width: 30vw; margin: auto 0;">
          <p style="font-weight: bold">Change your password</p><br />
          <input placeholder="Current password" class="input " /><br />
          <input placeholder="New password" class="input " /><br />
          <input placeholder="Confirm password" class="input " /><br />
          <v-btn class="button"><span>SAVE</span></v-btn>
        </div>
        <div class="contact" v-if="showContact" style="width: 30vw; margin: auto 0;">
          <p style="font-weight: bold">Contact form</p><br />
          <input placeholder="Receiver's email" class="input" /><br />
          <input placeholder="Message" class="input" style="height: 30vh !important" /><br />
          <v-btn @click="sendForm" class="button">SEND</v-btn><br /><br />
          <div v-if="messageSent" class="success" :class="{ 'hidden': !messageSent }"
            style="color:green; font-weight: bold">
            Message successfully sent !
          </div>
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
      showContact: false,
      editPassword: false, //used to know whether we can edit the password or not
      newUsername: "", //used to change the username
      personalInfo: false, //toggle to show the "Personal Informations" section
      messageSent: false,
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
    //When message is sent to user
    sendForm() {
      this.messageSent = true;
      setTimeout(() => {
        this.messageSent = false;
      }, 3000);
    },
    //Show the "Security" section
    toggleSecurity() {
      this.showSecurity = !this.showSecurity;
      this.personalInfo = false;
      this.showContact = false;
    },
    //Show the "Contact" section
    toggleContact() {
      this.showContact = !this.showContact;
      this.showSecurity = false;
      this.personalInfo = false;
    },
    //Show the "Personal Informations" section
    togglePersonal() {
      this.personalInfo = !this.personalInfo;
      this.showSecurity = false;
      this.showContact = false;
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
  background-color: var(--button) !important;
}

.font-bold {
  font-weight: bold;
  background-color: var(--nightPurple);
  color: white;
}

.container {
  display: flex;
  justify-content: space-between;
}

body {
  background-color: var(--background);
}

.main {
  font-family: "Fredoka One", sans-serif;
  margin-top: 8px !important;
  margin-bottom: auto;
}

.edits {
  font-size: 18px;
  padding: 40px 0;
}

.edits:hover {
  background-color: var(--lightPurple);
  color: white;
}

.input {
  border-radius: 5px;
  margin-bottom: 35px !important;
  font-size: 16px;
  background-color: var(--input);
  height: 55px !important;
  padding: 10px;
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
  color: var(--nightPurple) !important;
  font-size: 32px;
  margin-bottom: 10px !important;
}

.sections {
  width: fit-content;
  margin-right: 20px;
  width: 30vw;
}

.with-border {
  border-right: solid 1px rgba(0, 0, 0, 0.12);
}

.success {
  color: green;
  font-weight: bold;
  opacity: 1;
  transition: opacity 5s ease-in-out, background-color 1s ease-in-out;
}

.success.hidden {
  opacity: 0;
}
</style>

<style scoped>
.main {
  margin-top: 80px !important;
}
</style>
