<template lang="html">
  <div id="app">
    <!-- <img class="avatar" src="../src/assets/images/cache_user_icon.jpg" alt=""> -->
    <router-view></router-view>
    <!-- <lai-button @click.native="openModal">Modal</lai-button> -->
    <lai-button @click.native="openAlert">Alert</lai-button>
  </div>
</template>

<script>
import './components/Modal'
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
  },
  methods: {
    openModal () {
      let modal = new Modal({
        content: '12344444'
      })
      modal.open()
    },
    openAlert () {
      this.$alert({
        content: '122334',
        duration: 2000
      })
    }
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

