<template>
  <div>
    <lai-button @click.native="openModal">Toggle Modal</lai-button>
  </div>
</template>
<script>
import LaiButton from './lai-button'
import modal from './modal/ModalPrototype'
export default {
  name: 'ModalPrototype',
  data () {
    return {
      value: false
    }
  },
  components: { LaiButton },
  methods: {
    openModal () {
      console.log(modal);
      modal.open({
        content: '接口调用方式启动modal'
      })
    }
  }
}
</script>