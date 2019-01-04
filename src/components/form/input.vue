<template>
  <input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur">
</template>
<script>
import EventBus from './EventBus'
export default {
  data () {
    return {
      currentValue: this.value
    }
  },
  props: {
    type: String,
    default: ''
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    handleInput (e) {
      let value = e.target.value
      this.currentValue = value
      this.$emit('input', value)
      EventBus.$emit('on-form-change', value)
    },
    handleBlur (e) {
      EventBus.$emit('on-form-blur', this.currentValue)
    }
  }
}
</script>
