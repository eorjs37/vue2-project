import Vue from 'vue';
import App from './App.vue';
import Modal from '@/components/Modal';

//router
import router from '@/router/index';

Vue.config.productionTip = false;

Vue.component('Modal', Modal);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
