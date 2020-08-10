<template>
  <v-app>
    <!-- Navbar -->
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar fixed app dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-title>Bem vindo, {{loggedUser.username}}</v-toolbar-title>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <!-- Loading bar -->
    <loading-bar />

    <!-- Footer -->
    <v-footer app color="primary" dark>
      <span>&copy;Elogroup - Eloleads {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-account-multiple-plus",
          title: "Gerenciar Leads",
          to: "/leads",
        },
      ],
      title: "EloLeads",
    };
  },
  computed: {
    loggedUser() {
      return this.$store.state.auth.loggedUser;
    },
  },
  methods: {
    logout() {
      this.$toastr.s("Até a proxima " + this.loggedUser.username);
      this.$store.commit("auth/logout");

      this.$router.push("/login");
    },
  },
};
</script>
