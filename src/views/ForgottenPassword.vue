<template>
  <div>
    <div class="main">
      <DimoVR />
      <div class="inputs">
        <p style="margin-bottom: 5%">
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>
        <input class="input" type="text" placeholder="Email" />
      </div>
      <div class="signup">
        <v-btn class="signup_button"><span>CONTINUE</span></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { generalColors } from "../../globalVars";
import DimoVR from "@/components/DimoVR.vue";

export default {
  components: { DimoVR },
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

.main {
  font-family: "Raleway", sans-serif;
  margin: 2vh auto auto auto;
  width: 40vw;
}
</style>
