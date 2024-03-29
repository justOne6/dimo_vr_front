<template>
  <div class="main">
    <div>
      <p style="font-size: 40px; color: var(--blue)">WELCOME TO DIMOVR</p>
      <p style="font-size: 30px; margin: 40px 0; font-weight: normal; color: var(--blue)">
        Change password
      </p>
      <div style="display: flex; flex-direction: column; align-items: flex-start; margin: 0 200px">
        <p style="font-size: 20px; color: var(--blue); font-weight: normal;">Old password</p>
        <v-text-field outlined clearable background-color=var(--input) label="Enter text..." style="width: 20vw"
          v-model="email"></v-text-field>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-start; margin: -20px 200px 0 200px">
        <p style="font-size: 20px; color: var(--blue); font-weight: normal;">New password</p>
        <v-text-field outlined clearable background-color=var(--input) label="Enter text..." style="width: 20vw"
          v-model="email"></v-text-field>
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
</style>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 5% auto 3% auto;
}
</style>

<style scoped>
.input {
  border-radius: 5px;
  margin: 10px 0 45px 0 !important;
  font-size: 16px;
  background-color: #E6E6E6;
  height: 55px !important
}

.main {
  font-family: "Fredoka One", sans-serif;
  margin: 10px auto 0 auto !important;
}
</style>
