const getters = {
    roles: state => state.user.roles,
    sidebar: state => state.app.sidebar,
    permissions: state => state.user.permissions,
    sidebarRouters: state => state.permission.sidebarRoutes
}

export default getters