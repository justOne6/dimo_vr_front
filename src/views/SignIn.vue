<template>
  <div class="main">
    <div class="title">
      <span style="color: #fb8500" class="dimo">Dimo</span>
      <span style="color: #ffa800; font-weight: bold">VR</span>
    </div>
    <div class="inputs">
      <p class="create">Sign In</p>
      <input class="input" type="text" placeholder="Email" />
      <input class="input" type="text" placeholder="Password" />
    </div>
    <div class="signup">
      <v-btn class="signup_button"><span>SIGN IN</span></v-btn>
    </div>
  </div>
</template>

<script>
import { generalColors } from "../../globalVars";
export default {
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

.dimo {
  color: var(--lightOrange);
  font-weight: bold;
}

.title {
  font-size: 48px;
  margin: 0 auto !important;
  width: fit-content;
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
