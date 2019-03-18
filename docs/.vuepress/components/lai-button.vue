<template>
  <button :class="btnCls" :disabled="disabled"><slot></slot></button>
</template>
<script>
export default {
  created () {
    console.log(process.env.NODE_ENV)
  },
  props: {
    size: {
      validator: val => {
        return ['large', 'middle', 'small'].indexOf(val) !== -1
      },
      default: 'middle'
    },
    type: {
      validator: val => {
        return ['ok', 'cancel'].indexOf(val) !== -1
      },
      default: 'ok'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    radius: {
      type: ''
    }
  },
  computed: {
    btnCls () {
      return ['lai-btn', `lai-btn__${this.type}`, `lai-btn__${this.size}`]
    }
  }
}
</script>

<style lang="less" scoped>
button.lai-btn { 
  padding: 0; 
  border: none; 
  background-color: transparent; 
  color: inherit; 
  font: inherit; 
  cursor: pointer;  
}
.lai-btn {
  display: inline-block;
  appearance: none;
  border: 0px;
  box-sizing: border-box;
  background-color: transparent; 
  color: inherit; 
  font: inherit; 
  letter-spacing: 0px;
  line-height: 1;
  cursor: pointer;
  &[disabled] {
    color: #999999 !important;
    background-color: #f5f5f5 !important;
    box-shadow: 0px 0px 1px #cccccc;
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }
  &.lai-btn__ok {
    background-color: #097cff;
    color: #ffffff;
    &:hover {
      background-color: #0966ff;
    }
  }
  &.lai-btn__cancel {
    background-color: #eeeeee;
    color: #333333;
    &:hover {
      background-color: #eaf6fe;
      color: #0966ff;
    }
  }
  &.lai-btn__large {
    padding: 14px 56px;
    font-size: 14px;
  }
  &.lai-btn__middle {
    padding: 11px 31px;
    font-size: 14px;
  }
  &.lai-btn__small {
    font-size: 12px;
    padding: 8px 18px;
  }
}
</style>