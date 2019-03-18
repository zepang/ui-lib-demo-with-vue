<template>
  <div>
    <lai-button @click.native="originModal">原生 Modal</lai-button>
    <lai-button @click.native="value = !value">Vue Modal</lai-button>
    <lai-modal v-model="value">
      <h3>Vue Modal</h3>
    </lai-modal>
  </div>
</template>
<script>
import LaiButton from './lai-button'
import LaiModal from './modal'
import './modal/Modal'
export default {
  // name: 'globalModalDemo',
  data () {
    return {
      value: false
    }
  },
  components: { LaiModal, LaiButton },
  methods: {
    originModal () {
      this.modal = new window.Modal({
        content: '<h3>原生Modal</h3>'
      })
      this.modal.open()
    }
  }
}
</script>
