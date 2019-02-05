<template>
  <input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur">
</template>
<script>
import Emitter from './Emitter'
export default {
  data () {
    return {
      currentValue: this.value
    }
  },
  mixins: [Emitter],
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
      this.dispatch('form-item', 'on-form-change', value)
    },
    handleBlur (e) {
      this.dispatch('form-item', 'on-form-blur', this.currentValue)
    }
  }
}
</script>
