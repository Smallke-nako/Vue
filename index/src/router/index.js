import Vue from 'vue'
import Router from 'vue-router'
import LoginBox from "../views/Login/LoginBox";
import Layout from "../views/layout/Layout";
import LoginLog from "@/views/Log/LoginLog";

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '主页', icon: 'house'}
    }]
  },
  {
    path:'/login',
    name:'LoginTest',
    component:LoginBox,
    hidden: true
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/Log/LoginLog',
    name: 'Log',
    meta: {title: '操作日志管理',icon: 'form'},
    children: [
      {
        path: 'loginlog',
        name: 'Loginlog',
        component: LoginLog,
        meta: {title: '系统登录日志',icon: 'form'}
      },]
  },
  {
    path: '/employee',
    component: Layout,
    name: 'Employee',
    redirect: '/employee/index',
    meta: {title: '员工列表',icon: 'user'},
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/Employee/index'),
      },
    ]
  },
  {
    path: '/attendance',
    component: Layout,
    name: 'Attendance',
    redirect: '/attendance/index',
    meta: {title: '每日打卡记录',icon: 'table'},
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/Attendance/index'),
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'Userlist',
        component: () => import('@/views/users/list'),
        meta: { title: '用户列表', icon: 'user' }
      },
    ]
  },
  {
    path: '/video',
    component: Layout,
    name: 'Video',
    redirect: '/video/record1',
    meta: { title: '监控', icon: 'example' },
    children: [
      // {
      //   path: 'record',
      //   name: 'Record',
      //   component: () => import('@/views/Video/test'),
      //   meta: {title: '图片识别',icon: 'table'}
      // },
      {
        path: 'record1',
        name: 'Record1',
        component: () => import('@/views/Video/Index'),
        meta: {title: '视频监控',icon: 'form'}
      }
    ]
  },
  {
    path: '/warn',
    component: Layout,
    name: 'Warning',
    redirect: '/warn/picture',
    meta: {title: '工作区域危险行为',icon: 'table'},
    children: [
      {
        path: 'picture',
        name: 'Picture',
        component: () => import('@/views/Picture/index'),
        meta: {title: '危险行为记录',icon: 'form'}
      },
    ]
  },
  {
    path: '/practice',
    component: Layout,
    name:'Practice',
    redirect: '/practice/index',
    meta:{title: 'Vue练习',icon: 'table'},
    children: [{
      path: 'practice',
      name: 'Practice',
      component: () => import('@/views/practice/index'),
      meta: {title: 'Vue练习', icon: 'form'}
    }]
  },

  // {
  //   path: '/notice',
  //   component: Layout,
  //   name: 'Notice',
  //   redirect: '/notice/index',
  //   meta: {title: '公告栏',icon: 'nested'},
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Index',
  //       component: () => import('@/views/Notice/Index'),
  //     },
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]



export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
