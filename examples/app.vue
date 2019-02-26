<template lang="html">
  <div id="app">
    <!-- <img class="avatar" src="../src/assets/images/cache_user_icon.jpg" alt=""> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  naem: 'App',
  mounted () {
    this.$alert({
      content: '122334',
       duration: 4000
    })
    this.$alert({
      content: '122334',
       duration: 2000
    })
  }
}
</script>

<style lang="less">
@import '../src/assets/styles/index.less';
</style>

<style lang="less" scoped>
.avatar {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>

