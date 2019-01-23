<template>
  <div>
    <lai-button @click.native="isModal = !isModal">toggle modal</lai-button>
    <lai-modal v-model="isModal"></lai-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isModal: false
    }
  }
}
</script>
