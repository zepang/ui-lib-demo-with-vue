<template>
  <div>
    <ul class="weekDaysTitle">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>
    <ul class="days">
      <li v-for="item in 42">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import * as util from './util'
export default {
  data () {
    return {

    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      let curMonthDayCount = util.getDayCountOfMonth(new Date())
      console.log(curMonthDayCount)
    }
  }
}
</script>

