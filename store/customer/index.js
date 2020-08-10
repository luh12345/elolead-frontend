import client from "../../common/apiClient";

export const state = () => ({});

export const actions = {
  createCustomer({}, model) {
    return client.post("customer", {
      LeadId: model.leadId
    });
  }
};
