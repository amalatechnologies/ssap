const state = () => ({
  showLoader: Boolean,
  partners: null,
});

const mutations = {
  ["GET_PAYMENT_PARTNERS"](state) {
    state.showLoader = true;
  },
  ["GET_PAYMENT_PARTNERS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.partners = payload.data;
  },
  ["GET_PAYMENT_PARTNERS_FAIL"](state) {
    state.showLoader = false;
  },
  ["GET_PAYMENT_PARTNERS_ERROR"](state) {
    state.showLoader = false;
  },
};

const actions = {
  async _getpartners({ commit }, clientId) {
    commit("GET_PAYMENT_PARTNERS");
    await this.$api
      .get(`/loans/client/partners`)
      .then((response) => {
        commit("GET_PAYMENT_PARTNERS_SUCCESS", response);
      })
      .catch((err) => {
        console.log(err);
        commit("GET_PAYMENT_PARTNERS_ERROR");
      });
  },
  async _initiatePayment({ }, payload) {
    await this.$api.post(`/loans/client/checkout`,null, {params: payload})
      .then((response) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const getters = {
  partners: function (state) {
    return state.partners;
  },
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations,
};
