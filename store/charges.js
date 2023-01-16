const state = () => ({
  showLoader: Boolean,
  charges: null,
});

const mutations = {
  ["GET_CHARGES"](state) {
    state.showLoader = true;
  },
  ["GET_CHARGES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.charges = payload.data.pageItems;
  },
  ["GET_CHARGES_FAIL"](state) {
    state.showLoader = false;
  },
  ["GET_CHARGES_ERROR"](state) {
    state.showLoader = false;
  },
};

const actions = {
  async _getcharges({ commit }, clientId) {
    commit("GET_CHARGES");
    await this.$api
      .get(`/clients/${clientId}/charges`)
      .then((response) => {
        commit("GET_CHARGES_SUCCESS", response);
      })
      .catch((err) => {
        console.log(err);
        commit("GET_CHARGES_ERROR");
      });
  },
};

const getters = {
  charges: function (state) {
    return state.charges;
  },
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations,
};
