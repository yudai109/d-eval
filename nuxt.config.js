export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "server",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "d_eval",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~plugins/sidebar",
      mode: "client"
    },
    "~/plugins/firebase.js",
    "~/plugins/firebase.auth.js",
    "~/plugins/element-ui.js",
    "~/plugins/vue-modal.js",
  ],

  // サーバーミドルウェア
  serverMiddleware: ["~~/api/"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,


  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/pwa",
    `@nuxtjs/dotenv`
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "V-VALUE",
      lang: "ja",
      short_name: "V-VAL",
      title: "v-value",
      "og:title": "v-value",
      description: "v-value",
      "og:description": "v-value",
      theme_color: "#ffffff",
      background_color: "#ffffff"
    },
    meta: {
      theme_color: "#ffffff"
      // appleStatusBarStyle: "black-translucent",
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // vendor: ['element-ui']
  },

  router: {
    middleware: "authenticated"
  },

  workbox: {
    dev: true //開発環境でもPWA
  },

  axios: {
    prefix: '/api',
  },
   
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  // dotenv: {
  //   filename: `.env.${process.env.NODE_ENV}`
  // },
};
