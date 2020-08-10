<template>
  <section>
    <v-btn color="primary" @click="dialog = true">Cadastrar Lead</v-btn>

    <v-dialog width="500" v-model="dialog" persistent>
      <v-card>
        <v-card-title>Cadastrar Lead</v-card-title>
        <v-card-text>
          <v-form @submit.prevent ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" :rules="emptyRules" label="Nome do cliente" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="phone" :rules="emptyRules" label="Telefone do cliente" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail do cliente" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false" color="error">Cancelar</v-btn>
          <v-btn @click="createLead" color="primary">Cadastrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      name: "",
      phone: "",
      email: "",
      emptyRules: [(v) => !!v || "Preencher campo."],
      emailRules: [
        (v) => !!v || "Preencher campo.",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido.",
      ],
    };
  },
  methods: {
    createLead() {
      if (this.$refs.form.validate()) {
        this.$store.commit("startLoading");

        this.$store
          .dispatch("lead/createLead", {
            name: this.name,
            phone: this.phone,
            email: this.email,
          })
          .then((res) => {
            this.$toastr.s(res.data);
            this.$emit("created");

            this.dialog = false;
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