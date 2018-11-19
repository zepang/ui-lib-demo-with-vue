<template>
  <div class="loading-demo__container">
    <div class="loading-wrapper" v-loading="loading" loading-text="加载中" @click="loading = !loading">
      <!-- <lai-loading></lai-loading> -->
    </div>
    <button @click="showLoading">显示loading</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  methods: {
    showLoading () {
      console.log(this)
      this.$loading({
        loadingText: '加载中。。。'
      })
    }
  }
}
</script>


<style lang="less" scoped>
.loading-wrapper {
  height: 200px;
}
</style>

