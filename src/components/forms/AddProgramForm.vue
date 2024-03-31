<template>
  <div class="wholePage">
    <h2 class="headline">Create Program</h2>
    <v-form @submit.prevent="createProgram">
      <v-text-field v-model="program.name" label="Nom" required></v-text-field>
      <v-textarea v-model="program.description" label="Description" required></v-textarea>
      <v-file-input v-model="program.illustration" label="Illustration" accept="image/*" required></v-file-input>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="program.start_date" label="Date de début" type="date" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="program.end_date" label="Date de fin" type="date" required></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" color="primary">Créer un nouveau programme</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddProgramForm",
  data() {
    return {
      program: {
        name: '',
        description: '',
        illustration: null,
        start_date: '',
        end_date: ''
      }
    };
  },
  methods: {
    createProgram() {
      // Logic to create the program
      console.log('Creating program:', this.program);
      const formData = new FormData();
      formData.append('name', this.program.name);
      formData.append('description', this.program.description);
      formData.append('illustration', this.program.illustration);
      formData.append('start_date', this.program.start_date);
      formData.append('end_date', this.program.end_date);

      axios
          .post(`${process.env.VUE_APP_API_URI}/api/programs`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log("Response: ", response);
            if (response.status === 200) {
              // Regiriger vers la création de matières
              this.$router.push("/programs/" + response.data.program.id);
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
    }
  }
};
</script>
