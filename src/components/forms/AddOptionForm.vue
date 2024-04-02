<template>
  <div class="option">
    <v-text-field v-model="option.text" label="Option" required></v-text-field>
    <v-switch v-model="option.is_correct" label="Est correct"></v-switch>
    <v-btn @click="removeOption" color="error">Supprimer cette option</v-btn>
  </div>
</template>

<script>
export default {
  props: ['optionIndex'],
  data() {
    return {
      option: {
        text: '',
        is_correct: false
      }
    };
  },
  methods: {
    removeOption() {
      this.$emit('remove', this.optionIndex);
    },
    sendOption() {
      this.$emit('sentOption', this.option, this.optionIndex);
    }
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.sendOption();
      }
    }
  }
};
</script>

<style scoped>

.option {
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>