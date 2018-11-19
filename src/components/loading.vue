<template>
  <div :class="wrapperClass" ref="loadingWrapper" v-show="isShow">
    <div :class="loadingClass">
      <div :class="iconClass"></div>
      <p :class="textClass">{{loadingText}}</p>
    </div>
  </div>
</template>

<script>
const prefix = 'lai'
export default {
  data () {
    return {
      isShow: true,
      loadingText: '正在加载'
    }
  },
  mounted () {
    this.$refs.loadingWrapper.parentNode.style.position = 'relative'
  },
  computed: {
    wrapperClass () {
      return `${prefix}-loading__wrapper`
    },
    loadingClass () {
      return `${prefix}-loading`
    },
    iconClass () {
      return `${prefix}-loading__icon`
    },
    textClass () {
      return `${prefix}-loading__text`
    }
  },
  methods: {
    close () {
      this.isShow = false
    }
  }
}
</script>


<style lang="less" scoped>
@prefix: lai;
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.@{prefix}-loading__wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .1);
  .@{prefix}-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .@{prefix}-loading__icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left: 4px solid #7983ff;
      border-radius: 50%;
      animation: spin 1.2s linear infinite;
    }
    .@{prefix}-loading__text {
      color: #000;
    }
  }
}
</style>

