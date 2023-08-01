<template>
  <div :class="{'has-logo': showLogo}" :style="{backgroudColor: settings.sideTheme == 'theme-dark' ? variables.menuBackgroud : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse"></logo>
    <el-scrollbar>
      <el-menu 
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item 
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>  
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'
import Logo from "./Logo"
import SidebarItem from './SidebarItem'

export default {
  components:{
    Logo,
    SidebarItem
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['sidebarRouters','sidebar']),
    activeMenu(){
      const route = this.$route
      const {meta, path} = route
      if(meta.activeMenu){
        return meta.activeMenu
      }
      return path
    },
    showLogo(){
        return this.$store.state.settings.sidebarLogo
    },
    variables(){
        return variables
    },
    isCollapse(){
      return !this.sidebar.opened
    }
  }
}
</script>
