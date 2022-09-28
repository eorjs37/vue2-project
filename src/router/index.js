import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history', //해쉬값 제거 방식
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/example1/:id',
      component: () => import('@/pages/Example1.vue'),
    },
    {
      path: '/test',
      component: () => import('@/pages/Test.vue'),
    },
  ],
});
