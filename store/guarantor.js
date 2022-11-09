const state = () => ({
  showLoader: Boolean,
  guarantorrequest: {},
  guarantorrequests: [],
});

const mutations = {

  ["GET_GUARANTORS"](state) {
    state.showLoader = true;
  },
  ["GET_GUARANTORS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_GUARANTORS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_GUARANTORS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.guarantorrequests = payload;
  },
  ["APPROVE_GUARANTORS"](state) {
    state.showLoader = true;
  },

  ["APPROVE_GUARANTORS_ERROR"](state) {
    state.showLoader = false;
  },
  ["APPROVE_GUARANTORS_SUCCESS"](state, payload) {
    state.showLoader = false;
  },
  ["APPLY_GUARANTORS"](state) {
    state.showLoader = true;
  },

  ["APPLY_GUARANTORS_ERROR"](state) {
    state.showLoader = false;
  },
  ["APPLY_GUARANTORS_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

}
const actions = {
  async _applyguarantor({ commit}, payload) {
    commit("APPLY_GUARANTORS");
    await this.$api.$post(`loans/${payload.loanId}/guarantors`, payload.data)
      .then(response => {
        commit("APPLY_GUARANTORS_SUCCESS", response);

      }).catch(error => {
        commit("APPLY_GUARANTORS_ERROR");
        console.log(error);

      });
  },
  async _retrieveguarantors({ commit}, entityId) {
    commit("GET_GUARANTORS");
    await this.$api.$get(`loans/${entityId}/guarantees`, {params:{status: 100}})
      .then(response => {
        commit("GET_GUARANTORS_SUCCESS", response);

      }).catch(error => {
        commit("GET_GUARANTORS_ERROR");
        console.log(error);

      });
  },
  async _approveguarantors({ commit}, payload) {
    commit("APPROVE_GUARANTORS");
    await this.$api.$post(`loans/${payload.loanId}/guarantors/${payload.requestId}/approve`)
      .then(response => {
        commit("APPROVE_GUARANTORS_SUCCESS", response);

      }).catch(error => {
        commit("APPROVE_GUARANTORS_ERROR");
        console.log(error);

      });
  },
  async _declineguarantors({ commit}, payload) {
    commit("APPROVE_GUARANTORS");
    await this.$api.$post(`loans/${payload.loanId}/guarantors/${payload.requestId}/decline`)
      .then(response => {
        commit("APPROVE_GUARANTORS_SUCCESS", response);

      }).catch(error => {
        commit("APPROVE_GUARANTORS_ERROR");
        console.log(error);

      });
  }

}
const getters = {
  guarantorrequests: function (state) {
    return state.guarantorrequests;
  },
  guarantorrequestsize: function (state) {
    return state.guarantorrequests.length();
  },
  guarantorrequest: (state) => (requestId) => {
    return state.guarantorrequests.find(x => x.requestId == requestId)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}