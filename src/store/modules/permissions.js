import { getRouters } from "@/api/menu"
import auth from "@/plugins/auth"
import Layout from "@/layout/index"
import router, { constantRoutes, dynamicRoutes } from "@/router"


const permission = {
    state: {
        routes: [],
        addRoutes: [],
        defaultRoutes: [],
        topbarRoutes: [],
        sidebarRoutes: []
    },
    mutations: {
        SET_ROUTES:(state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
        },
        SET_DEFAULT_ROUTES:(state, routes) => {
            state.defaultRoutes = constantRoutes.concat(routes)
        },
        SET_SIDEBAR_ROUTES: (state, routes) => {
            state.sidebarRoutes = routes
        },
        SET_TOPBAR_ROUTES: (state, routes) => {
            state.topbarRoutes = routes
        }
    },
    actions: {
        //生成路由
        GenerateRoutes({commit}) {
            return new Promise(resovle => {
                getRouters().then(res => {
                    const sdata = JSON.parse(JSON.stringify(res.data))
                    const rdata = JSON.parse(JSON.stringify(res.data))
                    const sidebarRoutes = filterAsyncRouter(sdata)
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                    const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
                    rewriteRoutes.push({path: '*', redirect: '/4o4', hidden: true})
                    router.addRoutes(asyncRoutes);
                    commit('SET_ROUTES', rewriteRoutes)
                    commit('SET_SIDEBAR_ROUTES', constantRoutes.concat(sidebarRoutes))
                    commit('SET_DEFAULT_ROUTES', sidebarRoutes)
                    commit('SET_TOPBAR_ROUTES', sidebarRoutes)
                    resovle(rewriteRoutes)
                })
            })
        }
    }
}

function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false){
    return asyncRouterMap.filter(route => {
        if(type && route.children){
            route.children = filterChildren(route.children)
        }
        if(route.component){
            if(route.component === 'Layout'){
                route.component = Layout
            }else if(route.component === 'ParentView'){

            }else if(route.component === 'InnerLink'){

            }else{
                route.component = loadView(route.component)
            }
        }
        if(route.children != null && route.children && route.children.length > 0){
            route.children = filterAsyncRouter(route.children, route, type)
        }else{
            delete route['children']
            delete route['redirect']
        }
        return true
    })
}

function filterChildren(childrenMap, lastRouter = false){
    var children = []
    childrenMap.forEach((el, index) => {
        if(el.children && el.children.length){
            if(el.component == "ParentView" && !lastRouter){
                el.children.forEach(c => {
                    c.path = el.path + '/' + c.path
                    if(c.children && c.children.length){
                        children = children.concat(filterAsyncChildren(c.children, c))
                        return
                    }
                    children.push(c)
                })
                return
            }
        }

        if(lastRouter){
            el.path = lastRouter.path + '/' + el.path
        }
        children = children.concat(el)
    })

    return children
}

export function filterDynamicRoutes(routes){
    const res = []
    routes.forEach(route => {
        if(route.permissions){
          if(auth.hasPermiOr(route.permissions)){
            res.push(route)
          }  
        }else if(route.roles){
            if(auth.hasRoleOr(route.roles)){
                res.push(route)
            }
        }
    })
    return res
}

export const loadView = (view) => {
    if(process.env.NODE_ENV == 'development') {
        return (resovle) => require([`@/views/${view}`], resovle)
    }else{
        return () => import(`@/views/${view}`)
    }
}

export default permission