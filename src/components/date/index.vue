<template>
  <component :is="datePickerComponent"></component>
</template>

<script>
import SingleDatePicker from './SingleDatePicker'
import RangeDatePicker from './RangeDatePicker'
export default {
  provide() {
    return {...this.$props}
  },
  props: {
    value: [String, Array],
    type: {
      type: String,
      default: 'date'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  computed: {
    datePickerComponent () {
      switch (this.type) {
        case 'dateRange':
          return 'RangeDatePicker'
        default:
          return 'SingleDatePicker'
      }
    }
  },
  components: {
    SingleDatePicker,
    RangeDatePicker
  }
}
</script>
