<template lang="html">
  <div class="switch-page">
    <lai-switch v-model="isOpen" size="small"></lai-switch>
    <lai-switch v-model="isOpen"></lai-switch>
    <lai-switch v-model="isOpen" size="large"></lai-switch>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="css">
</style>
