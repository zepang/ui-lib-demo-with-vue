<template>
  <div>
    输入框：<input type="text" @blur="checked" v-model.number="value">
    <p> 绑定值： {{value}} <button @click="value++">++</button></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 0
    }
  },
  methods: {
    checked () {
      console.log(1223)
      if (!isNaN(this.value)) {
        this.value = 0
      }
    }
  }
}
</script>

<style lang="less">
input {
  padding: 0.5em 0.8em;
}
</style>

