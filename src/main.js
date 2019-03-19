import Vue from './assets/phew.runtime.esm.js'
import App from './App.vue'
import router from './router'

import './assets/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
