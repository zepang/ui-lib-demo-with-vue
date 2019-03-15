<template>
  <transition name="fade">
    <div class="modal-wrapper" v-if="isShow">
      <div class="modal-mask"></div>
      <div class="modal-main" :style="styles" v-click-outside="hide">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import clickOutside from '../../directives/click-outside'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isShow: this.value
    }
  },
  directives: {
    'click-outside': clickOutside
  },
  methods: {
    hide () {
      this.isShow = false
      this.$emit('input', this.isShow)
    }
  },
  watch: {
    value (val) {
      if (this.ishow !== val) {
        this.isShow = val
      }
    }
  }
}
</script>

<style lang="less" scoped>
.modal-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  overflow: hidden;
  .modal-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.4);
    z-index: 90;
  }
  .modal-main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    margin: auto;
    width: 430px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, .1);
  }
}
</style>

