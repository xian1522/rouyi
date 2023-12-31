const getters = {
    roles: state => state.user.roles,
    sidebar: state => state.app.sidebar,
    permissions: state => state.user.permissions,
    sidebarRouters: state => state.permission.sidebarRoutes,
    permission_routes: state => state.permission.routes,
    size: state => state.app.size,
    avatar: state => state.user.avatar
}

export default getters