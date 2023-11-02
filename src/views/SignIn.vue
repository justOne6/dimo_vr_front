<template>
  <div class="main">
    <DimoVR />
    <div class="inputs">
      <p class="create">Sign In</p>
      <input class="input" type="text" placeholder="Email" />
      <input class="input" type="text" placeholder="Password" />
    </div>
    <div style="margin: 2% auto; width: fit-content">
      <a href="/forgotten-password" style="color: #2A6A8A; font-weight: bold; text-decoration: none;">Forgot password
        ?</a>
    </div>
    <div class="signup">
      <v-btn class="signup_button"><span>SIGN IN</span></v-btn>
    </div>
  </div>
</template>

<script>
import { generalColors } from "../../globalVars";
import DimoVR from "@/components/DimoVR.vue";
export default {
  components: {
    DimoVR,
  },
  data() {
    return {
      medimuBlue: generalColors.mediumBlue,
      darkBlue: generalColors.darkBlue,
      mediumGrey: generalColors.mediumGrey,
      boldOrange: generalColors.boldOrange,
      lightOrange: generalColors.lightOrange,
    };
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}

.main {
  font-family: "Raleway", sans-serif;
  margin-top: 8%;
  margin-bottom: auto;
}

.create {
  color: #2a6a8a !important;
  font-weight: bold;
  font-size: 32px;
  margin: 5% auto 10% auto;
}

.input {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10%;
  background-color: #e6e6e6;
  font-size: 16px;
}

.signin {
  margin: 0 auto;
  width: fit-content;
  border-radius: 5px;
}

.signin_button {
  color: white !important;
  font-weight: bold;
  padding: 2% 20% !important;
  background-color: #219ebc !important;
}

span.signin_button {
  font-size: 20px;
}

.inputs {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 0 auto;
}
</style>
