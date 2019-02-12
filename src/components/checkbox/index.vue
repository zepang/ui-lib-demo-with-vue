<template>
  <label for="checkbox" class="lai-checkbox__wrapper" :class="{'lai-checkbox__checked': isChecked}">
    <span class="lai-checkbox__icon iconfont" :class="{'icon-check': isChecked}"></span>
    <input hidden type="checkbox" class="lai-checkbox__input" :checked="isChecked" id="checkbox" @input="handleInput">
    <span class="lai-checkbox__label"><slot>复选框</slot></span>
  </label>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isChecked: this.value || false
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.checked)
    }
  },
  watch: {
    value (val) {
      this.isChecked = val
    }
  }
}
</script>

<style lang="less" scoped>
.lai-checkbox__wrapper {
  display: inline-block;
  user-select: none;
  cursor: pointer;
  font-size: 14px;
  &.lai-checkbox__checked {
    .lai-checkbox__icon {
      background-color: #535ef5;
    }
  }
  .lai-checkbox__label, .lai-checkbox__icon {
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  .lai-checkbox__icon {
    width: 20px;
    box-shadow: 0px 0px 1px 0px #999999;
    background-color: #fff;
    border-radius: 4px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
  .lai-checkbox__input {
    height: 20px;
  }
}
</style>


