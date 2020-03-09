<template>
  <transition name="slide">
    <div class="alert">
      <div class="alert-content">
        <span>{{notice.content}}</span>
        <span class="close">x</span>
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
}
.close {
  display: inline-block;
  height: 20px;
  line-height: 16px;
  margin-left: 10px;
  vertical-align: middle;
  color: #999999;
}

.slide-enter, .slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: transform .25s cubic-bezier(0.4, 0, 1, 1), opacity .1s ease-in;
}
.slide-leave-active  {
  transition-delay: 0s !important;
}
.slide-enter-to, .slide-leave {
  transform: translateY(0%);
  opacity: 1;
}
</style>


