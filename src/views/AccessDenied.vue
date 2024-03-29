<template>
  <div class="wholePage">
    <h1 class="">Accès interdit</h1>
    <p>Désolé, Dimo ne vous autorise pas à accéder à cette page.</p>
    <p v-if="isAuthenticated">Vous êtes authentifié en qualité
      <strong v-if="isRolePresent('admin')">d'administrateur</strong>
      <strong v-else-if="isRolePresent('teacher')">de professeur</strong>
      <strong v-else-if="isRolePresent('student')">d'étudiant</strong>
    </p>
    <p v-else>Vous n'êtes pas authentifié.</p>

  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "AccessDenied",
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapGetters(["isRolePresent"]),
    ...mapState(["isAuthenticated"]),
  },
};
</script>
<style scoped>
h1 {
  color: red;
}

</style>