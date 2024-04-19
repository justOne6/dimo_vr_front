<template>
  <div class="hero-wrapper">
    <div class="page-restrict-width">
      <div class="hero-content-wrapper">
        <div class="introduction">
          <h1>Bienvenue {{ user.firstname }}</h1>
          <h1>
            Votre portail vers un monde d'apprentissage immersif et illimité
          </h1>
          <p>
            Plongez dans une expérience éducative immersive où les frontières de
            la salle de classe traditionnelle s'effacent pour laisser place à un
            univers de possibilités infinies!
          </p>
          <!--          <v-btn
            v-if="!isAuthenticated"
            color="var(&#45;&#45;bluePurple)"
            href="/sign-up"
            ><span style="color: var(&#45;&#45;dimoWhite)">Je rejoins Dimo</span></v-btn
          >-->
        </div>
        <div class="image-wrap">
          <img src="../assets/Dimo.png" alt="Logo DimoVr" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppHero",
  components: {},
  computed: { ...mapState(["isAuthenticated"]) },
  setup() {
    return {};
  },
  data() {
    return { user: [] };
  },
  async mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log("helloooo");
    },
  },
};
</script>

<style scoped>
.hero-wrapper {
  background: linear-gradient(to bottom, var(--babyBlue), var(--dimoWhite));
  color: var(--dimoColor1);
  margin: 3rem 0;
}

.hero-content-wrapper {
  padding: 4rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.introduction {
  width: 60%;
}

.introduction p {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 2rem 0;
}

.image-wrap {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.image-wrap img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
