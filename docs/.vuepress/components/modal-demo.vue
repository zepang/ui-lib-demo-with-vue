<template>
  <div>
    <lai-button @click.native="value = !value">Toggle Modal</lai-button>
    <lai-modal v-model="value"></lai-modal>
  </div>
</template>
<script>
import LaiModal from './modal'
import LaiButton from './lai-button'
export default {
  data () {
    return {
      value: false
    }
  },
  components: { LaiModal, LaiButton }
}
</script>
