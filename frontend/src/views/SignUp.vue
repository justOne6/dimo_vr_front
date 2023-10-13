<template>
    <div>
        <p>Create Account</p>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <v-btn class="signup">SIGN UP</v-btn>
    </div>
</template>

<script>
import { generalColors } from '../../globalVars'
export default {
    data() {
        return {
            medimuBlue: generalColors.mediumBlue,
        }
    },
}
</script>

<style>
.signup {
    background-color: var(--mediumBlue);
}
</style>