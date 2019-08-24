import Vue from 'vue';
import Router from 'vue-router';
import AirlinesCrud from './views/AirlinesCrud.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'airlines',
      component: AirlinesCrud,
    },
    {
      path: '/create',
      name: 'airlines-create',
      component: AirlinesCrud,
      props: {
        isCreating: true,
      },
    },
    {
      path: '/edit/:id',
      name: 'airlines-edit',
      component: AirlinesCrud,
      props: {
        isEditing: true,
      },
    },
  ],
});
