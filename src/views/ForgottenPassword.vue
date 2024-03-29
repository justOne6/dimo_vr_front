<template>
  <div>
    <Navbar />
    <div class="main">
      <div class="inputs">
        <p style="margin-bottom: 5%">
          Change password
        </p>
        <input class="input" type="text" placeholder="Old password" />
        <input class="input" type="text" placeholder="New password" />
      </div>
      <div class="signup">
        <v-btn class="signup_button"><span>Confirm</span></v-btn>
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
  background-color: var(--background);
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
  background-color: var(--bluePurple) !important;
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
  margin: 75px auto 0 auto !important;
  width: 30vw !important;
  /* the navbar's height is 63px */
}
</style>
