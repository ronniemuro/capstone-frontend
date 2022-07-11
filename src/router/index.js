import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import PostsIndex from "../views/PostsIndex.vue";
import PostsNew from "../views/PostsNew.vue";
import PostsShow from "../views/PostsShow.vue";
import PostsEdit from "../views/PostsEdit.vue";
import ProfileView from "../views/ProfileView.vue";
import ProfileEdit from "../views/ProfileEdit.vue";
import ProfileSearch from "../views/ProfileSearch.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/posts",
    name: "posts-index",
    component: PostsIndex,
  },
  {
    path: "/posts/:id",
    name: "posts-show",
    component: PostsShow,
  },
  {
    path: "/posts/new",
    name: "posts-new",
    component: PostsNew,
  },
  {
    path: "/posts/:id/edit",
    name: "posts-edit",
    component: PostsEdit,
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: ProfileView,
  },
  {
    path: "/users/:id/edit",
    name: "users-edit",
    component: ProfileEdit,
  },
  {
    path: "/users/search",
    name: "users-search",
    component: ProfileSearch,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
