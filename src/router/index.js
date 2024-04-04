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
import TeacherDasboard from "@/views/teacher/TeacherDasboard.vue";
import AdminLayout from "@/views/admin/AdminLayout.vue";
import MyPrograms from "@/views/student/MyPrograms.vue";
import RegisterTeacherForm from "@/components/forms/RegisterTeacherForm.vue";
import TeacherLayout from "@/views/teacher/TeacherLayout.vue";
import StudentLayout from "@/views/student/StudentLayout.vue";
import AddProgramForm from "@/components/forms/AddProgramForm.vue";
import AddSubjectForm from "@/components/forms/AddSubjectForm.vue";
import ProgramPage from "@/views/ProgramPage.vue";
import SubjectPage from "@/views/SubjectPage.vue";
import TimeTable from "@/components/TimeTable.vue";
// import ForgottenPassword from "../views/ForgottenPassword";
// import Dashboard from "../views/DashboardHome";
import ClassRoom from "../views/ClassRoom";
import Quizz from "../views/QuizzCustom"

Vue.use(VueRouter);

const adminRoutes = [
  {
    path: "admin-dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiredRoles: ["admin"] },
  },
  {
    path: "register-teacher",
    component: RegisterTeacherForm,
    meta: { requiresAuth: true, requiredRoles: ["admin"] },
  },
];

const teacherRoutes = [
  {
    path: "teacher-dashboard",
    component: TeacherDasboard,
    meta: { requiresAuth: true, requiredRoles: ["teacher"] },
  },
  {
    path: "add-program",
    component: AddProgramForm,
    meta: { requiresAuth: true, requiredRoles: ["teacher"] },
  },
  {
    path: "add-subjects/:programId",
    component: AddSubjectForm,
    name: "AddSubjects",
    props: true,
    meta: { requiresAuth: true, requiredRoles: ["teacher"] },
  }
];

const studentRoutes = [
  {
    path: "my-programs",
    component: MyPrograms,
    meta: { requiresAuth: true, requiredRoles: ["student"] },
  },
  {
    path: "my-timetable",
    component: TimeTable,
    meta: { requiresAuth: true, requiredRoles: ["student"] },
  },
  {
    path: "questionnaire-details/:questionnaireId",
    props: true,
    name: "QuestionnaireDetails",
    component: () => import("../views/student/QuestionnaireDetails.vue"),
    meta: { requiresAuth: true, requiredRoles: ["student"] },
  }
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
    path: "/programs/:programId",
    component: ProgramPage,
    name: "ProgramPage",
    props: true,
  },
  {
    path: "/subjects/:subjectId",
    component: SubjectPage,
    name: "SubjectPage",
    props: true,
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: adminRoutes,
    meta: { requiresAuth: true }, // Indique que le groupe de routes administratives nécessite une authentification
  },
  {
    path: "/teacher",
    component: TeacherLayout,
    children: teacherRoutes,
    meta: { requiresAuth: true }, // Indique que le groupe de routes pour les enseignants nécessite une authentification
  },
  {
    path: "/student",
    component: StudentLayout,
    children: studentRoutes,
    meta: { requiresAuth: true }, // Indique que le groupe de routes pour les étudiants nécessite une authentification
  },
  {
    path: "/classroom/:label",
    name: "classroom",
    component: ClassRoom,
    meta: { requiresAuth: true },
  },
  {
    path: "/quizz",
    component: Quizz,
    meta: { requiresAuth: true },
  },
  // Route pour gérer les pages non trouvées (404)
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Hook de navigation pour vérifier l'authentification avant chaque changement de route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vérifie si la route nécessite une authentification
    if (!store.state.isAuthenticated) {
      // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      next("/sign-in");
    } else {
      // Si l'utilisateur est authentifié, vérifiez si les rôles nécessaires sont présents
      const requiredRoles = to.meta.requiredRoles;
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
