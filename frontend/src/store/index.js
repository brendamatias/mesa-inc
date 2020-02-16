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
    newUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email });
      return api.post("/users", payload);
    },
    signIn(context, payload) {
      return api.post("/sessions", payload).then(response => {
        if (response.data.status === "error") {
          console.log(response.data);
        } else {
          context.commit("UPDATE_USER", response.data.user);
          context.commit("UPDATE_LOGIN", true);
          window.localStorage.token = `Bearer ${response.data.token.token}`;
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
