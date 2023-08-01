import store from "@/store";

function authPermisson(permission){
    const all_permission = "*:*:*"
    const permissions = store.getters && store.getters.permissions
    if(permission && permission.length > 0){
        //some()函数检测数组中的元素是否满足指定条件
        return permissions.some(v => {
            return all_permission === v || v === permission
        })
    }else{
        return false
    }
}

function authRole(role){
    const super_admin = "admin"
    const roles = store.getters && store.getters.roles
    if(roles && roles.length > 0){
        return roles.some(v => {
            return super_admin === v || v === role
        })
    }else{
        return false
    }
}

export default{
    hasPermi(permission){
        return authPermisson(permission)
    },
    hasPermiOr(permissions){
        return permissions.some(item => {
            return authPermisson(item)
        })
    },
    hasPermiAnd(permissions){
        return permissions.every(item => {
            return authPermisson(item)
        })
    },
    hasRole(role){
        return authRole(role)
    },
    hasRoleOr(roles){
        return roles.some(item => {
            return authRole(item)
        })
    },
    hasRoleAnd(roles){
        return roles.every(item => {
            return authRole(item)
        })
    }
}