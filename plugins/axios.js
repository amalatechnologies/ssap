import Vue from "vue";
import VueToasted from "vue-toasted";
Vue.use(VueToasted, {
  iconPack: "mdi", // set your iconPack, defaults to material. material|fontawesome|custom-class
});

export default function ({ $axios, redirect, store }, inject) {
  $axios.setHeader("Content-Type", "application/json");
  //$axios.setToken(store.getters.accessToken, 'Bearer');

  const api = $axios.create({
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    },
  });

  api.onRequest((config) => {
    var token = localStorage.getItem("accessToken");
    var _tenant = localStorage.getItem("tenant");
    var tenant = _tenant == null ? "demo" : _tenant;
    console.log(tenant);

    api.setHeader(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    api.setHeader("Access-Control-Allow-Origin", "*");
    if (config.url != "/authentication" && token != null) {
      api.setHeader("Authorization", "Basic " + token);
    }
    api.setHeader("Fineract-Platform-TenantId", tenant.trim());
  });

  api.onError((error) => {
    const message = error.response.data.defaultUserMessage;
    const code = parseInt(error.response && error.response.status);
  });
  api.onResponse((response) => {
    // Vue.toasted.show('Success ', { icon: 'check-circle', type: 'success' });
  });
  api.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 404) {
      const message = error.response.data.defaultUserMessage;
      Vue.toasted.error(`${message}`, {
        icon: "close-circle",
        position: "top-center",
        keepOnHover: true,
        type: "error",
        theme: "bubble",
        duration: 5000,
      });
    }
    if (code === 401) {
      const message = error.response.data.defaultUserMessage;
      Vue.toasted.error(`${message}`, {
        icon: "close-circle",
        position: "top-center",
        keepOnHover: true,
        type: "info",
        theme: "outline",
        duration: 5000,
      });
    }
  });

  // Set baseURL to something different
  // eslint-disable-next-line no-console

  /** For UI developers with no local API **/
  /* api.setBaseURL(  process.env.baseUrl ); */

  /**For production */
  api.setBaseURL( process.env.baseUrl);
  // Inject to context as $api
  inject("api", api);
}
