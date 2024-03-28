<template>
  <div class="container mt-5">
    <form @submit.prevent="createSubject">
      <div class="form-group">
        <label for="title">Nom</label>
        <input type="text" class="form-control" id="title" v-model="subject.title" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="subject.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="illustration">Illustration</label><br/>
        <input type="file" class="form-control-file" id="illustration" @change="handleIllustrationChange" accept="image/*" required>
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
      subject: {
        title: '',
        description: '',
        illustration: null,
        // TODO: Remplacer la valeur statique par l'identifiant du subjectme parent
        program_id: 1
      },
      response: null
    };
  },
  methods: {
    handleIllustrationChange(e) {
      this.subject.illustration = e.target.files[0];
    },
    async createSubject() {
      try {
        const formData = new FormData();
        formData.append('title', this.subject.title);
        formData.append('description', this.subject.description);
        formData.append('illustration', this.subject.illustration);
        formData.append('program_id', this.subject.program_id);
        // TODO: Remplacer le jeton d'accès statique par celui de l'utilisateur connecté
        axios.defaults.headers.common["Authorization"] = "Bearer 4|g3ptAxeWnacSux8xDR9QPQYJVBV6352Os1Pk9MR887abeb82";
        // Envoi de la requête POST pour créer un nouveau subject et recevoir la réponse
        const response = await axios.post(`${process.env.VUE_APP_API_URI}/api/subjects`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Réinitialiser le formulaire après la création réussie
        this.subject = {
          title: '',
          description: '',
          illustration: null
        };
        console.log(response);
        alert('Le subjectme a été créé avec succès !');
      } catch (error) {
        console.error('Erreur lors de la création de la matière :', error);
        alert('Une erreur est survenue lors de la création de la matière. Veuillez réessayer.');
      }
    }
  }
};
</script>
