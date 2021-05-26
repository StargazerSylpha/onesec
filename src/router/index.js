import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//vuerouter修改似乎需要刷新
//若出现大小写敏感错误，需要完全删除敏感的一行，然后重新填写
//直接修改错误的字幕似乎没用
//router name必写！关系到公共组件菜单的条目高亮！反而vue组件内的name没那么重要了
//当然，不一定非得是name字段，你写个menuTitle字段，然后在navi里设置一下，也能高亮，不过懒得改了

const routes = [
  {
    path: '/',
    redirect: '/news',
  },
  {
    path: '/auth',
    name: 'auth',
    component: ()=>import("../views/Auth"),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: ()=>import("../views/Login"),
      },
      {
        path: 'register',
        name: 'register',
        component: ()=>import("../views/Register"),
      },

        //懒加载不要加大括号！不会显示！
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: () => import("../views/Account"),
    redirect: '/account/changeInfo',
    children: [
      {
        path: 'changeInfo',
        name: 'changeInfo',
        component: () => import("../views/ChangeInfo"),
      },
      {
        path: 'changePassword',
        name: 'changePassword',
        component: () => import("../views/ChangePassword"),
      },
      {
        path: "userComment",
        name: "userComment",
        component: () => import("../views/UserComment")
      }
    ],
  },
  {
    path: '/news',
    name: 'news',
    component: () => import("../views/News"),
    redirect: '/news/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import("../views/NewsHome"),
      },
      {
        path: 'category/:categoryId',
        name: 'newsCategory',
        component: () => import("../views/NewsCategory"),
      },
      {
        path: 'search',
        name: 'newsSearch',
        component: () => import("../views/NewsSearch"),
      },
      {
        path: 'detail/:articleId',
        name: 'newsDetail',
        component: () => import("../views/NewsDetail")
      },
    ],


  },
  {
    path:"/console",
    name:"console",
    component: ()=> import("../views/Console"),
    redirect: "/console/articleList",
    children: [
      {
        path:"categoryEdit",
        name:"categoryEdit",
        component: () => import("../views/CategoryEdit"),
      },
      {
        path:"articleEdit",
        name:"articleEdit",
        component: () => import("../views/ArticleEdit"),
      },
      {
        path:"userList",
        name:"userList",
        component: () => import("../views/UserList"),
      },
      {
        path:"articleList",
        name: "articleList",
        component: () => import("../views/ArticleList")
      },
      {
        path:"trendingList",
        name: "trendingList",
        component: () => import("../views/TrendingList")
      },
      {
        path: "commentList",
        name: "commentList",
        component: () => import("../views/CommentList")
      }
    ]
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
