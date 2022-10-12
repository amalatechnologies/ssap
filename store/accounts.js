const state = () => ({
  showLoader: Boolean,
  savingsAccounts: [],
  guaratorAccounts: [],
  shareAccounts: [],
  loanAccounts: [],
});

const mutations = {

  ["GET_ACCOUNTS"](state) {
    state.showLoader = true;
  },
  ["GET_ACCOUNTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_ACCOUNTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_ACCOUNTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.loanAccounts = payload.loanAccounts;
    state.savingsAccounts = payload.savingsAccounts;
    state.shareAccounts = payload.shareAccounts;
    state.guaratorAccounts = payload.guaratorAccounts;
  },
}

const actions = {
  async _getaccounts({ commit }, clientId) {
    commit("GET_ACCOUNTS");
    await this.$api.$get(`clients/${clientId}/accounts`)
      .then(response => {
        commit("GET_ACCOUNTS_SUCCESS", response);
      }).catch(error => {
        commit("GET_ACCOUNTS_ERROR");
        console.log(error);
      });
  },

}
const getters = {
  savingaccounts: function (state) {
    return state.savingsAccounts;
  },
  loanaccounts: function (state) {
    return state.loanAccounts;
  },
  guaratoraccounts: function (state) {
    return state.guaratorAccounts;
  },
  shareaccounts: function (state) {
    return state.shareAccounts;
  },

  totalLoanBalance: function (state) {
    return state.loanAccounts != undefined ?  state.loanAccounts.filter(e => e.loanBalance != undefined).reduce(function (accumulator, b) {
      return accumulator + b.loanBalance
    }, 0) : "0"
  },
  totalSavingBalance: function (state) {
    return state.savingsAccounts != undefined ? state.savingsAccounts.filter(e => e.accountBalance != undefined).reduce(function (accumulator, b) {
      return accumulator + b.accountBalance
    }, 0) : "0"
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
