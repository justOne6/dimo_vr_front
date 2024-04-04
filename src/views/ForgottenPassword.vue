<template>
  <div class="main">
    <div>
      <p class="welcome_message">WELCOME TO DIMOVR</p>
      <p class="page_title">Change password</p>
      <div class="input_container">
        <p class="input_title">Old password</p>
        <input placeholder="Enter text..." class="input" v-model="email" />
      </div>
      <div class="input_container">
        <p class="input_title">New password</p>
        <input placeholder="Enter text..." class="input" v-model="email" />
      </div>
    </div>
    <div class="signup">
      <v-btn class="button"><span>Confirm</span></v-btn>
    </div>
    <div style="margin: 2% auto; width: fit-content">
      <router-link to="/" style="color: var(--nightPurple); font-weight: bold; text-decoration: none">Return to home
        page</router-link>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
    };
  },
};
</script>

<style>
body {
  background-color: var(--background);
}

.signup {
  margin: 0px auto;
  width: fit-content;
  border-radius: 5px;
}

span.signup_button {
  font-size: 20px;
}

.v-text-field {
  border-width: 0 !important;
}
</style>
