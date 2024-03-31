<template>
  <div class="question">
    <v-text-field v-model="question.text" :label="'Question ' + (index + 1)" required></v-text-field>

    <!-- Liste des options -->
    <OptionForm v-for="(option, optionIndex) in question.options" :key="optionIndex" :optionIndex="optionIndex" @sentOption="updateOption" @remove="removeOption(optionIndex)"></OptionForm>

    <v-btn @click="addOption" color="primary">Ajouter une option</v-btn>

    <v-btn @click="removeQuestion" color="error">Supprimer cette question</v-btn>
  </div>
</template>

<script>
import OptionForm from "@/components/forms/OptionForm.vue";

export default {
  components: {
    OptionForm
  },
  props: {
    "index":{type: Number, required: true},
    "q_order":{type: Number, required: true},
  },
  data() {
    return {
      question: {
        text: "",
        options: [],
        order: this.q_order,
      },
    };
  },
  methods: {
    sendQuestion() {
      this.$emit("sentQuestion", {
        question: this.question,
        index: this.index,
      });
    },
    removeQuestion() {
      this.$emit('remove', this.index);
    },
    addOption() {
      this.question.options.push({ text: '', is_correct: false });
    },
    updateOption(option, optionIndex) {
      this.question.options[optionIndex] = option;
    },
    removeOption(optionIndex) {
      this.question.options.splice(optionIndex, 1);
    },
  },
  watch: {
    question: {
      deep: true,
      handler() {
        this.sendQuestion();
      },
    },
  },
};

</script>

<style scoped>
.question {
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>