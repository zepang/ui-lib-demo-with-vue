<template>
  <label class="lai-checkbox__wrapper" 
    :class="{'lai-checkbox__checked': isChecked, 'lai-checkbox_disabled': disabled}">
    <span class="lai-checkbox__icon iconfont" :class="{'icon-check': isChecked}"></span>
    <input 
      v-if="group"
      :value="label"
      hidden :disabled="disabled" 
      type="checkbox" 
      class="lai-checkbox__input" 
      v-model="model"
      @change="handleInput">
    <input 
      v-else
      hidden :disabled="disabled" 
      type="checkbox" 
      class="lai-checkbox__input" 
      :checked="isChecked" 
      @change="handleInput">
    <span class="lai-checkbox__label"><slot>{{label}}</slot></span>
  </label>
</template>
<script>
/**
 * 在写复选框的时候发现一个问题，用change监听input，事件v-model绑定的值更新之后触发，
 * 而用input监听，则会在v-model绑定的值更新之前触发
 */
import { findParent } from '../../utils'
export default {
  name: 'lai-checkbox',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: [Boolean, String, Number],
      default: false
    },
    label: {
      type: [Boolean, String, Number],
      default: ''
    }
  },
  data () {
    return {
      parent: null,
      model: [],
      group: false,
      isChecked: this.value || false
    }
  },
  mounted () {
    this.checkGroup()
  },
  methods: {
    checkGroup () {
      this.parent = findParent(this, 'lai-checkbox-group')
      if (this.parent) {
        this.group = true
      }
    },
    handleInput (e) {
      if (this.disabled) {
        return false
      }
      if (this.group) {
        this.parent.updateModel(this.model)
      } else {
        this.$emit('input', e.target.checked)
        this.$emit('on-change', e.target.checked)
      }
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
  &.lai-checkbox_disabled {
    color: #999999;
    .lai-checkbox__icon {
      background-color: #eeeeee;
      color: #999999;
    }
  }
  .lai-checkbox__label, .lai-checkbox__icon {
    height: 18px;
    display: inline-block;
    vertical-align: middle;
  }
  .lai-checkbox__icon {
    width: 18px;
    box-shadow: 0px 0px 1px 0px #999999;
    background-color: #fff;
    border-radius: 4px;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
  }
  .lai-checkbox__input {
    height: 18px;
  }
}
</style>


