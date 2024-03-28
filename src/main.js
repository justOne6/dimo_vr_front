import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import router from "./router/index";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  vuetify,
}).$mount("#app");
