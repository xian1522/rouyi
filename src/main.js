import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss'
import './assets/styles/ruoyi.scss'

import './permissions'

import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


Vue.use(VueMeta)
Vue.use(ElementUI,{
  size: 'medium'
})


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
