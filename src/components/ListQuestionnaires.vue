<template>
  <div class="questionnaires-wrapper">
    <h1>Questionnaires</h1>
    <div
      v-for="questionnaire in questionnaires"
      :key="questionnaire.id"
      class="questionnaire"
    >
      <p>{{ questionnaire.title }}</p>
      <router-link
        v-if="isStudent"
        :to="{
          name: 'QuestionnaireDetails',
          params: { questionnaireId: questionnaire.id },
        }"
        >Détails</router-link
      >
      <router-link
        v-if="isTeacher"
        :to="{
          name: 'TeacherQuestionnairePage',
          params: { questionnaireId: questionnaire.id },
        }"
        >Détails</router-link
      >
      <router-link
        v-if="isAdmin"
        :to="{
          name: 'AdminQuestionnairePage',
          params: { questionnaireId: questionnaire.id },
        }"
        >Détails</router-link
      >
      <div v-if="isAdmin || isTeacher">
        <v-btn
          @click="deleteQuestionnaire(questionnaire.id)"
          color="error"
          class="deleteButton"
          >Supprimer</v-btn
        >
        <v-btn
          @click="publish(questionnaire.id)"
          v-if="questionnaire.is_visible === 0"
          color="primary"
          class="startButton"
          >Rendre accéssible</v-btn
        >
        <v-btn
          @click="unPublish(questionnaire.id)"
          v-else
          color="error"
          class="startButton"
          >Rendre inaccéssible</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapState } from "vuex";

export default {
  name: "ListQuestionnaires",
  data() {
    return {
      questionnaires: [],
    };
  },
  props: {
    subjectId: { required: true },
  },
  beforeMount() {
    this.fetchQuestionnaires();
  },
  computed: {
    ...mapState(["reloadQuestionnaires"]),
    ...mapGetters(["isRolePresent"]),
    isStudent() {
      return this.isRolePresent("student");
    },
    isTeacher() {
      return this.isRolePresent("teacher");
    },
    isAdmin() {
      return this.isRolePresent("admin");
    },
  },
  methods: {
    async fetchQuestionnaires() {
      if (this.isStudent) {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URI}/api/student-questionnaires/${this.subjectId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          // Filter questionnaires related to the subject
          this.questionnaires = response.data.questionnaires;
        } catch (error) {
          console.error("Error fetching questionnaires:", error);
        }
      } else if (this.isTeacher || this.isAdmin) {
        try {
          const response = await axios.get(
            `${process.env.VUE_APP_API_URI}/api/questionnaires/subject/${this.subjectId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          // Filter questionnaires related to the subject
          this.questionnaires = response.data.questionnaires;
        } catch (error) {
          console.error("Error fetching questionnaires:", error);
        }
      }
    },
    async deleteQuestionnaire(questionnaireId) {
      try {
        await axios.delete(
          `${process.env.VUE_APP_API_URI}/api/questionnaires/${questionnaireId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$store.commit(
          "updateReloadQuestionnaires",
          !this.reloadQuestionnaires
        );
      } catch (error) {
        console.error("Error deleting questionnaire:", error);
      }
    },
    async publish(questionnaireId) {
      try {
        await axios.put(
          `${process.env.VUE_APP_API_URI}/api/questionnaires/${questionnaireId}/publish`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$store.commit("updateReloadQuestionnaires");
      } catch (error) {
        console.error("Error publishing questionnaire:", error);
      }
    },
    async unPublish(questionnaireId) {
      try {
        await axios.put(
          `${process.env.VUE_APP_API_URI}/api/questionnaires/${questionnaireId}/unpublish`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.$store.commit("updateReloadQuestionnaires");
      } catch (error) {
        console.error("Error unpublishing questionnaire:", error);
      }
    },
  },
  watch: {
    // Call the fetchQuestionnaires method when the reloadQuestionnaires state changes
    reloadQuestionnaires() {
      this.fetchQuestionnaires();
    },
  },
};
</script>

<style scoped>
.questionnaire {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
}
</style>
