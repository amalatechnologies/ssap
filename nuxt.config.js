const routerBase = process.env.DEPLOY_ENV === 'production' ? '/' : '/ssap/';
import metajs from './plugins/meta';
const meta = metajs();
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  //target: 'static',
  telemetry: true,
  ssr: false,
  router: {
    mode: 'hash',
    base: routerBase,
    routerNameSplitter: "/",
    middleware: ['router']
  },
  loadingIndicator: {
    name: 'pulse',
    color: ' #A0D18C',
    background: '#FAFAFA'
  },

  env: {
    baseUrl: 'https://demo.amala.app/fineract-provider/api/v1/self/',
    localUrl: 'https://demo.amala.app/fineract-provider/api/v1/self/'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Amala',
    title: 'Amala Yangu',
    meta: [
      ...meta,
      { charset: 'utf-8' },
      /**Windows phone **/
      { name: "msapplication-navbutton-color", content: "#A0D18C" },
      /**iOS Safari**/
      { name: "apple-mobile-web-app-status-bar-style", content: "#A0D18C" },
      //{ name: "apple-mobile-web-app-capable", content: "yes" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'Amala Yangu self-service Web Application' },

      //Twitter meta-data
      { hid: "twitter:site", name: "twitter:site", content: "AmalaApp" },
      { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
      { hid: "twitter:image:alt", name: "twitter:image:alt", content: "Ospic application" },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: process.env.DEPLOY_ENV === 'production' ? '/favicon.ico' : '/ssap/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/styles.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/i18n.js",
    '~/plugins/vuetify.js',
    '~/plugins/axios',
    '~/plugins/filters.js',
    '~/plugins/pwa.client.js',
    '~/mixins/mixins.js',
    '~/plugins/vuepersistence.js'

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/toast',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  // https://go.nuxtjs.dev/axios
  // https://go.nuxtjs.dev/pwa

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    'nuxt-material-design-icons',
    ['cookie-universal-nuxt', { parseJSON: false }],
  ],

  toast: {
    position: 'bottom-right',
    duration: 4000,
    theme: 'bubble',
    singleton: true,
    iconPack: 'mdi'
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/assets/',
    extend(config, ctx) { },
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    terser: {
      extractComments: false // default was LICENSES
    }
  },
  pwa: {
    manifest: {
      name: 'Amala Yangu Web Application',
      short_name: 'Amala Yangu',
      color_theme: "#A0D18C",
      background_color: "#A0D18C",
      lang: 'en',
      start_url: '../',
      useWebmanifestExtension: false
    },
    meta: {
      /* meta options */
      name: "Amala Yangu",
      author: "Amala",
      description: "Amala Yangu self-service Web Application",
      lang: "en",
      ogType: "website",
      ogSiteName: "Amala Yangu",
      ogTitle: "Amala Yangu Web Application",
      ogDescription: "Amala Yangu self-service Web Application",
      ogHost: "https://amala.co.tz",
      ogImage: "https://amalatechnologies.github.io/ssap/preview.png",
      ogUrl: "",
      twitterCard: "Amala Yangu",
      twitterSite: "amalaApp",
      //mobileAppIOS: "yes",
      appleStatusBarStyle: "black-translucent",
      theme_color: "#A0D18C"


    },
    icon: {
      iconSrc: '/static/maskable.png'
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},


  // Build Configuration (https://go.nuxtjs.dev/config-build)

  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0" // default: localhost
  }
}
