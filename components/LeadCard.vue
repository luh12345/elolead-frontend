<template>
  <v-card class="mt-2">
    <v-card-text>
      <div>{{lead.status.description}}</div>
      <p class="display-1 text--primary">{{lead.customerName}}</p>
      <p>Data de criação: {{formatDate(lead.date)}}</p>
      <div class="text--primary">Telefone: {{lead.customerPhone}}</div>
      <div class="text--primary">E-mail: {{lead.customerEmail}}</div>
      <div
        class="text--primary"
        v-if="lead.opportunity"
      >Oportunidade: {{lead.opportunity.description}}</div>
    </v-card-text>
    <v-card-actions style="overflow-x: auto">
      <slot />
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    lead: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
};
</script>

<style>
</style>