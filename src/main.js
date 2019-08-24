import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import { createProvider } from './vue-apollo';
import i18n from './i18n';

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  i18n,
  render: h => h(App),
}).$mount('#app');
