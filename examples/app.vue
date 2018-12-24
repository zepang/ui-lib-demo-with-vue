<template lang="html">
  <div id="app">
    <!-- <img class="avatar" src="../src/assets/images/cache_user_icon.jpg" alt=""> -->
    <router-view></router-view>
    <lai-date-picker v-model="time" format="YYYY-MM-DD" type="dateRange"></lai-date-picker>
  </div>
</template>

<script>
export default {
  naem: 'App',
  data () {
    return {
      time: [new Date(), new Date()]
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

