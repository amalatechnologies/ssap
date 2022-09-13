const state = () => ({
  showLoader: Boolean,
  profile: {},
  client: {},
  tenant: "",
  accessToken: null,
  profileImage: null
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
    localStorage.setItem("accessToken",
      payload.base64EncodedAuthenticationKey
    );
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
    console.log(payload)
    state.profileImage = payload;
  },
  ["LOGOUT_SESSION"](state, payload) {
    state.tenant = "demo";
    state.accessToken = null;
  },

  ["TENANT_UPDATED"](state, payload) {
    state.tenant = payload;
    localStorage.setItem("tenant", payload);
  },
};
const actions = {
  async _authenticate({ commit, dispatch }, requestbody) {
    commit("AUTHENTICATE");
    delete this.$api.defaults.headers.common["Authorization"];
    await this.$api
      .$post("authentication", requestbody)
      .then((response) => {
        commit("AUTHENTICATE_SUCCESS", response);
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
      .$get("clients")
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
    console.log(Id)
    await this.$api
      .$get(`clients/${Id}/images?maxHeight=150`)
      .then((response) => {
        commit("GET_CLIENT_IMAGE_SUCCESS", response);
      })
      .catch((error) => {
        console.log(error);
        commit("GET_CLIENT_IMAGE_ERROR");
      });
  },

  async _logoutsession({ commit }) {
    //window.localStorage.clear();
    window.localStorage.clear();
    //window.localStorage.removeItem("accessToken");
    sessionStorage.clear();
    commit('LOGOUT_SESSION')
    this.$router.push("/signin");
  },
  _updatetenant({ commit }, payload) {
    commit("TENANT_UPDATED", payload);
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
    return state.accessToken == null ? false : true;
  },
  tenant: function (state) {
    var _tenant = state.tenant;
    console.log("STATE TENANT: " + _tenant);
    return _tenant == null ? "demo" : _tenant;
  },
  profileImage: function (state) {
    return state.profileImage;
  }

};

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters,
};
