import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import VModal from "vue-js-modal";
import VueToastify from "vue-toastify";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignOutAlt,
  faSave,
  faStar,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBJSI1G4JlXXbceQiPksP8cgo8OMd1TQ4A",
    libraries: "places",
    installComponents: true
  }
});

Vue.use(VueToastify, {
  position: "top-right"
});

Vue.use(VModal);

library.add(faSignOutAlt, faSave, faStar, faPlus);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
