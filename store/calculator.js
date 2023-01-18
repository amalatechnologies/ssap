const state = () => ({
  showLoader: Boolean,
  loancalculatortemplate: null,
});

const mutations = {

  ["GET_CAL_TEMPLATE"](state) {
    state.showLoader = true;
  },
  ["GET_CAL_TEMPLATE_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_CAL_TEMPLATE_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_CAL_TEMPLATE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.loancalculatortemplate = payload;
  },


}
const actions = {
  async _getloancalculatortemplate({ commit }, clientID) {
    commit("GET_CAL_TEMPLATE");
    await this.$api.$get(`loans/template`, { params: { templateType: "individual", clientId: clientID } })
      .then(response => {
        commit("GET_CAL_TEMPLATE_SUCCESS", response);

      }).catch(error => {
        commit("GET_CAL_TEMPLATE_ERROR");
        console.log(error);

      });

  },

}
const getters = {
  loancalculatortemplate: function (state) {
    return state.loancalculatortemplate;
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}