const state = () => ({
  showLoader: Boolean,
  transactions: null,
});

const mutations = {
  ["GET_TRANSACTIONS"](state) {
    state.showLoader = true;
  },
  ["GET_TRANSACTIONS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.transactions = payload.data.pageItems;
  },
  ["GET_TRANSACTIONS_FAIL"](state) {
    state.showLoader = false;
  },
  ["GET_TRANSACTIONS_ERROR"](state) {
    state.showLoader = false;
  },
};

const actions = {
  async _gettransactions({ commit }, clientId) {
    commit("GET_TRANSACTIONS");
    await this.$api
      .get(`/clients/${clientId}/transactions`)
      .then((response) => {
        commit("GET_TRANSACTIONS_SUCCESS", response);
      })
      .catch((err) => {
        console.log(err);
        commit("GET_TRANSACTIONS_ERROR");
      });
  },
};

const getters = {
  transactions: function (state) {
    return state.transactions;
  },
  transactionaccounttype: function (state) {
    return state.tansactionaccounttype;
  },
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations,
};
