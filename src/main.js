import Vue from 'vue'
import App from './App.vue'

Vue.nextTick = function(...args) {
  console.log('Vue.nextTick')

  return Vue.nextTick(...args)
}

console.log(Vue.nextTick)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
