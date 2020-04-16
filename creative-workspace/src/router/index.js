import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Team from '../views/Team/Team.vue'
import Results from '../views/Results/Results.vue'
import ResultsAdmin from "../views/Results/ResultsAdmin.vue";
import TeamAdmin from "../views/Team/TeamAdmin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: News
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/teamAdmin',
    name: 'TeamAdmin',
    component: TeamAdmin
  },
  {
    path: '/Results/results',
    name: 'Results',
    component: Results
  },
  {
    path: '/Results/ResultsAdmin',
    name: 'ResultsAdmin',
    component: ResultsAdmin
  },
  {
    path: '/github',
    beforeEnter() {location.href = "https://github.com/Morty-Mortensen/web_development_cs260/tree/master/creative-workspace"}
  },
  {
    path: '/facebook',
    beforeEnter() {location.href = "https://www.facebook.com/pages/category/Social-Club/DOTA-Cougs-102171557852322/"}
  },
  {
    path: '/twitter',
    beforeEnter() {location.href = "https://twitter.com/mortymortensen"}
  },
  {
    path: '/linkdin',
    beforeEnter() {location.href = "https://www.linkedin.com/in/tyler-mortensen-73a602175?trk=people-guest_people_search-card"}
  },
  {
    path: '/google',
    beforeEnter() {location.href = "https://www.google.com/"}
  },
  {
    path: '/signup',
    beforeEnter() {location.href = "https://clubs.byu.edu/clubs#/byudc"}
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
