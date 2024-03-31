<template>
  <div>
    <!-- Hero section -->
    <Hero />

    <!-- Program list section -->
    <div >
      <h2 class="text-center mb-5">Nos Programmes Éducatifs</h2>
      <ProgramList/>
    </div>

    <!-- Call-to-action section -->
    <v-row class="mb-10">
      <v-col cols="12" class="text-center">
        <DButton href="/sign-up">Je rejoins Dimo !</DButton>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import DButton from "@/components/DButton.vue";
import ProgramList from "@/components/ListPrograms.vue";
import {mapGetters} from "vuex";

export default {
  name: 'AppHome',
  components: {ProgramList, DButton, Hero},
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
