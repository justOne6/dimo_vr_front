<template>
  <div>
    <!-- Hero section -->
    <Hero />

    <!-- Program list section -->
    <v-row class="mb-10">
      <v-col cols="12">
        <h2 class="text-center mb-5">Nos Programmes Éducatifs</h2>
        <!-- Replace with your program list -->
        <v-list dense>
          <v-list-item v-for="(program, index) in programs" :key="index">
            <v-list-item-title>{{ program.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ program.description }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Call-to-action section -->
    <v-row class="mb-10">
      <v-col cols="12" class="text-center">
        <v-btn color="primary" large @click="handleSignup">S'inscrire à DimoVR</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";

export default {
  name: 'AppHome',
  components: {Hero},
  data() {
    return {
      programs: [
        {name: 'Programme 1', description: 'Description du programme 1'},
        {name: 'Programme 2', description: 'Description du programme 2'},
        {name: 'Programme 3', description: 'Description du programme 3'},
        // Add more programs as needed
      ]
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
