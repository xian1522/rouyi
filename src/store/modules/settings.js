import defaultSettings from '@/settings'

const{ dynamicTitle, showSettings, sidebarLogo, sideTheme, tagsView, fixedHeader, topNav} = defaultSettings
const storageSettiing = JSON.parse(localStorage.getItem('layout-setting')) || ''


const state = {
    title:'',
    theme: storageSettiing.theme || '#409EFF',
    sideTheme: storageSettiing.sideTheme || sideTheme,
    dynamicTitle: storageSettiing.defaultSettings === undefined ? dynamicTitle : storageSettiing.defaultSettings,
    showSettings: showSettings,
    sidebarLogo: storageSettiing.sidebarLogo == undefined ? sidebarLogo : storageSettiing.defaultSettings,
    tagsView: storageSettiing.tagsView === undefined ? tagsView : storageSettiing.tagsView,
    fixHeader: storageSettiing.fixHeader === undefined ? fixedHeader : storageSettiing.fixedHeader,
    topNav: storageSettiing.topNav === undefined ? topNav : storageSettiing.topNav
}

const actions = {
    //修改布局设置
    changeSettings({ commit }, data){
        commit('CHANGE_SETTING', data)
    }
}

const mutations = {
    CHANGE_SETTING: (state, {key, value}) => {
        if(state.hasOwnProperty(key)){
            state[key] = value
        }
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations
}
