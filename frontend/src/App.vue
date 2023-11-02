<template>
  <v-main>
    <ManageAccount />
    <!--<ForgottenPassword />-->
    <!--<SignUp />-->
  </v-main>
</template>

<script>
import ManageAccount from './views/ManageAccount.vue'
//import ForgottenPassword from './views/ForgottenPassword.vue';
//import SignUp from './views/SignUp.vue';

export default {

  components: {
    ManageAccount,
    //SignUp,
    //ForgottenPassword,
  },

  data: () => ({
    //
  }),
};
</script>
