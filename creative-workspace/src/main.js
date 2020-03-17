import Vue from 'vue'
import App from './App.vue'
import router from './router'
import profiles from "./profiles";

Vue.config.productionTip = false;

let data = {
  active: false,
  match: [],
  matchID: "",
  pageWidth: 0,
  profile: profiles,



  radiantPlayerTeamNum: 0,
  direPlayerTeamNum: 0,


  players: [],
  gameMode: "",
  radiantScore: 0, //Kills
  direScore: 0, //Kills
  towerStatusRadiant: 0,
  towerStatusDire: 0,
  barrackStatusRadiant: 0,
  barrackStatusDire: 0,
  duration: 0,
  radiantWin: true,
};

new Vue({
  data,
  router,
  render: h => h(App)
}).$mount('#app')
