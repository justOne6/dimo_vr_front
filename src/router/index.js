import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

/*
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};


const redirectToHomeInIfNotAuthenticated = (to, from, next) => {
  if (!isAuthenticated()) {
    next("/");
  } else {
    next();
  }
};
*/

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
  /*{
    path: "/manage-account",
    component: ManageAccount,
    beforeEnter: redirectToSignInIfNotAuthenticated,
  },*/
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
