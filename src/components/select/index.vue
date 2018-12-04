<template>
  <div class="lai-select__wrapper" style="width: 200px">
    <div class="lai-select__selection" @click="isShow = !isShow">
      <span class="lai-select__placeholder">{{selected.label || selected || '请选择'}}</span>
      <i class="iconfont icon-previewleft lai-select__icon"></i>
    </div>
    <div class="lai-select__options" v-show="isShow && options.length">
      <div 
        class="lai-select__option" 
        v-for="(option, index) in options" 
        :key="index"
        @click="handleSelected(option)">
          {{option.label}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      selected: this.value
    }
  },
  props: {
    value: {
      type: [Array,String,Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    // 控制多选变量
    multiple: {
      type: Boolean,
      default: false
    }
  },
  beforeMount () {
    // 初始化 selected 的值
    this.getSelected()
  },
  methods: {
    getSelected () {
      if (this.options.toString().indexOf('[object Object]') !== -1) {
        this.selected = this.options.find(({value}) => value === this.value)
      } else {
        this.selected = this.value
      }
    },
    handleSelected (selected) {
      let value 
      if (typeof selected === 'object') {
        value = selected.value
      } else {
        value = selected
      }
      this.selected = selected
      this.$emit('input', value)
      this.$emit('change', value)
      this.isShow = false
    }
  },
  watch: {
    value (val) {
      this.getSelected()
    }
  }
}
</script>

<style lang="less" scoped>
.lai-select__wrapper {
  width: 100%;
  position: relative;
  .lai-select__selection {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    position: relative;
    border: 1px solid #dcdee2;
    font-size: 12px;
    &:focus {
      border: 1px solid red;
    }
    .lai-select__placeholder {
      line-height: 30px;
      color: #c5c8ce;
    }
    .lai-select__icon {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%) rotateZ(-90deg);
      color: #c5c8ce;
    }
  }
  .lai-select__options {
    position: absolute;
    z-index: 99;
    width: 100%;
    top: 32px;
    padding: 4px 0;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0px 1px 8px -2px rgba(0, 0, 0, 0.2);
    user-select: none;
    .lai-select__option {
      padding: 7px 10px;
      font-size: 12px;
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
