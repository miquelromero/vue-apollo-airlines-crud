import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faChair, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import { createProvider } from './vue-apollo';
import i18n from './i18n';
import store from './store';

library.add(faCheckCircle, faChair, faSuitcaseRolling);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  i18n,
  store,
  render: h => h(App),
}).$mount('#app');
