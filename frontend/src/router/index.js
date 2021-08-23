import Vue from 'vue';
import Router from 'vue-router';

import MainComponent from '../components/MainComponent';
import PlanComponent from '../components/PlanComponent';
import SettingsComponent from '../components/SettingsComponent';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import AccountRegisterComponent from '../components/AccountRegisterComponent';
import BankSelectComponent from '../components/BankSelectComponent';
import AccNoRegisterComponent from '../components/AccNoRegisterComponent';
import AccountBalanceListComponent from '../components/AccountBalanceListComponent';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'main-page',
      component: MainComponent,
      meta:{isLogin:true}
    },
    {
      path:'/plan',
      name:'plan-page',
      component : PlanComponent,
      meta:{isLogin:true}
    },
    {
      path:'/settings',
      name:'settings-page',
      component : SettingsComponent,
      meta:{isLogin:true}
    },
    {
      path:'/login',
      name:'login-page',
      component:LoginComponent,
      meta:{isLogin:false}
    },
    {
      path:'/register',
      name:'register-page',
      component:RegisterComponent,
      meta:{isLogin:false}
    },
    {
      path:'/account',
      name:'accountment-page',
      component:AccountRegisterComponent,
      meta:{isLogin:true},
      props: true,
      children:[
        {
          path:'bank',
          name:'bank-page',
          component: BankSelectComponent,
          meta:{isLogin:true}
        },
        {
          path:'accno',
          name:'accno-page',
          component:AccNoRegisterComponent,
          props: true,
          meta:{isLogin:true}
        }
      ]
    },
    {
      path:'/account/history',
      name:'accountHistory-page',
      component: AccountBalanceListComponent,
      meta:{isLogin:true},
      props:true
    }
  ]
});