<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-img max-width="300" max-height="100" src="/img/elogroup.png"></v-img>
    </v-row>
    <v-row justify="center" align="center">
      <v-card class="ml-7" width="450">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>EloLeads - Cadastro</v-toolbar-title>
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
            <v-text-field
              type="password"
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
              prepend-icon="mdi-lock"
              label="Confirmar senha"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="login" small>Voltar para o login</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="createUser">Cadastrar</v-btn>
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
      confirmPassword: "",
      emptyRules: [(v) => !!v || "Preencher campo."],
      confirmPasswordRules: [
        (v) => !!v || "Preencher campo",
        (v) => v == this.password || "Senhas diferentes.",
      ],
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/login" });
    },
    createUser() {
      if (this.$refs.form.validate()) {
        this.$store.commit("startLoading");

        this.$store
          .dispatch("user/createUser", {
            username: this.username,
            password: this.password,
          })
          .then((res) => {
            this.$toastr.s(res.data);
            this.$router.push("/login");
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