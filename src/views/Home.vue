<template>
  <div>
    <!-- Hero section -->
    <Hero />

    <!-- Program list section -->
    <div>
      <h2 class="text-center mb-5">Nos classes</h2>
      <ProgramList />
    </div>

    <!-- Call-to-action section -->

    <v-btn class="button" href="/sign-up">Je rejoins Dimo !</v-btn>


  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import ProgramList from "@/components/ListPrograms.vue";
import { mapGetters } from "vuex";

export default {
  name: 'AppHome',
  components: { ProgramList, Hero },
  computed: {
    ...mapGetters(['isRolePresent']),
    isStudent() {
      return this.isRolePresent('student');
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleSignup() {
      // Handle signup action
    }
  }
};
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici si nécessaire */
</style>
