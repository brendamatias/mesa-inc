import Vue from "vue";
import VueRouter from "vue-router";

import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "signin",
    component: SignIn,
    meta: {
      signed: false
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
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
