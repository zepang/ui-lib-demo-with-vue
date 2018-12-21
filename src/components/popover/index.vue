<template>
  <div class="popover__wrapper">
    <div class="reference">
      <slot name="reference">
      <button>12233</button>
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
  props: {
    content: {
      type: [String, Number],
      default: 'content'
    }
  }
}
</script>
<style lang="less" scoped>
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

