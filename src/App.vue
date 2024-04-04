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

/* Wrapper for all pages (when user is not logged in) */
.main {
  font-family: "Fredoka One", sans-serif !important;
  margin: 10px auto 0 auto !important;
  background-color: var(--background) !important;
}

/* Wrapper for all pages (when user is logged in) */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: "Fredoka One", sans-serif !important;
  margin-top: 80px;
}

.input {
  border-radius: 5px;
  margin-bottom: 20px !important;
  font-size: 16px;
  background-color: var(--input);
  height: 55px !important;
  padding: 10px;
  border: solid 1px grey;
  width: 20vw;
}

/* Page title (when user is logged in) */
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

/* Style for all inputs containers */
.input_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  width: fit-content;
}

/* Style for all inputs titles */
.input_title {
  font-size: 20px;
  color: var(--blue);
  font-weight: normal;
  margin-bottom: 2px;
}

/* Style for all buttons */
.button {
  padding: 30%;
  color: white !important;
  font-weight: bold;
  background-color: var(--button) !important;
  width: 15vw;
  font-size: 20px !important;
}

.page_title {
  font-size: 30px;
  margin: 20px 0 30px 0 !important;
  font-weight: normal;
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
  --background: #FFFFFF;
  --blue: #668FFF;
  --button: #2485CF;
  --input: #D6E6FB;
}
</style>
