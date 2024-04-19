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
<!--    <div style="display: flex; justify-content: center">
      <v-btn
        v-if="!isAuthenticated"
        width="20%"
        color="var(&#45;&#45;bluePurple)"
        href="/sign-up"
        ><span style="color: var(&#45;&#45;dimoWhite)">Je rejoins Dimo</span></v-btn
      >
    </div>-->
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import ProgramList from "@/components/ListPrograms.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "AppHome",
  components: { ProgramList, Hero },
  computed: {
    ...mapState(["isAuthenticated"]),
    ...mapGetters(["isRolePresent"]),
    isStudent() {
      return this.isRolePresent("student");
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSignup() {
      // Handle signup action
    },
  },
};
</script>

<style scoped></style>
