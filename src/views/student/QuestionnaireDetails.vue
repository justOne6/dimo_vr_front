<template>
  <div class="page-restrict-width questionnaire-wrapper">
    <p>
      Toute bonne réponse vous rapporte 1 point.<br>
      Toute mauvaise réponse vous enlève 1 point.<br>
      Vous pouvez donc obtenir un score négatif.<br>
      Votre résultat sera affiché à la fin du questionnaire en pourcentage.

    </p>
    <v-card>
      <v-card-title class="text-h2" v-text="questionnaire.title"></v-card-title>
      <v-card-text v-text="questionnaire.description"></v-card-text>
      <v-divider></v-divider>
      <div>
          <div
            v-for="question in questionnaire.questions"
            :key="question.id"
          >
            <h3>{{question.text}}</h3>
            <ul>
                <v-checkbox
                    v-for="option in question.options"
                    :key="option.id"
                    :label="option.text"
                    v-model="option.selected"
                ></v-checkbox>
            </ul>
          </div>
      </div>
      <v-divider></v-divider>
      <v-btn @click="saveAnswers" color="primary">Envoyer les réponses</v-btn>
    </v-card>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuestionnaireDetails",
  props: {
    questionnaireId: {
      required: true,
    },
  },
  components: {

  },
data() {
    return {
      questionnaire: {},
    };
  },
  beforeMount() {
    this.fetchQuestionnaire();
  },
  methods: {
    async fetchQuestionnaire() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URI}/api/questionnaires/${this.questionnaireId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.questionnaire = response.data.questionnaire;
        // Ajouter une propriété pour stocker les réponses de l'utilisateur
        this.questionnaire.questions.forEach(question => {
          question.options.forEach(option => {
            this.$set(option, "selected", false);
          });
        });
        console.log(this.questionnaire);
      } catch (error) {
        console.error("Error fetching questionnaire:", error);
      }
    },
    async saveAnswers() {
      // console.log("Réponses du questionnaire :", this.questionnaire);
      try {
        const score = await axios.post(
            `${process.env.VUE_APP_API_URI}/api/questionnaires/answers`,
            this.questionnaire,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );
        alert("Votre score est de " + score.data.score + " %")
      }
      catch (error) {
        console.error("Error saving answers:", error);
      }
    }
  },
};
</script>

<style scoped>
.questionnaire-wrapper {
  margin-top: 7rem;
}
.questionnaire-wrapper .v-list-item{
  flex-direction: column;
}
</style>