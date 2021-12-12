import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";
import CreateMessage from "../components/CreateMessage.vue";

const routes = [
  {
    path: "/", // if path is forward slash, then this will be home page
    name: "Login",
    component: Login,
  },
  {
    path: "/Chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/CreateMessage",
    name: "CreateMessage",
    component: CreateMessage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
