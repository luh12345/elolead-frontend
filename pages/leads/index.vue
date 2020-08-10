<template>
  <v-container>
    <!-- Filters -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Filtros</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="name" label="Nome do cliente"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="email" label="Email do cliente"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select
                  v-model="status"
                  :items="statusLeads"
                  item-text="description"
                  item-value="id"
                  :loading="loadingStatus"
                  label="Situação"
                  clearable
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="loadLeads">Pesquisar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Content -->
    <v-row class="mt-2" justify="end" align="end">
      <add-lead @created="loadLeads" />
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-row>
            <v-col cols="12" md="3" sm="3">
              <v-card-title class="red--text">Descartados</v-card-title>
              <lead-card v-for="item in discarded" :key="item.id" :lead="item">
                <edit-lead :lead="item" @update="loadLeads" />
                <v-btn
                  color="warning"
                  text
                  @click="startQualification(item)"
                  small
                >Iniciar qualificação</v-btn>
              </lead-card>

              <v-alert
                v-if="discarded.length === 0"
                color="error"
                border="top"
                colored-border
                type="info"
                elevation="2"
              >Nenhum lead descartado cadastrado.</v-alert>
            </v-col>
            <v-col cols="12" md="3" sm="3">
              <v-card-title class="orange--text">Em qualificação</v-card-title>
              <lead-card v-for="item in leads" :key="item.id" :lead="item">
                <edit-lead :lead="item" @update="loadLeads" />
                <v-btn color="error" text @click="discard(item)" small>Descartar</v-btn>
                <add-opportunity :lead="item" @qualified="loadLeads" />
              </lead-card>

              <v-alert
                v-if="leads.length === 0"
                color="warning"
                border="top"
                colored-border
                type="info"
                elevation="2"
              >Nenhum lead em qualificação cadastrado.</v-alert>
            </v-col>
            <v-col cols="12" md="3" sm="3">
              <v-card-title class="blue--text">Qualificados</v-card-title>
              <lead-card v-for="item in opportunities" :key="item.id" :lead="item">
                <edit-lead :lead="item" @update="loadLeads" />
                <v-btn color="error" text @click="discard(item)" small>Descartar</v-btn>
                <delete-opportunity :lead="item" @disqualified="loadLeads" />
                <add-customer :lead="item" @finished="loadLeads" />
              </lead-card>

              <v-alert
                v-if="opportunities.length === 0"
                border="top"
                colored-border
                type="info"
                elevation="2"
              >Nenhuma oportunidade cadastrada.</v-alert>
            </v-col>
            <v-col cols="12" md="3" sm="3">
              <v-card-title class="green--text">Finalizados</v-card-title>
              <lead-card v-for="item in customers" :key="item.id" :lead="item" />
              <v-alert
                v-if="customers.length === 0"
                color="success"
                border="top"
                colored-border
                type="info"
                elevation="2"
              >Nenhum cliente cadastrado.</v-alert>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddOpportunity from "../opportunity/add.vue";
import DeleteOpportunity from "../opportunity/delete.vue";

import AddCustomer from "../customer/add.vue";

import AddLead from "./add.vue";
import EditLead from "./edit.vue";

export default {
  middleware: "authorized",
  components: {
    "add-opportunity": AddOpportunity,
    "delete-opportunity": DeleteOpportunity,
    "add-customer": AddCustomer,
    "add-lead": AddLead,
    "edit-lead": EditLead,
  },
  data() {
    return {
      name: "",
      email: "",
      status: "",
      statusLeads: [],
      loadingStatus: false,
    };
  },
  computed: {
    discarded() {
      return this.$store.state.lead.items.filter((x) => x.status.id === 1);
    },
    leads() {
      return this.$store.state.lead.items.filter((x) => x.status.id === 2);
    },
    opportunities() {
      return this.$store.state.lead.items.filter((x) => x.status.id === 3);
    },
    customers() {
      return this.$store.state.lead.items.filter((x) => x.status.id === 4);
    },
  },
  methods: {
    discard(lead) {
      this.$store.commit("startLoading");

      this.$store
        .dispatch("lead/discard", {
          id: lead.id,
        })
        .then((res) => {
          this.$toastr.s(res.data);
          this.loadLeads();
        })
        .catch((err) => {
          this.$toastr.e(err.Data);
          this.$store.commit("stopLoading");
        });
    },
    startQualification(lead) {
      this.$store.commit("startLoading");

      this.$store
        .dispatch("lead/startQualification", {
          id: lead.id,
        })
        .then((res) => {
          this.$toastr.s(res.data);
          this.loadLeads();
        })
        .catch((err) => {
          this.$toastr.e(err.Data);
          this.$store.commit("stopLoading");
        });
    },
    loadLeads() {
      this.$store.commit("startLoading");

      this.$store
        .dispatch("lead/getLeads", {
          name: this.name,
          email: this.email,
          status: this.status,
        })
        .then((res) => {
          this.$store.commit("lead/setLeads", res.data);
        })
        .catch((err) => {
          this.$toastr.e(err.Data);
        })
        .finally(() => this.$store.commit("stopLoading"));
    },
    loadStatus() {
      this.loadingStatus = true;

      this.$store
        .dispatch("statusLead/getStatusLead")
        .then((res) => {
          this.statusLeads = res.data;
          this.loadingStatus = false;
        })
        .catch((err) => {
          this.$toastr.e(err.Data);
        });
    },
  },

  created() {
    this.loadLeads();
    this.loadStatus();
  },
};
</script>

<style>
</style>