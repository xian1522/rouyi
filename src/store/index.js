import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import user from './modules/user'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permissions'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        settings,
        user,
        app,
        permission,
        tagsView
    },
    getters
})

export default store