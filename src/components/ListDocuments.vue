<template>
  <div class="documents-wrapper">
    <h1>Documents</h1>
    <div v-for="document in documents" :key="document.id" class="document">
      <p>{{ document.title }}</p>
      <a :href="document.file_path" target="_blank">Télécharger</a>
      <v-btn @click="deleteDocument(document.id)" color="error" class="deleteButton" v-if="isAdmin || isTeacher">Supprimer</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from "vuex";

export default {
  name: 'ListDocuments',
  data() {
    return {
      documents: [],
    };
  },
  props: {
    subjectId: { required: true }
  },
  beforeMount() {
    this.fetchDocuments();
  },
  computed: {
    ...mapState(['reloadDocuments']),
    ...mapGetters(['isRolePresent']),
    isStudent() {
      return this.isRolePresent('student');
    },
    isTeacher() {
      return this.isRolePresent('teacher');
    },
    isAdmin() {
      return this.isRolePresent('admin');
    },
  },
  methods: {
    async fetchDocuments() {
      if (this.isStudent || this.isTeacher || this.isAdmin) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_URI}/api/documents/${this.subjectId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          // Filter documents related to the subject
          this.documents = response.data.documents.filter(document => document.subject_id === parseInt(this.subjectId));
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      }
    },
    async deleteDocument(documentId) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_URI}/api/documents/${documentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Après la suppression réussie, mettez à jour reloadDocuments pour recharger la liste
        this.$store.commit('updateReloadDocuments');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  },
  watch: {
    // Call the fetchDocuments method when the reloadDocuments state changes
    reloadDocuments() {
      this.fetchDocuments();
    }
  },
};
</script>

<style scoped>

.document {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
}

</style>
