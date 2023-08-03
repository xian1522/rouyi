import router from "./router";
import store from "./store";
import { getToken } from "./utils/auth";
import { isRelogin } from "./utils/request";

const whiteList = ['/login', '/register']

//路由前置守卫
router.beforeEach((to, from, next) => {
    console.log('router.beforeEach' + to.fullPath)
    if (getToken()) {
        if(store.getters.roles.length === 0){
            isRelogin.show = true
            store.dispatch('GetInfo').then(() => {
                isRelogin.show = false
                store.dispatch('GenerateRoutes').then(accessRoutes => {
                    router.addRoutes(accessRoutes)
                    next({...to, replace: true})
                })
            })
        }
        next()
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next() //放行
        }else{
            console.log(to);
            next(`/login?redirect=${to.fullPath}`) //重定向
        }
    }
});