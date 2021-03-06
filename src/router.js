import Vue from './assets/phew.runtime.esm.js'
import Router from 'vue-router'
import VBuckets from './views/VBuckets.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/vbuckets',
      name: 'vbuckets',
      component: VBuckets,
    }, {
      path: '/divya',
      name: 'divya',
      component: () => import(/* webpackChunkName: "divya" */ './views/NextTickVsRaf.vue'),
    }, {
      path: '/delorean',
      name: 'delorean',
      component: () => import(/* webpackChunkName: "delorean" */ './views/DeLorean.vue'),
    }, {
      path: '/vueconfus2k19',
      name: 'vueconfus2k19',
      component: () => import(/* webpackChunkName: "delorean" */ './views/DeLoreanDemo.vue'),
    },
  ],
})
