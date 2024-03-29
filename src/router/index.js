import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ManageAccount from "../views/ManageAccount";
import ForgottenPassword from "../views/ForgottenPassword";
import CustomCharacter from "../views/CustomCharacter.vue";
import Dashboard from "../views/DashboardHome";
import ClassRoom from "../views/ClassRoom";
import Quizz from "../views/QuizzCustom";

Vue.use(VueRouter);

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const redirectToSignInIfNotAuthenticated = (to, from, next) => {
  if (!isAuthenticated()) {
    next("/sign-in");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: redirectToSignInIfNotAuthenticated,
  },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
  {
    path: "/manage-account",
    component: ManageAccount,
    beforeEnter: redirectToSignInIfNotAuthenticated,
  },
  {
    path: "/forgotten-password",
    component: ForgottenPassword,
  },
  {
    path: "/custom",
    component: CustomCharacter,
    beforeEnter: redirectToSignInIfNotAuthenticated,
  },
  {
    path: "/classroom/:label",
    name: "classroom",
    component: ClassRoom,
    beforeEnter: redirectToSignInIfNotAuthenticated,
  },
  {
    path: "/quizz",
    component: Quizz,
    beforeEnter: redirectToSignInIfNotAuthenticated,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
