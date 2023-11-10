<template>
  <div class="main">
    <div class="right">
      <DimoVR />
    </div>
    <h1 class="title">Helooo</h1>
  </div>
</template>

<script>
import { generalColors } from "../../globalVars";
import DimoVR from "@/components/DimoVR.vue";
export default {
  components: { DimoVR },
  data() {
    return {
      medimuBlue: generalColors.mediumBlue,
      darkBlue: generalColors.darkBlue,
      mediumGrey: generalColors.mediumGrey,
      boldOrange: generalColors.boldOrange,
      lightOrange: generalColors.lightOrange,
    };
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

.edits {
  margin: 10% auto;
  font-size: 18px;
}

.dimo {
  color: var(--lightOrange);
  font-weight: bold;
}

.title {
  font-size: 48px;
  margin: 0 auto !important;
  width: fit-content;
}
</style>
