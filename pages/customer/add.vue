<template>
  <v-btn text color="success" @click="finish" small>Finalizar</v-btn>
</template>

<script>
export default {
  props: {
    lead: {
      type: Object,
      required: true,
    },
  },
  methods: {
    finish() {
      this.$store.commit("startLoading");

      this.$store
        .dispatch("customer/createCustomer", {
          leadId: this.lead.id,
        })
        .then((res) => {
          this.$toastr.s(res.data);
          this.$emit("finished");
        })
        .catch((err) => {
          this.$toastr.e(err.Data);
        })
        .finally(() => this.$store.commit("stopLoading"));
    },
  },
};
</script>

<style>
</style>