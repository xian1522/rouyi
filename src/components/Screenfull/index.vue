<template>
  <div>
    <svg-icon :icon-class="isFullScreen?'exit-fullscreen':'fullscreen'" @click="click"></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  data(){
    return {
        isFullScreen: false
    }
  },
  methods: {
    click() {
        if(!screenfull.isEnabled){
            this.$message({message: "你的浏览器不支持全屏", type: "warning"})
            return false
        }
        screenfull.toggle()
    },
    change() {
        this.isFullScreen = screenfull.isFullscreen
    },
    init() {
        if(screenfull.isEnabled){
            screenfull.on('change', this.change)
        }
    },
    destroy() {
        if(screenfull.isEnabled){
            screenfull.off('change', this.change)
        }
    },
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
