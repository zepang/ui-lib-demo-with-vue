<template>
  <component :is="type"></component>
  <!-- <single-date-picker></single-date-picker> -->
</template>

<script>
import SingleDatePicker from './SingleDatePicker'
export default {
  props: {
    type: {
      type: String,
      default: 'SingleDatePicker'
    }
  },
  components: {
    SingleDatePicker
  }
}
</script>
