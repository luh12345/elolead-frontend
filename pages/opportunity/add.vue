<template>
  <section>
    <v-btn text color="primary" @click="dialog = true" small>Qualificar</v-btn>

    <v-dialog width="500" v-model="dialog" persistent>
      <v-card>
        <v-card-title>Preencher oportunidade</v-card-title>
        <v-card-text>
          <v-form @submit.prevent ref="form">
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  rows="3"
                  :rules="emptyRules"
                  label="Descrição da oportunidade"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false" color="error">Cancelar</v-btn>
          <v-btn @click="qualify" color="primary">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  props: {
    lead: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      description: "",
      emptyRules: [(v) => !!v || "Preencher campo."],
    };
  },
  methods: {
    qualify() {
      if (this.$refs.form.validate()) {
        this.$store.commit("startLoading");

        this.$store
          .dispatch("opportunity/createOpportunity", {
            description: this.description,
            leadId: this.lead.id,
          })
          .then((res) => {
            this.$toastr.s(res.data);
            this.$emit("qualified");

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