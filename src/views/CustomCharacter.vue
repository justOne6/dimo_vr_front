<template>
  <div class="main">
    <DimoVR/>
    <p class="custom">Custom your characters</p>
    <div class="container">
      <div class="center-container">
        <div class="hair">
          <Hair1 :color="hairColor"/>
          <div class="hair_color">
            <label for="hairColor">Hair Color:</label>
            <input id="hairColor" v-model="hairColor" type="color"/>
          </div>
        </div>
        <div class="skin">
          <Body :colorBody="bodyColor" :colorHead="headColor"/>
          <div class="head_color">
            <label for="headColor">Head Color:</label>
            <input id="headColor" v-model="headColor" type="color"/>
          </div>
          <div class="body_color">
            <label for="bodyColor">Body Color:</label>
            <input id="bodyColor" v-model="bodyColor" type="color"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DimoVR from "@/components/DimoVR.vue";
import Hair1 from "@/assets/custom/hair/Hair1SVG.vue";
import Body from "@/assets/custom/body/BodySVG.vue";

export default {
  components: {Body, Hair1, DimoVR},
  data() {
    return {
      hairColor: "#5286FF",
      headColor: "#F96C9D",
      bodyColor: "#D37878",
    };
  },
};
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hair,
.skin {
  margin: 10px;
}

/* Vos styles existants ici */
</style>
