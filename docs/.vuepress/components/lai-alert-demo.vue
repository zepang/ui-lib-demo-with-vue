<template>
  <lai-button @click.native="alert" type="ok">message</lai-button>
</template>
<script>
import LaiButton from './lai-button'
import alert from './alert/alert'
let _uid = 0
export default {
  components: { LaiButton },
  methods: {
    alert () {
      const types = ['success', 'info', 'warn', 'error']
      alert({
        content: `There is ${_uid} message`,
        duration: 2000,
        type: types[_uid%4]
      })
      _uid++
    }
  }
}
</script>

