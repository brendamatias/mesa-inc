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
  faPlus,
  faHeart,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_KEY,
    libraries: "places",
    installComponents: true
  }
});

Vue.use(VueToastify, {
  position: "top-right"
});

Vue.use(VModal);

library.add(faSignOutAlt, faSave, faStar, faPlus, faHeart, faHeart, faSpinner);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
