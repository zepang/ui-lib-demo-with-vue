<template>
  <transition name="slide">
    <div class="alert">
      <div class="alert-content">
        <span class="iconfont icon-icon_discovery_fill" :class="notice.type"></span>
        <span>{{notice.content}}</span>
        <span class="close iconfont icon-baseline-close-px"></span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    notice: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.alert-content{
  display: inline-block;
  position: relative;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  margin-bottom: 8px;
  span {
    display: inline-block;
    vertical-align: middle;
  }
  .iconfont {
    vertical-align: -3px;
    margin-right: .4em;
  }
  .close {
    display: inline-block;
    height: 20px;
    line-height: 16px;
    margin-left: 10px;
    vertical-align: -4px;
    color: #999999;
  }
}

.slide-enter, .slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: .25s cubic-bezier(0.4, 0, 1, 1);
}
.slide-leave-active  {
  transition-delay: 0s !important;
}
.slide-enter-to, .slide-leave {
  transform: translateY(0%);
  opacity: 1;
}

.iconfont {
  &.success {
    color: #2ddc2d;
  }
  &.error {
    color: #f30e0e;
  }
  &.info {
    color: #0eb2f3;
  }
  &.warn {
    color: #f3ce0e;
  }
}
</style>


