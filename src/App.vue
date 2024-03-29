<template>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script>

export default {
  components: {
  },

  data: () => ({
  }),
};
</script>

<style>
body {
  margin: 0 !important;
  background: var(--background)
}

.input {
  border-radius: 5px;
  margin-bottom: 20px !important;
  font-size: 16px;
  background-color: var(--input);
  height: 55px !important;
  padding: 10px;
  border: solid 1px grey;
}

.inputs {
  width: 100% !important;
  height: fit-content !important;
  padding: 0 !important;
  color: var(--nightPurple) !important;
  font-size: 32px;
  margin-bottom: 10px !important;
}

.welcome_message {
  font-size: 40px;
  color: var(--blue);
  text-align: center;
}

.v-main__wrap {
  margin-top: 0 !important;
}

:root {
  --lightBlue: #B6D0E2;
  --mediumBlue: #219EBC;
  --darkBlue: #2a6a8a;
  --nightBlue: #10415a;
  --boldOrange: #FB8500;
  --lightOrange: #FFA800;
  --lightRed: #d9534f;
  --mediumRed: #c9302c;
  --nightPurple: #8E68E6;
  --bluePurple: #5271FF;
  --darkPurple: #2E1042;
  --lightPurple: #E1CCFF;
  --background: #C6D4FF;
  --blue: #668FFF;
  --button: #2485CF;
  --input: #D6E6FB;
}
</style>
