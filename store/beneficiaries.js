const state = () => ({
  showLoader: Boolean,
  beneficiaries: [],
  beneficiaryaccounttype: null,
});

const mutations = {
  ["GET_BENEFICIARIES"](state) {
    state.showLoader = true;
  },
  ["GET_BENEFICIARIES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.beneficiaries = payload.data;
  },
  ["GET_BENEFICIARIES_FAIL"](state) {
    state.showLoader = false;
  },
  ["GET_BENEFICIARIES_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_ACCOUNTS_TYPE"](state) {
    state.showLoader = true;
  },
  ["GET_ACCOUNTS_TYPE_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_ACCOUNTS_TYPE_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_ACCOUNTS_TYPE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.beneficiaryaccounttype = payload.accountTypeOptions;
  },
};

const actions = {
  async _getbeneficiaries({ commit }) {
    commit("GET_BENEFICIARIES");
    await this.$api
      .get(`/beneficiaries/tpt`)
      .then((response) => {
        commit("GET_BENEFICIARIES_SUCCESS", response);
      })
      .catch((err) => {
        console.log(err);
        commit("GET_BENEFICIARIES_ERROR");
      });
  },
  async _createbeneficiary({ commit }, beneficiary) {
    await this.$api
      .post("/beneficiaries/tpt", beneficiary)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  },
  async _getbeneficiaryaccounttypetemplate({ commit }) {
    commit("GET_ACCOUNTS_TYPE");
    await this.$api
      .$get("/beneficiaries/tpt/template")
      .then((response) => {
        commit("GET_ACCOUNTS_TYPE_SUCCESS", response);
      })
      .catch((error) => {
        commit("GET_ACCOUNTS_TYPE_ERROR");
        console.log(error);
      });
  },
};

const getters = {
  beneficiaries: function (state) {
    return state.beneficiaries;
  },
  beneficiaryaccounttype: function (state) {
    return state.beneficiaryaccounttype;
  },
  beneficiary: (state) => (beneficiaryId) => {
    return state.beneficiaries.find((x) => x.id == beneficiaryId);
  },
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations,
};
