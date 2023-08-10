<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <el-scrollbar>
      <sidebar v-if="!sidebar.hide" class="sidebar-container"></sidebar>
      <div :class="{hasTagsView:needTagsView,sidebarHide:sidebar.hide}" class="main-container">
         <div :class="{'fixed-header' : fixedHeader}">
            <navbar/>
         </div>
         <app-main/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Sidebar,Navbar,AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sidebar: state => state.app.sidebar,
      sideTheme: state => state.settings.sideTheme,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
     classObj(){
      return {
        hideSidebar: !this.sidebar.opened
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    .el-scrollbar{
      height: 100%;
    }

    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$base-sidebar-width});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .sidebarHide .fixed-header {
    width: 100%;
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
