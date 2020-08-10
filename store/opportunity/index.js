import client from "../../common/apiClient";

export const state = () => ({});

export const mutations = {};

export const actions = {
  createOpportunity({}, model) {
    return client.post("opportunity", {
      Description: model.description,
      LeadId: model.leadId
    });
  },
  deleteOpportunity({}, model) {
    return client.delete("opportunity?opportunityId=" + model.id);
  }
};
