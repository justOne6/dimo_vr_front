<template>
  <div>
    <v-form @submit.prevent="addDocument">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="document.title" label="Titre" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-file-input v-model="document.file" label="Selectionner un fichier" required></v-file-input>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" type="submit">Add Document</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import {mapActions} from "vuex";

export default {
  name: "AddDocument",
  props: ["subjectId"],
  data() {
    return {
      document: {
        title: "",
        file: null,
      },
    };
  },
  computed: {
    ...mapActions(["updateReloadDocuments"]),
  },
  methods: {
    async addDocument() {
      const formData = new FormData();
      formData.append("title", this.document.title);
      formData.append("subject_id", this.subjectId);
      formData.append("file", this.document.file);
      try {
        await axios.post(`${process.env.VUE_APP_API_URI}/api/add-document`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((response) => {
          if(response.status === 200) {
            // Reload the documents list after successful creation
            this.$store.commit("updateReloadDocuments");
            // Reset the form after successful creation
            this.document.title = "";
            this.document.file = null;
          }
        }).catch((error) => {
          console.error(error);
        });

      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>
