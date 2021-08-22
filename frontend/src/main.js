// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './MainApp';
import router from './router';
import store from './store';
import axios from 'axios';


import {library} from '@fortawesome/fontawesome-svg-core';
import {faHome, faCog, faCalendarPlus, faAngleRight, faAngleLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import 'es6-promise/auto';

library.add(faHome, faCog, faCalendarPlus, faAngleRight, faAngleLeft, faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import '../src/assets/css/app.css';

Vue.config.productionTip = false

// router.beforeEach((to, from, next)=>{
//   let isLogin = to.meta.isLogin;
//   let user = store.getters.getUser;
//   if(isLogin && user == null){
//     return next('/login');
//   }

//   if(!isLogin && user != null){
//     return next('/');
//   }
//   next();
// });

/* eslint-disable no-new */
new Vue({
  mounted(){
  },
  beforeunload: function(){
    window.addEventListener('beforeunload', async function(){
      await axios.post('/auth/session');
    })
  },
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})