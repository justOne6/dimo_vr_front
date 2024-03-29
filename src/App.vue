<template>
  <v-main>
    <AppLayout>
      <router-view></router-view>
    </AppLayout>
  </v-main>
</template>

<script>

import AppLayout from "@/views/AppLayout.vue";

export default {
  components: {
    AppLayout
  },

  data: () => ({
  }),
};
</script>

<style>
body {
  margin: 0 !important;
  font-family: "Fredoka", sans-serif !important;
}

.v-main__wrap {
  margin-top: 0 !important;
}

:root {
  --lightBlue: #B6D0E2;
  --mediumBlue: #219EBC;
  --darkBlue: #2a6a8a;
  --nightBlue: #10415a;
  --mediumGrey: #E6E6E6;
  --boldOrange: #FB8500;
  --lightOrange: #FFA800;
  --lightGrey: #F0F0F0;
  --lightRed: #d9534f;
  --mediumRed: #c9302c;
  --nightPurple: #8E68E6;
  --bluePurple: #5271FF;
  --darkPurple: #2E1042;
  --lightPurple: #E1CCFF;
  --dimoColor1: #2E1042;
  --dimoColor2: #5271FF;
  --dimoColor3: #8E68E6;
  --dimoColor4: #38B6FF;
  --dimoWhite: #FFFFFF;
}

.page-restrict-width {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
