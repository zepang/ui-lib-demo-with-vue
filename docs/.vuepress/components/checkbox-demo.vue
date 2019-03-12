<template>
  <div>
    <checkbox v-model="value">复选框</checkbox>
    <p>value: {{value}} <button @click="value = !value">toggle</button></p>
  </div>
</template>
<script>
import Checkbox from './checkbox'
export default {
  data () {
    return {
      value: false
    }
  },
  components: { Checkbox }
}
</script>

