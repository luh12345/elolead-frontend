export const state = () => ({
  loading: false
});

export const mutations = {
  startLoading(state) {
    state.loading = true;
  },
  stopLoading(state) {
    state.loading = false;
  }
};
