const state = () => ({
  showLoader: Boolean,
  fromAccounts: [],
  toAccounts: [],
});

const mutations = {
  ["GET_TRANSFER_ACCOUNTS"](state) {
    state.showLoader = true;
  },
  ["GET_TRANSFER_ACCOUNTS_FAIL"](state) {
    state.showLoader = false;
  },
  ["GET_TRANSFER_ACCOUNTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_TRANSFER_ACCOUNTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    (state.fromAccounts = payload.fromAccountOptions),
      (state.toAccounts = payload.toAccountOptions);
  },
};

const actions = {
  async _gettransferaccs({ commit }) {
    commit("GET_TRANSFER_ACCOUNTS");
    await this.$api
      .get("accounttransfers/template")
      .then((response) => {
        console.log(response);
        commit("GET_TRANSFER_ACCOUNTS_SUCCESS", response.data);
      })
      .catch((error) => {
        commit("GET_TRANSFER_ACCOUNTS_ERROR");
        console.log(error);
      });
  },

  async _transfer({ commit }, data) {
    await this.$api.$post("accounttransfers", data).then((res) => {
      console.log(res);
    });
  },
};

const getters = {
  getFromOptions(state) {
    return state.fromAccounts.map((item) => ({
      ...item,
      ["display"]: `${item.accountNo} (${item?.accountType?.value})`,
    }));
  },
  getToOptions(state) {
    return state.toAccounts.map((item) => ({
      ...item,
      ["display"]: `${item.accountNo} (${item?.clientName})`,
    }));
  },
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations,
};
