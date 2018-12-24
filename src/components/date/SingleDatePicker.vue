<template>
  <popover width="200px" ref="popover">
    <date-picker-input slot="reference" radius="19px" :clearable="true" v-model="time"></date-picker-input>
    <base-calendar slot="content" @on-change="setTime" v-click-outside="hideSelf"></base-calendar>
  </popover>
</template>

<script>
import dayjs from 'dayjs'
import Popover from '../popover'
import BaseCalendar from './components/BaseCalendar'
import DatePickerInput from './components/DatePickerInput'
import clickOutside from '../../directives/click-outside'
export default {
  name: 'SingleDatePicker',
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
    Popover,
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
        this.$refs.popover.hide()
      })
    }
  }
}
</script>


