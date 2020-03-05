import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/css/demo1",
    name: "cssdemo1",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CSS/demo-1.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
