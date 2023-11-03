import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ManageAccount from "../views/ManageAccount";
import ForgottenPassword from "../views/ForgottenPassword";
import CustomPersonnages from "../views/CustomPersonnages";

Vue.use(VueRouter);

const routes = [
  { path: "/sign-in", component: SignIn },
  { path: "/", component: SignUp },
  { path: "/manage-account", component: ManageAccount },
  { path: "/forgotten-password", component: ForgottenPassword },
  { path: "/custom", component: CustomPersonnages },

];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
