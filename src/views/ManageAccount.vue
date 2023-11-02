<template>
    <div class="main">
        <div class="right">
            <DimoVR />
            <div class="inputs">
                <p class="create">Manage Account</p>
                <p class="welcome">Welcome Nom Prénom</p>
            </div>
        </div>
        <div class="left" style="background-color:red; width: fit-content; padding: 2%">
            <p class="edits">Home</p>
            <p class="edits">Personal informations</p>
            <p class="edits">Security and confidentiality</p>
            <p class="edits">Contact and share</p>
            <v-divider :thickness="7"></v-divider>
            <p class="edits">About</p>
        </div>

    </div>
</template>

<script>
import { generalColors } from '../../globalVars'
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

        }
    },
}
</script>

<style>
body {
    background-color: #F0F0F0;
}

.main {
    font-family: 'Raleway', sans-serif;
    margin-top: 8%;
    margin-bottom: auto;
}

.edits {
    margin: 10% auto;
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
    color: #2A6A8A !important;
    font-weight: bold;
    font-size: 32px;
    margin: 5% auto 10% auto;
}

.welcome {
    color: #2A6A8A !important;
    font-size: 24px;
    margin: 5% auto 10% auto;
}

.input {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10%;
    background-color: #E6E6E6;
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
    background-color: #219EBC !important;
}

span.signup_button {
    font-size: 20px;
}

.inputs {
    display: flex;
    flex-direction: column;
    width: 25%;
    margin: 0 auto;
}
</style>