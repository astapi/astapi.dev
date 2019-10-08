import { Configuration } from '@nuxt/types'
const pkg = require('./package')
require('dotenv').config()

const config: Configuration = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  // css: [
  //   'bulma/bulma.sass'
  // ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/firebase.ts',
    '@/plugins/highlight.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  purgeCSS: {
    // highlightjs の style 用の selector を purge しない
    whitelist: [
      'hljs',
      'hljs-subst',
      'hljs-string',
      'hljs-title',
      'hljs-symbol',
      'hljs-bullet',
      'hljs-attribute',
      'hljs-addition',
      'hljs-variable',
      'hljs-template-tag',
      'hljs-template-variable',
      'hljs-comment',
      'hljs-quote',
      'hljs-number',
      'hljs-regexp',
      'hljs-literal',
      'hljs-type',
      'hljs-link',
      'hljs-deletion',
      'hljs-meta',
      'hljs-keyword',
      'hljs-selector-tag',
      'hljs-doctag',
      'hljs-title',
      'hljs-section',
      'hljs-built_in',
      'hljs-tag',
      'hljs-name',
      'hljs-emphasis',
      'hljs-strong',
    ]
  },

  // adminページの認証用
  router: {
    middleware: 'auth'
  },

  serverMiddleware: [
    // SSR 時に cookie から ログイン状態をチェックする
    '@/serverMiddleware/validateFirebaseIdToken.ts',
    '@/serverMiddleware/addResponseHeader.ts',
  ],

  tailwindcss: {
    configPath: '@/tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return;
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}

export default config
