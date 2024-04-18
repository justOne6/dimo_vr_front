<template>
  <div class="footer">
    <p class="footer_text">&copy;2024 DimoVR. Tous droits réservés.</p>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
  setup() {
    return {};
  },
};
</script>

<style scoped>
.footer {
  margin-bottom: 0px !important;
  margin-top: 100px !important;
  margin-left: auto;
  margin-right: auto;
  color: black;
  text-align: center;
}

.footer_text {
  font-weight: bold !important;
  font-size: 10px;
  font-family: "Fredoka-One", sans-serif !important;
}
</style>
