import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ManageAccount from "../views/ex-views/ManageAccount.vue";
import ForgottenPassword from "../views/ex-views/ForgottenPassword.vue";
import CustomCharacter from "../views/ex-views/CustomCharacter.vue";
import Dashboard from "../views/ex-views/DashboardHome.vue";
import ClassRoom from "../views/ex-views/ClassRoom.vue";

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
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
