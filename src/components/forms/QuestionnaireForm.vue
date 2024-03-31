<template>
  <v-form @submit.prevent="saveQuestionnaire">
    <v-text-field v-model="questionnaire.title" label="Titre" required></v-text-field>
    <v-textarea v-model="questionnaire.description" label="Description"></v-textarea>
    <!-- Liste des questions -->
    <QuestionForm v-for="(question, index) in questionnaire.questions" :key="index" @sentQuestion="updateQuestion" :index="index" :q_order="question.order" @remove="removeQuestion"></QuestionForm>
    <v-btn @click="addQuestion" color="primary">Ajouter une question</v-btn>
    <v-btn type="submit" color="success">Enregistrer le questionnaire</v-btn>
  </v-form>
</template>

<script>
import QuestionForm from './QuestionForm.vue';
import axios from "axios";

export default {
  props: {
    subjectId: {
      required: true
    }
  },
  components: {
    QuestionForm
  },
  data() {
    return {
      questionnaire: {
        title: '',
        description: '',
        subject_id: this.subjectId,
        questions: []
      }
    };
  },
  methods: {
    addQuestion() {
      this.questionnaire.questions.push({
        text: '',
        order: this.questionnaire.questions.length,
        options: []
      });
    },
    updateQuestion({ question, index }) {
      this.questionnaire.questions[index] = question;
    },
    removeQuestion(index) {
      this.questionnaire.questions.splice(index, 1);
    },
    async saveQuestionnaire() {
      try {
        await axios.post(`${process.env.VUE_APP_API_URI}/api/questionnaires/create-full`, this.questionnaire, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Reset the form after successful creation
        this.questionnaire.title = "";
        this.questionnaire.description = "";
        this.questionnaire.questions = [];
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
