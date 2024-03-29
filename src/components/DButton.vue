<template>
  <a :href="href" class="dbutton">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  }
};
</script>


<style scoped>
.dbutton {
  padding: 1rem 2rem;
  display: inline-block;
  text-decoration: none;
  background-color: var(--dimoColor2);
  color: var(--dimoWhite);
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>