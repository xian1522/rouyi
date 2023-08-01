<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  metaInfo(){
    return {title:this.$store.state.settings.dynamicTitle && this.$store.state.settings.title}
  }
}
</script>

<style>

</style>
