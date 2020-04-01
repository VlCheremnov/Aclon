import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0b28cfe6 = () => interopDefault(import('~/components/pages/index.vue' /* webpackChunkName: "" */))
const _34d4bb9a = () => interopDefault(import('~/components/pages/404.vue' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "",
    component: _0b28cfe6,
    name: "home"
  }, {
    path: "/*",
    component: _34d4bb9a,
    name: "404"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
