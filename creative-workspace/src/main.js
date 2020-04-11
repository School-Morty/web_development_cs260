import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import profiles from "./profiles";

Vue.config.productionTip = false;

let data = {
  pageWidth: 0,
  resultPage: false,
  teamPage: false,
  savedMatchData: {},
  successDeletedMatch: '',
};

new Vue({
  data,
  router,
  render: h => h(App)
}).$mount('#app')
