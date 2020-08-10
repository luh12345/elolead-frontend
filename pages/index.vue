<template>
  <lead-index />
</template>

<script>
import LeadIndex from "./leads/index.vue";

export default {
  middleware: "authorized",
  components: {
    "lead-index": LeadIndex,
  },
};
</script>

<style>
</style>