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
}

.v-main__wrap {
  margin-top: 0 !important;
}

:root {
  --lightBlue: #B6D0E2;
  --mediumBlue: #219EBC;
  --darkBlue: #023047;
  --mediumGrey: #E6E6E6;
  --boldOrange: #FB8500;
  --lightOrange: #FFA800;
  --lightGrey: #F0F0F0;
}
</style>
