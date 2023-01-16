const state = () => ({
  showLoader: Boolean,
  loantemplate: null,
});

const mutations = {
  ["GET_LOAN_APPLICATION_TEMPLATE"](state) {
    state.showLoader = true;
  },
  ["GET_LOAN_APPLICATION_TEMPLATE_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_LOAN_APPLICATION_TEMPLATE_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_LOAN_APPLICATION_TEMPLATE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.loantemplate = payload;
  },
};
const actions = {
  async _getloanapplicationtemplate({ commit }, clientId) {
    commit("GET_LOAN_APPLICATION_TEMPLATE");
    await this.$api
      .$get("/loans/template", {
        params: { clientId: clientId, templateType: "individual" },
      })
      .then((response) => {
        commit("GET_LOAN_APPLICATION_TEMPLATE_SUCCESS", response);
      })
      .catch((error) => {
        commit("GET_LOAN_APPLICATION_TEMPLATE_ERROR");
        console.log(error);
      });
  },
};
const getters = {
  loantemplate: function (state) {
    return state.loantemplate;
  },
};

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
};
