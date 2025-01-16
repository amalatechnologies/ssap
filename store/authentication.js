const state = () => ({
  showLoader: Boolean,
  profile: {},
  client: {},
  tenant: "",
  accessToken: null,
  profileImage: null,
  isPaymentAllowed: false,
});

const mutations = {
  ["AUTHENTICATE"](state) {
    state.showLoader = true;
  },
  ["AUTHENTICATE_FAILED"](state) {
    state.showLoader = false;
  },
  ["AUTHENTICATE_ERROR"](state) {
    state.showLoader = false;
  },
  ["AUTHENTICATE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.profile = payload;
    state.accessToken = payload.base64EncodedAuthenticationKey;
    state.isPaymentAllowed = payload.isPaymentAllowed;
    localStorage.setItem("accessToken", payload.base64EncodedAuthenticationKey);
  },

  ["GET_CLIENT"](state) {
    state.showLoader = true;
  },
  ["GET_CLIENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_CLIENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_CLIENT_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.client = payload.pageItems[0];
    this.$router.push("/");
  },
  ["GET_CLIENT_IMAGE"](state) {
    state.showLoader = true;
  },
  ["GET_CLIENT_IMAGE_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_CLIENT_IMAGE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.profileImage = payload;
  },
  ["LOGOUT_SESSION"](state, payload) {
    //state.tenant = "demo";
    window.localStorage.removeItem("vuex")
    window.localStorage.removeItem("accessToken");
    state.accessToken = null;
    this.$router.push("/signin");
  },

  ["TENANT_UPDATED"](state, payload) {
    state.tenant = payload;
    localStorage.setItem("tenant", payload);
  },
};
const actions = {
  async _authenticate({ commit, dispatch }, requestbody) {
    commit("AUTHENTICATE");
    localStorage.setItem("tenant", requestbody.tenant);
    delete this.$api.defaults.headers.common["Authorization"];
    delete this.$api.defaults.headers.common["Fineract-Platform-TenantId"];
    this.$api.setHeader("Fineract-Platform-TenantId", requestbody.tenant);
    await this.$api
      .$post("/authentication", {
        username: requestbody.username,
        password: requestbody.password,
      })
      .then((response) => {
        commit("AUTHENTICATE_SUCCESS", response);
        commit("TENANT_UPDATED", requestbody.tenant);
        dispatch("selfserviceclient", null, { root: true });
      })
      .catch((error) => {
        console.log(error);
        commit("AUTHENTICATE_ERROR");
      });
  },
  async selfserviceclient({ commit, dispatch }) {
    commit("GET_CLIENT");
    await this.$api
      .$get("/clients")
      .then((response) => {
        commit("GET_CLIENT_SUCCESS", response);
        dispatch("_getclientprofile", response.pageItems[0].id, { root: true });
      })
      .catch((error) => {
        console.log(error);
        commit("GET_CLIENT_ERROR");
      });
  },

  async _getclientprofile({ commit }, Id) {
    commit("GET_CLIENT_IMAGE");
    await this.$api
      .$get(`/clients/${Id}/images?maxHeight=150`)
      .then((response) => {
        commit("GET_CLIENT_IMAGE_SUCCESS", response);
      })
      .catch((error) => {
        console.log(error);
        commit("GET_CLIENT_IMAGE_ERROR");
      });
  },

  async _logoutsession({ commit }) {
    commit("LOGOUT_SESSION");
  },
  _updatetenant({ commit, dispatch }, payload) {
    commit("TENANT_UPDATED", payload);
    dispatch("_logoutsession", null, { root: true });
  },
};
const getters = {
  accessToken: function (state) {
    return state.accessToken;
  },
  clientId: function (state) {
    return state.client.id;
  },
  client: function (state) {
    return state.client;
  },
  profile: function (state) {
    return state.profile;
  },
  isAuthenticated: function (state) {
    return state.accessToken != null && state.profile.playstoreAccessAllowed
      ? true
      : false;
  },
  isPlayStoreAccessAllowed: function (state) {
    return state.profile.playstoreAccessAllowed;
  },
  tenant: function (state) {
    var _tenant = state.tenant;
    return _tenant == null ? "demo" : _tenant;
  },
  profileImage: function (state) {
    return state.profileImage;
  },
  isPaymentAllowed: (state) => {
    return state.isPaymentAllowed;
  },
};

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
};
