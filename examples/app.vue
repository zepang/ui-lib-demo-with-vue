<template lang="html">
  <div id="app">
    <!-- <img class="avatar" src="../src/assets/images/cache_user_icon.jpg" alt=""> -->
    <router-view></router-view>
    <div style="width: 300px; margin-top: 20px; display: inline-block">
      <lai-date-picker v-model="time" format="YYYY-MM-DD" type="dateRange" @change="handleChange"></lai-date-picker>
    </div>
    <div style="width: 300px; margin-top: 20px; display: inline-block">
      <lai-date-picker v-model="time" :singleCalendar="true" format="YYYY-MM-DD" type="dateRange" @change="handleChange"></lai-date-picker>
    </div>
    <div style="margin-top: 20px; display: inline-block">
      <lai-date-picker v-model="time2" format="YYYY-MM-DD" type="date" :btnControler="false" :monthControler="false" :yearControler="false"  @change="handleChange"></lai-date-picker>
    </div>
    <div>
      <lai-checkbox v-model="checkbox" :disabled="true"></lai-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  naem: 'App',
  data () {
    return {
      checkbox: true,
      time: [new Date(), new Date()],
      time2: new Date()
    }
  },
  methods: {
    handleChange (val) {
      console.log('app:', val)
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

