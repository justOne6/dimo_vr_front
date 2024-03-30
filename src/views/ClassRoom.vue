<template>
  <div class="main">
    <Navbar />
    <h1>Welcome to your {{ $route.params.label }} classroom!</h1>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default { components: { Navbar } };
</script>

<style></style>
