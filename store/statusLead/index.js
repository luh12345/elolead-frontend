import client from "../../common/apiClient";

export const state = () => ({});

export const mutations = {};

export const actions = {
  getStatusLead({}) {
    return client.get("statusLead");
  }
};
