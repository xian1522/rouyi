import Cookies from "js-cookie";

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !! + Cookies.get('sidebarStatus') : true,
        withoutAnimation: false,
        hide: false
    },
    size: Cookies.get('size') || 'medium'
}

const actions = {
    toggleSideBar({ commit }){
        commit('TOGGLE_SIDEBAR')
    },
    toggleSideBarHide({ commit }, status){
        commit('SET_SIDEBAR_HIDE', status)
    },
    setSize({commit}, size){
        commit('SET_SIZE', size)
    }
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        if(state.sidebar.hide){
            return false
        }
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if(state.sidebar.opened){
            Cookies.set('sidebarStatus', 1)
        }else{
            Cookies.set('sidebarStatus', 0)
        }
    },
    SET_SIDEBAR_HIDE: (state, status) => {
        state.sidebar.hide = status
    },
    SET_SIZE: (state, size) => {
        state.size = size
        Cookies.set('size', size)
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}