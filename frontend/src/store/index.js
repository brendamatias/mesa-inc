import Vue from "vue";
import Vuex from "vuex";

import { api } from "../services/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signed: false,
    user: {
      id: "",
      name: "",
      email: ""
    },
    locations: []
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.signed = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_LOCATIONS(state, payload) {
      state.locations = Object.assign(state.locations, payload);
    }
  },
  actions: {
    signUp(context, payload) {
      return api.post("/users", payload).then(res => {
        context.commit("UPDATE_USER", payload);
        context.commit("UPDATE_LOGIN", true);
        window.localStorage.token = `Bearer ${res.data.token.token}`;
      });
    },
    signIn(context, payload) {
      return api.post("/sessions", payload).then(res => {
        if (res.data.status === "error") {
          console.log(res.data);
        } else {
          context.commit("UPDATE_USER", res.data.user);
          context.commit("UPDATE_LOGIN", true);
          window.localStorage.token = `Bearer ${res.data.token.token}`;
        }
      });
    },
    signOut(context) {
      context.commit("UPDATE_USER", {
        id: "",
        name: "",
        email: ""
      });

      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    },
    getLocations(context) {
      return api.get("/locations").then(response => {
        context.commit("UPDATE_LOCATIONS", response.data);
      });
    },
    newLocation(context, payload) {
      return api.post("/locations", payload);
    }
  }
});
