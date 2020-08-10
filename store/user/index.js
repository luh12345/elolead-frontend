import client from "../../common/apiClient";

export const state = () => ({});

export const mutations = {};

export const actions = {
  createUser({}, model) {
    return client.post("user", {
      Username: model.username,
      Password: model.password
    });
  }
};
