<template>
  <popover ref="popover">
    <range-date-picker-input slot="reference" radius="19px" :clearable="true" v-model="time"></range-date-picker-input>
    <range-calendar slot="content" @on-change="setTime" v-click-outside="hideSelf"></range-calendar>
  </popover>
</template>

<script>
import dayjs from 'dayjs'
import Popover from '../popover'
import RangeCalendar from './components/RangeCalendar'
import RangeDatePickerInput from './components/RangeDatePickerInput'
import clickOutside from '../../directives/click-outside'
export default {
  name: 'SingleDatePicker',
  inject: ['type', 'format'],
  data () {
    return {
      isShow: false,
      time: [dayjs(), dayjs()]
    }
  },
  created () {
    console.log(this)
  },
  props: {
    format: {
      type: String,
      default: ''
    }
  },
  directives: {
    'click-outside': clickOutside
  },
  components: {
    Popover,
    RangeCalendar,
    RangeDatePickerInput
  },
  methods: {
    hideSelf () {
      this.isShow = false
    },
    setTime (value) {
      this.time = value.date
      this.$nextTick(() => {
        // this.$refs.popover.hide()
      })
    }
  }
}
</script>
