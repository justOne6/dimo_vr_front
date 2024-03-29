import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import router from "./router/index";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import store from './store'

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  store,
  vuetify
}).$mount("#app");
