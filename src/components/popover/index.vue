<template>
  <div class="popover__wrapper" :style="{width: width}">
    <div class="reference" @click="isShow = true">
      <slot name="reference">
      </slot>
    </div>
    <transition name="fade">
      <div class="content" v-if="isShow" v-click-outside="hideSelf">
        <slot name="content">{{content}}</slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
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
    hideSelf () {
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
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-active, .fade-leave-active {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: translateY(0px);
}
</style>

