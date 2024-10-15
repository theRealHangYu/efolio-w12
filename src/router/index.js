import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AccessDeniedView from "../views/AccessDeniedView.vue";
import FirebaseSigninView from "@/views/FirebaseSigninView.vue";
import FirebaseResigerView from "@/views/FirebaseResigerView.vue";
import AdminView from "@/views/AdminView.vue";
import AddBookView from "@/views/AddBookView.vue";
import GetBookCountView from "@/views/GetBookCountView.vue";
import WeatherView from "@/views/WeatherView.vue";
import CountBookAPI from "@/views/CountBookAPI.vue";
import GetAllBooksAPI from "@/views/GetAllBooksAPI.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "About",
      component: AboutView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Resigher",
      component: RegisterView,
    },
    {
      path: "/access-denied",
      name: "AccessDenied",
      component: AccessDeniedView,
    },
    { path: "/FireLogin", name: "FireLogin", component: FirebaseSigninView },
    {
      path: "/FireResiger",
      name: "FireRegiser",
      component: FirebaseResigerView,
    },
    { path: "/admin", name: "Admin", component: AdminView },
    { path: "/addbook", name: "AddBook", component: AddBookView },
    {
      path: "/GetBookCount",
      name: "GetBookCount",
      component: GetBookCountView,
    },
    { path: "/GetWeather", name: "GetWeather", component: WeatherView },
    { path: "/CountBookAPI", name: "CountBookAPI", component: CountBookAPI },
    {
      path: "/GetAllBooksAPI",
      name: "GetAllBooksAPI",
      component: GetAllBooksAPI,
    },
  ],
});
router.beforeEach((to, from, next) => {
  console.log("Navigation guard triggered");
  const isAuth = localStorage.getItem("isAuth") === "true";
  console.log("isAuth:", isAuth);
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: "AccessDenied" });
  } else {
    next();
  }
});

export default router;
