<template>
  <v-app>
    <v-main>
      <AppLayout>
        <router-view></router-view>
      </AppLayout>
    </v-main>
  </v-app>
</template>

<script>

import AppLayout from "@/views/AppLayout.vue";
import {mapGetters} from "vuex";

export default {
  components: {
    AppLayout
  },

  data: () => ({
  }),
  computed: {
    ...mapGetters(['isRolePresent']),
    isStudent() {
      return this.isRolePresent('student');
    }
  }
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

.no-text-decoration{
  text-decoration: none !important;
}

.flex-center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-restrict-width {
  width: 90%;
  max-width: 1800px;
  margin: 0 auto;
}
.wholePage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96vh;
  flex-direction: column;
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


</style>
