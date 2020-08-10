<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-img max-width="300" max-height="100" src="/img/elogroup.png"></v-img>
    </v-row>
    <v-row justify="center" align="center">
      <v-card class="ml-7" width="450">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>EloLeads - Efetuar login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="username"
              :rules="emptyRules"
              prepend-icon="mdi-account-circle"
              label="Username"
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              :rules="emptyRules"
              prepend-icon="mdi-lock"
              label="Senha"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createUser">Cadastre-se</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  middleware: "anonymous",
  data() {
    return {
      username: "",
      password: "",
      emptyRules: [(v) => !!v || "Preencher campo"],
    };
  },
  methods: {
    createUser() {
      this.$router.push({ path: "/user/add" });
    },
    login() {
      if (this.$refs.form.validate()) {
        this.$store.commit("startLoading");

        this.$store
          .dispatch("auth/authorize", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            this.$store.commit("auth/setLoggedUser", res.data);

            this.$toastr.s(
              "Seja bem vindo " + this.$store.state.auth.loggedUser.username
            );

            this.$router.push("/leads");
          })
          .catch((err) => {
            this.$toastr.e(err.Data);
          })
          .finally(() => this.$store.commit("stopLoading"));
      }
    },
  },
};
</script>

<style>
</style>