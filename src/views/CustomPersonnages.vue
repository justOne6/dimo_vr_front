<template>
  <div class="main">
    <DimoVR />
    <p class="custom">Custom your characters</p>
    <div class="container">
      <canvas ref="gameCanvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import DimoVR from "@/components/DimoVR.vue";

export default {
  components: { DimoVR },

  mounted() {
    this.drawCharacters();
  },
  methods: {
    drawCharacters() {
      const canvas = this.$refs.gameCanvas;
      const context = canvas.getContext("2d");

      context.fillStyle = "black";
      context.fillRect(50, 50, 100, 100);
    },
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}

.main {
  font-family: "Raleway", sans-serif;
  margin-top: 8%;
  margin-bottom: auto;
}

.custom {
  color: #2a6a8a !important;
  font-weight: bold;
  font-size: 32px;
  margin: 0 auto;
  width: fit-content;
  border-radius: 5px;
}
.canvas {
  width: 500px;
  height: 500px;
}
.container {
  border: 5px solid #bde0fe;
  background-repeat: no-repeat;
  background-color: #fef9ef;
  justify-content: center;
}
</style>
