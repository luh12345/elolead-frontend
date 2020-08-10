<template>
  <v-btn text color="warning" @click="disqualify" small>Desqualificar</v-btn>
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
    return {};
  },
  methods: {
    disqualify() {
      debugger;
      this.$store.commit("startLoading");

      this.$store
        .dispatch("opportunity/deleteOpportunity", {
          id: this.lead.opportunity.id,
        })
        .then((res) => {
          this.$toastr.s(res.data);
          this.$emit("disqualified");
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