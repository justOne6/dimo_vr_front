<template>
  <div class="">
    <v-form @submit.prevent="createSubject">
      <v-text-field v-model="subject.title" label="Nom" required></v-text-field>
      <v-textarea v-model="subject.description" label="Description" required></v-textarea>
      <v-file-input v-model="subject.illustration" label="Illustration" accept="image/*" required></v-file-input>
      <v-btn type="submit" color="primary">Ajouter une nouvelle matière</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import {mapActions} from "vuex";

export default {
  name: 'AddSubjectForm',
  props: ['programId'],
  data() {
    return {
      subject: {
        title: '',
        description: '',
        illustration: null,
        program_id: this.programId
      },
      response: null
    };
  },
  computed: {
    ...mapActions(["updateReloadSubjects"]),
  },
  methods: {
    async createSubject() {
      try {
        const formData = new FormData();
        formData.append('title', this.subject.title);
        formData.append('description', this.subject.description);
        formData.append('illustration', this.subject.illustration);
        formData.append('program_id', this.subject.program_id);

        console.log('Creating subject for :', this.subject.program_id);

        const response = await axios.post(`${process.env.VUE_APP_API_URI}/api/subjects`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        if (response.status === 200) {
          await this.updateReloadSubjects;
          // Reset the form after successful creation
          this.subject = {
            title: '',
            description: '',
            illustration: null,
            program_id: this.programId
          };
          alert('La matière a été ajoutée avec succès !');
        }
      } catch (error) {
        console.error('Erreur lors de la création de la matière :', error);
        alert('Une erreur est survenue lors de la création de la matière. Veuillez réessayer.');
      }
    }
  }
};
</script>
