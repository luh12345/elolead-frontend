<template>
  <v-app>
    <!-- Content -->
    <v-main>
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-main>

    <!-- Loading bar -->
    <loading-bar />

    <!-- Footer -->
    <v-footer :absolute="true" app color="primary" dark>
      <span>&copy;Elogroup - Eloleads {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
</script>
