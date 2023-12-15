<template>
  <div>
    <Navbar />
    <div class="main">
      <div>
        <p class="create">Lost password ?</p>
        <p>Your email</p>
        <v-text-field outlined class="input" type="text" placeholder="Email"></v-text-field>
        <p>New password</p>
        <v-text-field outlined class="input" type="text" placeholder="Password"></v-text-field>
        <p>Confirm new password</p>
        <v-text-field outlined class="input" type="text" placeholder="Password"></v-text-field>
      </div>
      <div class="signup">
        <v-btn class="signup_button"><span>RESET PASSWORD</span></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  data() {
    return {
    };
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}

.create {
  color: #2a6a8a !important;
  font-weight: bold;
  font-size: 32px;
  margin: 5% auto 10% auto;
}

.signup {
  margin: 0 auto;
  width: fit-content;
  border-radius: 5px;
}

.signup_button {
  padding: 30%;
  color: white !important;
  font-weight: bold;
  background-color: #219ebc !important;
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
  font-family: "Raleway", sans-serif;
  margin: 75px auto 0 auto !important;
  width: 30vw !important;
  /* the navbar's height is 63px */
}
</style>
