<template>
  <div class="main">
    <div>
      <p class="welcome_message">WELCOME TO DIMOVR</p>
      <p
        style="font-size: 30px; margin: 20px 0 30px 0 !important; font-weight: normal; color: var(--blue); text-align:center">
        Change password
      </p>
      <div style="display: flex; flex-direction: column; align-items: flex-start; margin: 0 auto; width: fit-content">
        <p style="font-size: 20px; color: var(--blue); font-weight: normal; margin-bottom: 2px">Old password</p>
        <input placeholder="Enter text..." class="input" style="width: 20vw" v-model="email" />
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-start; margin: 0 auto; width: fit-content">
        <p style="font-size: 20px; color: var(--blue); font-weight: normal; margin-bottom: 2px">New password</p>
        <input placeholder="Enter text..." class="input" style="width: 20vw" v-model="email" />
      </div>
    </div>
    <div class="signup">
      <v-btn class="signup_button"><span>Confirm</span></v-btn>
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

.signup_button {
  padding: 30%;
  color: white !important;
  font-weight: bold;
  background-color: var(--button) !important;
  width: 22vw;
  font-size: 20px !important;
}

span.signup_button {
  font-size: 20px;
}

.v-text-field {
  border-width: 0 !important;
}
</style>

<style scoped>
.main {
  font-family: "Fredoka One", sans-serif;
  margin: 12px auto 0 auto !important;
}
</style>
