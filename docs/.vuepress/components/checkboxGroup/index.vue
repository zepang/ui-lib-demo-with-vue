<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import { findChildren } from '../../utils'
export default {
  name: 'lai-checkbox-group',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.updateChildrenModel()
  },
  methods: {
    updateChildrenModel () {
      let children = findChildren(this, 'lai-checkbox')
      for (let child of children) {
        child.model = this.value
        child.isChecked = (this.value.indexOf(child.label) !== -1)
      }
    },
    updateModel (data) {
      this.$emit('input', data)
      this.$emit('on-change', data)
    }
  },
  watch: {
    value (val) {
      this.updateChildrenModel()
    }
  }
}
</script>

