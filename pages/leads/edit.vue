<template>
  <section>
    <v-btn text small @click="dialog = true">Editar</v-btn>

    <v-dialog width="500" v-model="dialog" persistent>
      <v-card>
        <v-card-title>Editar Lead</v-card-title>
        <v-card-text>
          <v-form @submit.prevent ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="leadToEdit.customerName"
                  :rules="emptyRules"
                  label="Nome do cliente"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="leadToEdit.customerPhone"
                  :rules="emptyRules"
                  label="Telefone do cliente"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="leadToEdit.customerEmail"
                  :rules="emailRules"
                  label="E-mail do cliente"
                />
              </v-col>
              <v-col cols="12" v-if="opportunityToEdit">
                <v-textarea
                  v-model="opportunityToEdit.description"
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
          <v-btn @click="editLead" color="primary">Editar</v-btn>
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
      leadToEdit: {},
      opportunityToEdit: {},
      dialog: false,
      emptyRules: [(v) => !!v || "Preencher campo."],
      emailRules: [
        (v) => !!v || "Preencher campo.",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido.",
      ],
    };
  },
  methods: {
    editLead() {
      if (this.$refs.form.validate()) {
        this.$store.commit("startLoading");

        this.$store
          .dispatch("lead/editLead", {
            id: this.leadToEdit.id,
            name: this.leadToEdit.customerName,
            phone: this.leadToEdit.customerPhone,
            email: this.leadToEdit.customerEmail,
            opportunity: this.opportunityToEdit,
          })
          .then((res) => {
            this.$toastr.s(res.data);
            this.$emit("update");

            this.dialog = false;
          })
          .catch((err) => {
            this.$toastr.e(err.Data);
          })
          .finally(() => this.$store.commit("stopLoading"));
      }
    },
  },
  created() {
    Object.assign(this.leadToEdit, this.lead);
    Object.assign(this.opportunityToEdit, this.lead.opportunity);

    if (!this.opportunityToEdit.id) this.opportunityToEdit = null;
  },
};
</script>

<style>
</style>