import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import user from './modules/user'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permissions'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        settings,
        user,
        app,
        permission
    },
    getters
})

export default store