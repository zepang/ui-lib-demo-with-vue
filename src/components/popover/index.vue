<template>
  <div class="popover__wrapper">
    <div class="reference" @click="show">
      <slot name="reference">
      </slot>
    </div>
    <transition name="fade">
      <div class="content" v-if="isShow" v-click-outside="hide">
        <slot name="content">{{content}}</slot>
      </div>
    </transition>
  </div>
</template>

<script>
import clickOutside from '../../directives/click-outside'
export default {
  data () {
    return {
      isShow: false
    }
  },
  directives: {
    'click-outside': clickOutside
  },
  props: {
    width: {
      type: String,
      default: '200px'
    },
    content: {
      type: [String, Number],
      default: 'content'
    }
  },
  methods: {
    show () {
      this.isShow = !this.isShow
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.popover__wrapper {
  position: relative;
  .content {
    position: absolute;
    top: 110%;
    z-index: 999;
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-active, .fade-leave-active {
  transition-property: transform, opacity;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}
.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: translateY(0px);
}
</style>

