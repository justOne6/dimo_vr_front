import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import ManageAccount from "../views/ManageAccount";
import ForgottenPassword from "../views/ForgottenPassword";
import CustomCharacter from "../views/CustomCharacter.vue";
import Dashboard from "../views/DashboardHome";
import ClassRoom from "../views/ClassRoom";

Vue.use(VueRouter);

const routes = [
  { path: "/sign-in", component: SignIn },
  { path: "/", component: SignUp },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");

      if (token) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/manage-account",
    component: ManageAccount,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");

      if (token) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/forgotten-password",
    component: ForgottenPassword,
    /*beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");

      if (token) {
        next();
      } else {
        next("/");
      }
    },*/
  },
  {
    path: "/custom",
    component: CustomCharacter,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");

      if (token) {
        next();
      } else {
        next("/");
      }
    },
  },

  {
    path: "/classroom/:label",
    name: "classroom",
    component: ClassRoom,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");

      if (token) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
