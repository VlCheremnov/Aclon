module.exports = {
  // Router
  router: {
    extendRoutes (routes, resolve) {
      routes.push(
        // index page
        {
          path: '',
          name: 'home',
          component: resolve(__dirname, '~/components/pages/index.vue')
        },

        // 404
        {
          path: '/*',
          name: '404',
          component: resolve(__dirname, '~/components/pages/404.vue')
        }
      )
    }
  },

  // Directory
  srcDir: 'src/',

  // css
  css: [
    '~assets/styles/index.sass'
  ],

  // Mode: universal(ssr) or spa
  mode: 'spa',

  // Preloader
  loading: false,
  // loading: '~/components/loader.vue',

  // Modules
  modules: [
    // Axios
    // '@nuxtjs/axios'
  ],

  // Plugins
  plugins: [
    // '~plugins/throttle.client.js'
  ],

  // Headers of the page
  head: {
    htmlAttrs: {
      lang: 'ru'
    },

    title: 'Aclon',

    meta: [
      { charset: 'utf-8' },
      { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8'},
      { httpEquiv: 'content-language', content: 'ru'},

      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],

    link: [
      // Favicon
      { rel: 'icon', type: 'image/x-icon', href: '/icon/favicon.ico' },

      // Fots
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=El+Messiri:400,500,600,700|Roboto:300,300i,400,400i,500,500i,700,700i,900&display=block&subset=cyrillic'}
    ],
    
    script: [
      // Полифиллы
      {src: 'https://cdn.polyfill.io/v2/polyfill.js'}
    ]
  },
  
  // Build configuration
  build: {
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [
          [require.resolve('@nuxt/babel-preset-app'), { targets }]
        ]
      }
    },

    extend (config, { isDev, isClient }) {

      // Autoprefixer
      postcss: [
        require('autoprefixer')()
      ]

      // ESLint
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }  
}

