<template>
  <div ref="imgLoaderWrapper" :style="{imgWidth: `${width}px`, height: `${imgHeight}px`}" class="img-loader__wrapper" v-loading="imgLoading">
    <img ref="imgLoader" :src="url" alt="" class="img-loader">
    <modal v-model="isModal">
      <img :src="src" alt="" class="preview-img" prior>
    </modal>
  </div>
</template>
<script>
import loading from '../../directives/loading'
import Modal from '../modal'
export default {
  data () {
    return {
      imgWidth: 0,
      imgHeight: 0,
      imgLoading: false,
      isModal: false,
      url: ''
    }
  },
  created () {
    let img = new Image()
    img.src = this.src
    let timer = setInterval(() => {
      if (img.width || img.height) {
        this.imgWidth = img.width
        this.imgHeight = img.height
        this.imgLoading = true
        clearInterval(timer)
      }
    }, 40)
    img.onload = () => {
      setTimeout(() => {
        this.url = img.src
        this.imgLoading = false
      }, 20000)
    }
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    }
  },
  directives: {
    loading: loading
  },
  components: {
    Modal
  },
  watch: {
    src (val) {
      if (val) {
        debugger
        this.imgLoading = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.img-loader__wrapper {
  width: 200px;
  height: 200px;
}
</style>

