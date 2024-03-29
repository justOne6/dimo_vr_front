import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Home from "@/views/Home.vue";
import ManageAccount from "@/views/ManageAccount.vue";
import CustomCharacter from "@/views/CustomCharacter.vue";
import NotFound from "@/views/NotFound.vue";
import AdminDashboard from "@/views/admin/AdminDashboard.vue";

Vue.use(VueRouter);

const adminRoutes = [
  {
    path: "admin-dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  // Ajoutez d'autres routes administratives ici
];

const teacherRoutes = [
  {
    path: "teacher-dashboard",
    component: () => import("../views/teacher/TeacherDasboard.vue"),
    meta: { requiresAuth: true, requiredRoles: ["teacher"] },
  },
  // Ajoutez d'autres routes pour les enseignants ici
];

const studentRoutes = [
  {
    path: "my-programs",
    component: () => import("../views/student/MyPrograms.vue"),
    meta: { requiresAuth: true, requiredRoles: ["student"] },
  },
  // Ajoutez d'autres routes pour les étudiants ici
];

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
  { path: "/access-denied", component: () => import("../views/AccessDenied.vue")},
  {
    path: "/manage-account",
    component: ManageAccount,
    meta: { requiresAuth: true },
  },
  {
    path: "/custom",
    component: CustomCharacter,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: () => import("../views/admin/AdminLayout.vue"),
    children: adminRoutes,
    meta: { requiresAuth: true, requiredRoles:["admin"] }, // Indique que le groupe de routes administratives nécessite une authentification
  },
  {
    path: "/teacher",
    component: () => import("../views/AppLayout.vue"),
    children: teacherRoutes,
    meta: { requiresAuth: true, requiredRoles: ["teacher"] }, // Indique que le groupe de routes pour les enseignants nécessite une authentification
  },
  {
    path: "/student",
    component: () => import("../views/AppLayout.vue"),
    children: studentRoutes,
    meta: { requiresAuth: true, requiredRoles: ["student"]}, // Indique que le groupe de routes pour les étudiants nécessite une authentification
  },
  // Route pour gérer les pages non trouvées (404)
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Hook de navigation pour vérifier l'authentification avant chaque changement de route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("Authentification requise")
    // Vérifie si la route nécessite une authentification
    if (!store.state.isAuthenticated) {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      next("/sign-in");
    } else {
      console.log("Authentifié")
      // Si l'utilisateur est authentifié, vérifiez si les rôles nécessaires sont présents
      const requiredRoles = to.meta.requiredRoles;
      console.log("Roles nécessaires: ", requiredRoles)
      if (requiredRoles && !store.getters.isRolePresent(requiredRoles[0])) {
        // Si les rôles nécessaires ne sont pas présents, redirigez l'utilisateur vers une page d'accès refusé ou une autre page appropriée
        next("/access-denied");
      } else {
        // Si l'utilisateur est authentifié et a les rôles nécessaires, autorisez la navigation
        next();
      }
    }
  } else {
    // Si la route ne nécessite pas d'authentification, autorisez la navigation
    next();
  }
});

export default router;
