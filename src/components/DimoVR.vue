<template>
    <div class="title">
        <router-link to="/" style="text-decoration: none">
            <span class="dimo">Dimo</span>
            <span class="vr">VR</span>
        </router-link>
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
    margin: 0 auto !important;
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