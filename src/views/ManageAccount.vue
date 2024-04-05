<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="inputs">
        <p>Gère ton compte {{ user.firstname }} !</p>
      </div>
      <div class="content">
        <div class="sections" :class="{ 'with-border': personalInfo || showSecurity }"
          style="width: 30vw">
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits" @click="togglePersonal" :class="{ 'font-bold': personalInfo }">
            <i class="mdi mdi-account" />&nbsp;Informations personnelles
          </p>
          <v-divider style="color: black; height: 2px"></v-divider>
          <p class="edits" @click="toggleSecurity" :class="{ 'font-bold': showSecurity }">
            <i class="mdi mdi-lock" />&nbsp;Modifier le mot de passe
          </p>

        </div>
        <div class="personal" v-if="personalInfo" style="width: 30vw; margin: auto 0;">
          <div>
            <v-form @submit.prevent="submitPersonalInfos">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="user['lastname']" value="user['lastname']" label="Nom" outlined required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="user['firstname']" value="user['firstname']" label="Prénom" outlined required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="user['email']" label="Email" value="user['email']" outlined required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn type="submit" color="primary">Enregistrer</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </div>
        <div class="security" v-if="showSecurity" style="width: 30vw; margin: auto 0">
          <ChangePasswordForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm.vue";
export default {
  components: {ChangePasswordForm, Navbar },
  data() {
    return {
      user: [],
      showSecurity: false,
      personalInfo: false, //toggle to show the "Personal Informations" section
    };
  },
  beforeMount() {
    this.fetchUserData();
  },
  methods: {
    // Récupérer fraichement les infos du user pour préremplir les champs
    async fetchUserData() {
      await axios.get(`${process.env.VUE_APP_API_URI}/api/fetchUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        console.log(response.data.user);
        this.user = response.data.user;
      }).catch((error) => {
        console.error("Error while fetching user data: ", error);
      });
    },
    // Envoie des infos du compte
    async submitPersonalInfos(){
      const data = {
        lastname: this.user.lastname,
        firstname: this.user.firstname,
        email: this.user.email
      }
      await axios.put( `${process.env.VUE_APP_API_URI}/api/updateUser`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response)=>{
        // Mettre à jour le localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Informations mises à jour avec succès !");
      }).catch((error)=>{
        console.error("Error while updating user data: ", error);
      });
    },
    //Show the "Security" section
    toggleSecurity() {
      this.showSecurity = !this.showSecurity;
      this.personalInfo = false;
    },
    //Show the "Personal Informations" section
    togglePersonal() {
      this.personalInfo = !this.personalInfo;
      this.showSecurity = false;
    },
  },
};
</script>

<style>
.font-bold {
  font-weight: bold;
  background-color: var(--nightPurple);
  color: white;
}

.content {
  display: flex;
  justify-content: space-between;
}

body {
  background-color: var(--background);
}

.edits {
  font-size: 18px;
  padding: 40px 0;
}

.edits:hover {
  background-color: var(--lightPurple);
  color: white;
}

hr {
  margin: 0 !important;
}

p {
  margin-bottom: 0 !important;
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

.sections {
  width: fit-content;
  width: 30vw;
  margin: 0 auto;
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
