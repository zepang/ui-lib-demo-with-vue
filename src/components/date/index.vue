<template>
  <div class="date-picker__wrapper">
    <date-picker-input radius="19px" :clearable="true" @click.native="isShow = true" v-model="time"></date-picker-input>
    <transition name="fade">
      <base-calendar v-if="isShow" @on-change="setTime" v-click-outside="hideSelf"></base-calendar>
    </transition>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import BaseCalendar from './components/BaseCalendar'
import DatePickerInput from './components/DatePickerInput'
import clickOutside from '../../directives/click-outside'
export default {
  data () {
    return {
      isShow: false,
      time: dayjs()
    }
  },
  directives: {
    'click-outside': clickOutside
  },
  components: {
    BaseCalendar,
    DatePickerInput
  },
  methods: {
    hideSelf () {
      this.isShow = false
    },
    setTime (value) {
      this.time = value.date
      this.$nextTick(() => {
        this.isShow = false
      })
    }
  }
}
</script>

<style lang="less">
.date-picker__wrapper {
  position: relative;
  width: 200px;
  margin: 0 auto;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-active, .fade-leave-active {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: translateY(0px);
}
</style>


