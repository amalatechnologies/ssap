const state = () => ({
  showLoader: Boolean,
  notifications: null,
  totalNotifications: 0,
});

const mutations = {
  ["GET_NOTIFICATIONS"](state) {
    state.showLoader = true;
  },
  ["GET_NOTIFICATIONS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_NOTIFICATIONS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_NOTIFICATIONS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.totalNotifications = payload.totalFilteredRecords;
    state.notifications = payload.pageItems;
  },
};
const actions = {
  async _getnotifications({ commit }, clientID) {
    commit("GET_NOTIFICATIONS");
    await this.$api
      .$get(`notifications`, { params: { isRead: false, limit: 15, offset: 0 } })
      .then((response) => {
        commit("GET_NOTIFICATIONS_SUCCESS", response);
      })
      .catch((error) => {
        commit("GET_NOTIFICATIONS_ERROR");
        console.log(error);
      });
  },
};
const getters = {
  notifications: function (state) {
    return state.notifications;
  },
  totalNotifications: function (state) {
    return state.totalNotifications;
  },
};

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
};
