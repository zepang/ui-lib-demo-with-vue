<template>
  <component ref="picker" :is="datePickerComponent" @change="handleChange"></component>
</template>

<script>
import dayjs from 'dayjs'
import SingleDatePicker from './SingleDatePicker'
import RangeDatePicker from './RangeDatePicker'
export default {
  data () {
    return {
      time: null
    }
  },
  provide() {
    return {picker: this}
  },
  props: {
    value: [String, Array, Date],
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
    if (this.type === 'dateRange') {
      if (this.value && typeof this.value === 'object' && !(this.value instanceof Array)) { 
        throw new Error('the value of RangeDatePicker must be a Array')
      }
      if (this.value && this.value[0]) this.time = [dayjs(this.value[0]).format(this.format), dayjs(this.value[1]).format(this.format)]
    } else {
      if (this.value) this.time = dayjs(this.value).format(this.format)
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
  },
  methods: {
    handleChange (val) {
      console.log('index:', val);
      this.$emit('input', val)
      this.$emit('change', val)
    },
    pickDate (val) {
      console.log('index:', val);
      this.$emit('input', val)
      this.$emit('change', val)
    },
    hide () {
      this.$nextTick(() => {
        this.$refs.picker.$refs.popover.hide()
      })
    }
  },
  watch: {
    value (val) {
      this.time = val
    }
  }
}
</script>
