<template>
    <div class="title">
        <router-link to="/" style="text-decoration: none">
            <img src="../assets/Dimo.png" style="width: 40px !important; margin-right: 10px;" />
            <span class="dimo">Dimo</span>
            <span class="vr">VR</span>
        </router-link>
        <br /><br />
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
}
</script>

<style>
.title {
    font-size: 48px;
    margin: 0 auto 100px auto !important;
    width: fit-content;
    text-decoration: none;
}

.dimo {
    color: #fb8500 !important;
    font-weight: bold;
    text-decoration: none;
}

.vr {
    color: #ffa800;
    font-weight: bold;
    text-decoration: none;
}
</style>