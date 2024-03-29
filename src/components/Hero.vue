<template>
  <div class="hero-wrapper">
    <div class="page-restrict-width">
      <div class="hero-content-wrapper">
        <div class="introduction">
          <h1>Votre portail vers un monde d'apprentissage immersif et illimité</h1>
          <p>
            Plongez dans une expérience éducative immersive où les frontières de la salle de classe traditionnelle s'effacent pour laisser place à un univers de possibilités infinies.
          </p>
          <a class="register-button" href="/sign-in" >Rejoindre Dimo</a>
        </div>
        <div class="image-wrap">
          <img src="../assets/Dimo.png"  alt="Logo DimoVr"/>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: "AppHero",
  setup() {
    return {

    };
  },
};
</script>

<style scoped>
.hero-wrapper{
  background: linear-gradient(to bottom, var(--dimoColor4), var(--dimoWhite));
  color: var(--dimoColor1);
  margin: 3rem 0;
}
.hero-content-wrapper{
  padding: 4rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.introduction{
  width: 60%;
  padding: 0 2rem;
}

.introduction p{
  font-size: 1.2rem;
  font-weight: bold;
  margin: 2rem 0;
}
.image-wrap{
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.image-wrap img{
  width: 100%;
  height: auto;
  object-fit: cover;
}

.register-button {
  padding: 1rem 2rem;
  display: inline-block;
  text-decoration: none;
  background-color: var(--dimoColor2);
  color: var(--dimoWhite);
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>