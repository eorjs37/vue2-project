import Vue from 'vue';
import App from './App.vue';
import Modal from '@/components/Modal';
import VueCronTab from 'vue-crontab';
import store from './store';
//router
import router from '@/router/index';

Vue.config.productionTip = false;
Vue.use(VueCronTab);
Vue.component('Modal', Modal);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
