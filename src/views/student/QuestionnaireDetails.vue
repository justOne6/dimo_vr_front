<template>
  <div class="page-restrict-width questionnaire-wrapper">
    <p v-if="!isAlreadyTreated">
      Toute bonne réponse vous rapporte 1 point.<br>
      Toute mauvaise réponse vous enlève 1 point.<br>
      Vous pouvez donc obtenir un score négatif.<br>
      Votre résultat sera affiché à la fin du questionnaire en pourcentage.
    </p>
    <h5 class="resultat" v-if="isAlreadyTreated">Vous avez obtenu un score de {{this.score}}% à ce questionnaire. </h5>
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
                    :disabled="isAlreadyTreated"
                ></v-checkbox>
            </ul>
          </div>
      </div>
      <v-divider></v-divider>
      <v-btn v-if="!isAlreadyTreated" @click="saveAnswers" color="primary">Envoyer les réponses</v-btn>
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
      isAlreadyTreated : false,
      score: 0,
    };
  },
  beforeMount() {
    this.checkWhatToDisplay();
  },
  methods: {
    // Vérifier si l'élève a déjà répondu à ce questionnaire
    async checkWhatToDisplay() {
      try{
        // Vérifier si l'élève a déjà répondu à ce questionnaire
        const alreadyTreated = await axios.get(
            `${process.env.VUE_APP_API_URI}/api/treated/${this.questionnaireId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );
        // Caster les résultats en tableau
        let data = alreadyTreated.data;
        // Si l'élève a déjà répondu à ce questionnaire l'afficher avec ses réponses
        await this.displayQuestionnaireWithAnswers(data);
      }
      catch (error) {
        // si c'est une erreur 404, c'est que l'élève n'a pas encore répondu à ce questionnaire
        if (error.response.status === 404) {
          // Récupérer les données du questionnaire à remplir
          await this.fetchQuestionnaire();
        } else {
          console.error("Error checking what to display:", error);
        }
      }

    },
    displayQuestionnaireWithAnswers(data){
      console.log(data);
      this.isAlreadyTreated = true;
      this.score = data.score;
      this.questionnaire = data.questionnaire;
      // Ajouter une propriété pour stocker les réponses de l'utilisateur
      this.questionnaire.questions.forEach(question => {
        question.options.forEach(option => {
          this.$set(option, "selected", data.answers.some(answer => answer.option_id === option.id));
        });
      });

    },
    // Récupérer les données du questionnaire
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
        await axios.post(
            `${process.env.VUE_APP_API_URI}/api/questionnaires/answers`,
            this.questionnaire,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );
        // Raffraichir la page
        await this.checkWhatToDisplay();
      }
      catch (error) {
        // si un code 400, c'est que le formulaire est déjà rempli
        if (error.response.status === 400) {
          alert("Vous ne pouvez pas répondre à ce questionnaire plusieurs fois.");
        } else {
          console.error("Error saving answers:", error);
        }
      }
    },
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