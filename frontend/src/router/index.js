import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Main from "../components/commen/main/Main";
import Throw from "../components/commen/throw/Throw";
import Knowledge from "../components/commen/knowledge/Knowledge";
import Waste from "../components/commen/throw/Waste";
import Person from "../components/commen/person/Person";
import Personpassword from "../components/commen/person/Personpassword";
import Loginpassword from "../components/commen/login/Loginpassword";


/**
 * 管理员页面组件引入
 * */
import UserInformation from "../components/admin/usermanagement/UserInformation";
import AdminHome from "../views/AdminHome";
import GarbageInformation from "../components/admin/garbagemanagement/GarbageInformation";
import BannerManagement from "../components/admin/bannermanagement/BannerManagement";
import AnnounceMentmanagement from "../components/admin/announcementmanagement/AnnounceMentmanagement";
import IntegralManagement from "../components/admin/integralmanagement/IntegralManagement";

Vue.use(VueRouter)

const routes = [
  /**
   * 定向页面路由
   * */
  {
    path:'/',
    redirect:'/login'
  },
    /**
     * 登录页面路由
     * */
  {
    path: '/login',
    name: 'login',
    component: Login
  },
    /***
     * 注册页面路由
     **/
  {
    path: '/register',
    name: 'register',
    component: Register
  },
    {
        path:'/loginpassword',
        name:'loginpassword',
        component:Loginpassword
    },
    /**
     * 首页路由
     * */
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect:'/main',
    children:[
     {
        path:'/',
        name:'main',
        component:Main
      },
      {
        path:'/throw',
        component:Throw
      },
      {
        path:'/knowledge',
        component:Knowledge
      },
        {
            path:'/waste',
            component:Waste
        },
        {
            path:'/person',
            component:Person
        },
        {
            path:'/personpassword',
            component:Personpassword
        }
    ]
  },
  /**
   * 管理员路由
   * */
    {
        path:'/adminhome',
        name:'adminhome',
        component:AdminHome,
        redirect:'/userinformation',
        children:[
            {
                path:'/userinformation',
                name:'userinformation',
                component:UserInformation
            },
            {
                path:'/garbageinformation',
                component:GarbageInformation
            },
            {
                path:'/bannermanagement',
                component:BannerManagement
            },
            {
                path:'/announcementmanagement',
                component:AnnounceMentmanagement
            },
            {
                path:'/integralmanagement',
                component:IntegralManagement
            },
        ]
    }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫

router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from 代表从哪个路径跳转而来
    //next 是一个函数，表示放行
    //  next（）放行 next（'/login'）强制跳转
    if (to.path === '/login' || to.path === '/register' || to.path === '/loginpassword') return next()
    //获取账号
    const accountSrc = window.sessionStorage.getItem('account')
    const radio = window.sessionStorage.getItem('radio')
    if (!accountSrc){
        return next('/login')
    }
    if ((to.path === '/adminhome' || to.path === '/userinformation'
        || to.path === '/garbageinformation'
        || to.path === '/bannermanagement'
        || to.path === '/announcementmanagement'
        || to.path === '/integralmanagement') && (radio!=1)) return next('/home')
   next()
})

export default router
