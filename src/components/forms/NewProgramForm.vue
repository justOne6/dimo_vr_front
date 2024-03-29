<template>
  <div class="container mt-5">
    <form @submit.prevent="createProgram">
      <div class="form-group">
        <label for="name">Nom</label>
        <input type="text" class="form-control" id="name" v-model="program.name" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="program.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="illustration">Illustration</label><br/>
        <input type="file" class="form-control-file" id="illustration" @change="handleIllustrationChange" accept="image/*" required>
      </div>
      <div class="form-group">
        <label for="start_date">Date de début</label>
        <input type="date" class="form-control" id="start_date" v-model="program.start_date" required>
      </div>
      <div class="form-group">
        <label for="end_date">Date de fin</label>
        <input type="date" class="form-control" id="end_date" v-model="program.end_date" required>
      </div>
      <button type="submit" class="btn btn-primary">Créer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      program: {
        name: '',
        description: '',
        illustration: null,
        start_date: '',
        end_date: ''
      },
      response: null
    };
  },
  methods: {
    handleIllustrationChange(e) {
      this.program.illustration = e.target.files[0];
    },
    async createProgram() {
      try {
        const formData = new FormData();
        formData.append('name', this.program.name);
        formData.append('description', this.program.description);
        formData.append('illustration', this.program.illustration);
        formData.append('start_date', this.program.start_date);
        formData.append('end_date', this.program.end_date);
        // TODO: Remplacer le jeton d'accès statique par celui de l'utilisateur connecté
        axios.defaults.headers.common["Authorization"] = "Bearer 2|gOrimVY0wJGDVd5PAFzaxS2lFdDrUk8QZ4ZK0kUX5bee20a1";
        // Envoi de la requête POST pour créer un nouveau programme et recevoir la réponse
        const response = await axios.post(`${process.env.VUE_APP_API_URI}/api/programs`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Réinitialiser le formulaire après la création réussie
        this.program = {
          name: '',
          description: '',
          illustration: null,
          start_date: '',
          end_date: ''
        };
        console.log(response);
        alert('Le programme a été créé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la création du programme :', error);
        alert('Une erreur est survenue lors de la création du programme. Veuillez réessayer.');
      }
    }
  }
};
</script>
