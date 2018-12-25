<template>
  <component :is="datePickerComponent" @change="handleChange"></component>
</template>

<script>
import SingleDatePicker from './SingleDatePicker'
import RangeDatePicker from './RangeDatePicker'
export default {
  data () {
    return {
      time: {
        value: this.value || null
      }
    }
  },
  provide() {
    return {injectProps: this.$props}
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
    },
    rangeSeparator: {
      type: String,
      default: '-'
    },
    radius: {
      type: String,
      default: '4px'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  created () {
    console.log(RangeDatePicker)
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
  },
  methods: {
    handleChange (val) {
      console.log('index:', val);
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
