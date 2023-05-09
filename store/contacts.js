const state = () => ({
  showLoader: Boolean,
  contacts: null,
});

const mutations = {
  ["GET_CONTACTS"](state) {
    state.showLoader = true;
  },
  ["GET_CONTACTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.contacts = payload.data;
  },
  ["GET_CONTACTS_FAIL"](state) {
    state.showLoader = false;
  },
  ["GET_CONTACTS_ERROR"](state) {
    state.showLoader = false;
  },
};

const actions = {
  async _getofficecontacts({ commit }, clientId) {
    commit("GET_CONTACTS");
    await this.$api
      .get(`/clients/office/contacts`)
      .then((response) => {
        commit("GET_CONTACTS_SUCCESS", response);
      })
      .catch((err) => {
        console.log(err);
        commit("GET_CONTACTS_ERROR");
      });
  },
};

const getters = {
  contacts: function (state) {
    return state.contacts;
  },
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations,
};
