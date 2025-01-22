
import metajs from "./plugins/meta";
const isDev = process.env.NODE_ENV !== 'production'
const meta = metajs();
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  //target: 'static',
  telemetry: true,
  ssr: false,
  router: {
    mode: "hash",
    base: isDev ? '' : '/',
    routerNameSplitter: "/",
    middleware: ["router"],
  },
  loadingIndicator: {
    name: "pulse",
    color: " #A0D18C",
    background: "#FAFAFA",
  },

  env: {
    baseUrl: "https://demo.amala.app/fineract-provider/api/v1/self/",
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "Amala Yangu",
    title: "Amala Yangu",
    meta: [
      ...meta,
      { charset: "utf-8" },
      /**Windows phone **/
      { name: "msapplication-navbutton-color", content: "#A0D18C" },
      /**iOS Safari**/
      { name: "apple-mobile-web-app-status-bar-style", content: "#A0D18C" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      {
        hid: "description",
        name: "description",
        content: "Amala Yangu self-service Web Application",
      },
      { name: "google-site-verification", content: "itV5X-xyo7TGiCdf9VzrZku2CQf5dMQQbBFCZqBZ9_k" },
      //Twitter meta-data
      { hid: "twitter:site", name: "twitter:site", content: "AmalaApp" },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: "Ospic application",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/css/styles.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/i18n.js",
    "~/plugins/vuetify.js",
    "~/plugins/axios",
    "~/plugins/filters.js",
    "~/plugins/pwa.client.js",
    "~/plugins/vuepersistence.js",
    "~/mixins/mixins.js",
    { src: "~/plugins/pwa-update.js", mode: "client" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify

    "@nuxtjs/vuetify",

    "@nuxtjs/toast",
    "@nuxt/postcss8",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  // https://go.nuxtjs.dev/axios
  // https://go.nuxtjs.dev/pwa

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/proxy",
    "@nuxtjs/toast",
    "nuxt-material-design-icons",
    ["cookie-universal-nuxt", { parseJSON: false }],
  ],

  toast: {
    position: "bottom-right",
    duration: 4000,
    theme: "bubble",
    singleton: true,
    iconPack: "mdi",
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: isDev ? "" : "/ssap/assets/",
    extend(config, ctx) { },
    postcss: {
      plugins: {},
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    terser: {
      extractComments: false, // default was LICENSES
      // https://github.com/terser/terser#compress-options
      //Disable console log in production
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },
  pwa: {
    manifest: {
      name: "Amala Yangu Web Application",
      short_name: "Amala Yangu",
      color_theme: "#A0D18C",
      background_color: "#A0D18C",
      lang: "en",
      useWebmanifestExtension: false,
    },
    meta: {
      /* meta options */
      name: "Amala Yangu",
      author: "Amala Yangu",
      description: "Amala Yangu self-service  Application",
      lang: "en",
      ogType: "website",
      ogSiteName: "Amala Yangu",
      ogTitle: "Amala Yangu Self-service Application",
      ogDescription: "Amala Yangu self-service Web Application",
      ogHost: "https://amala.co.tz",
      ogImage: "https://mobile.amala.app/preview.png",
      ogUrl: "",
      twitterCard: "Amala Yangu",
      twitterSite: "amalaApp",
      mobileAppIOS: "yes",
      appleStatusBarStyle: "black-translucent",
      theme_color: "#A0D18C",
    },
    icon: {
      iconSrc: "/static/maskable.png",
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)

  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
};
