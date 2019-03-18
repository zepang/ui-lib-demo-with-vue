<template>
  <div>
    <transition name="fade-overlay">
      <div class="lai-modal-overlay" v-if="overlay && isShow"></div>
    </transition>
    <transition name="fade-modal">
      <div class="lai-modal" v-if="isShow" v-click-outside="hide" style="min-width: 560px; min-height: 280px;">
        <button class="modal-close close-button" @click="hide">x</button>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import clickOutside from '../../directives/click-outside'
export default {
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
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
      isShow: this.value,
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

.modal-close {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 12px;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px 7px 7px;
  cursor: pointer;
  color: #fff;
  border: 0;
  outline: none;
  background: #e74c3c;
  &:hover {
    background: #c0392b;
  }
}

.lai-modal-overlay {
  position: fixed;
  will-change: transform;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
}

.lai-modal {
  position: absolute;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80vw;
  padding: 30px 20px;
  border-radius: 4px;
  background-color: #fff;
  &.modal-anchored {
    top: 2vh;
    transform: translate(-50%, 0);
  }
}

.fade-overlay-enter, .fade-overlay-leave-to {
  display: block;
  opacity: 0;
}
.fade-overlay-enter-active, .fade-overlay-leave-active {
  transition: 500ms opacity 500ms ease;
}
.fade-overlay-enter-to, .fade-overlay-leave {
  display: block;
  opacity: 1;
}

.fade-modal-enter, .fade-modal-leave-to {
  top: -300vh;
}
.fade-modal-enter-active {
  transition: 500ms top 500ms ease;
}
.fade-modal-leave-active {
  transition: 500ms top ease;
}
.fade-modal-enter-to, .fade-modal-leave {
  top: 50%;
  opacity: 1;
}
</style>

