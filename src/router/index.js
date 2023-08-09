import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'


Vue.use(Router)

//公共路由
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
          {
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect')
          }
        ]
    },
    {
        
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/index'),
                name: 'Index',
                meta: {title: '首页', icon: 'dashboard', affix: true}
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        hidden: true,
        component: () => import('@/views/error/404')
    },
    {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: "noredirect",
        children:[
            {
                path:'profile',
                component: () => import('@/views/system/user/profile/index'),
                name: 'Profile',
                meta: {title: '个人中心', icon: 'user'}
            }
        ]
    }
]

export const dynamicRoutes = [
    {
        path: '/system/user-auth',
        component: Layout,
        hidden: true,
        permissions: ['system:user:edit'],
        children:[
            {
                path: 'role/:userId(\\d+)',
                component: () => import('@/views/system/user/authRole'),
                name: 'AuthRole',
                meta: {title: '分配角色', activeMenu: 'system/user'}
            }
        ]
    }
]


export default new Router({
    mode: 'history',
    routes: constantRoutes
})