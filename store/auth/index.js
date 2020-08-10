import client from "../../common/apiClient";

export const state = () => ({
  loggedUser: null
});

export const mutations = {
  setLoggedUser(state, user) {
    sessionStorage.setItem("logged_user", JSON.stringify(user));
    state.loggedUser = user;
  },
  logout(state) {
    sessionStorage.removeItem("logged_user");
    state.loggedUser = null;
  }
};

export const actions = {
  authorize({}, model) {
    return client.post("auth", {
      Username: model.username,
      Password: model.password
    });
  }
};
