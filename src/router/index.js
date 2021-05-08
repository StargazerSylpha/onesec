import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from "../views/Auth"
import Login from "../views/Login"
import Register from "../views/Register";
import Account from "../views/Account";
import ChangeInfo from "../views/ChangeInfo";
import ChangePassword from "../views/ChangePassword";
import News from "../views/News";
import NewsHome from "../views/NewsHome";
import NewsCategory from "../views/NewsCategory";
import NewsSearch from "../views/NewsSearch";
import NewsDetail from "../views/NewsDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/news',
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
      },

        //懒加载不要加大括号！不会显示！
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    redirect: '/account/changeInfo',
    children: [
      {
        path: 'changeInfo',
        name: 'changeInfo',
        component: ChangeInfo,
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        component: ChangePassword,
      },
    ],
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    redirect: '/news/home',
    children: [
      {
        path: 'home',
        name: 'newsHome',
        component: NewsHome,
      },
      {
        path: 'category/:categoryId',
        name: 'newsCategory',
        component: NewsCategory,
      },
      {
        path: 'search',
        name: 'newsSearch',
        component: NewsSearch,
      },
      {
        path: 'detail/:articleId',
        name: 'newsDetail',
        component: NewsDetail
      },
    ],


  },
  {
    path:"*",
    redirect: '/',
  },

]

const router = new VueRouter({
  routes
})

export default router
