import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      signed: false
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      signed: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      signed: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
