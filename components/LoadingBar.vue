<template>
  <v-dialog v-model="loading" persistent width="300">
    <v-card>
      <v-card-text>
        Carregando...
        <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style>
</style>