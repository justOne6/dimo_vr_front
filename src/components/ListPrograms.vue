<template>
  <div class="page-restrict-width">
    <v-row>
      <v-col
          v-for="program in programs"
          :key="program.id"
          cols="12"
          sm="6"
          md="5"
          lg="4"
      >
        <v-card
        elevation="2"
        shaped>
          <v-img
              :src="program.illustration"
              height="200"
          ></v-img>
          <v-card-title>{{ program.name }}</v-card-title>
          <v-card-text>{{ program.description }}</v-card-text>
          <v-card-actions>
            <v-btn width="100%"  color="primary" :to="{ name: 'ProgramPage', params: { programId: program.id }}">Voir détails</v-btn>
          </v-card-actions>
          <v-card-actions v-if="isStudent" >
            <v-btn width="100%" color="primary" @click="handleSignup(program.id)">S'inscrire</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from "vuex";

export default {
  name: 'ProgramList',
  data() {
    return {
      programs: [],
    };
  },
  beforeMount() {
    this.fetchPrograms();
  },
  computed: {
    ...mapGetters(['isRolePresent']),
    isStudent() {
      return this.isRolePresent('student');
    }
  },
  methods: {
    async fetchPrograms() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URI}/api/programs`);
        this.programs = response.data.programs;
      } catch (error) {
        console.error('Erreur lors de la récupération des programmes :', error);
      }
    },

    async handleSignup(programId) {
      const formData = new FormData();
      formData.append('program_id', programId);
      try {
        await axios.post(`${process.env.VUE_APP_API_URI}/api/programs/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(
            (response) => {
              console.log("Response: ", response);
              if (response.status === 200) {
                alert('Vous êtes inscrit au programme avec succès !');
              }
            }
        ).catch(
            (error) => {
              console.error("Error while registering new teacher: ", error)
              if (error.response) {
                if (error.response.status === 500) {
                  this.registrationError = error?.response?.data.message;
                }
              }
              setTimeout(() => {
                this.registrationError = null;
              }, 5000);
            }
        );
        alert('Vous êtes inscrit au programme avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'inscription au programme :', error);
        alert('Une erreur est survenue lors de l\'inscription au programme. Veuillez réessayer.');
      }
    }
  }
};
</script>
