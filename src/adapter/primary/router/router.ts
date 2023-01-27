import HomeView from "@/adapter/primary/views/HomeView.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/adapter/primary/Layout.vue";

const routes = [{ path: "/", component: AppLayout, children: [{ path: "", component: HomeView }] }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
