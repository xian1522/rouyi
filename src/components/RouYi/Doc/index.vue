<template>
  <div>
    <svg-icon icon-class="question" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'RouYiDoc',
  data() {
    return {
        url: "http://doc.ruoyi.vip/ruoyi-vue"
    }
  },
  methods: {
    goto(){
        window.open(this.url)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
