import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

let data = {
  active: false,

  match: [],
  matchID: "",
};

new Vue({
  data,
  router,
  render: h => h(App)
}).$mount('#app')
