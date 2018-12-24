<template>
  <div class="date-picker__input" >
    <span class="date-icon">
      <i class="iconfont icon-date-empty"></i>
    </span>
    <input 
    v-model="time"
    :style="{borderRadius: radius}" 
    placeholder="请选择日期"
    type="text" readonly>
    <span v-if="clearable && time" class="error-icon" @click.stop="clearTime">
      <i class="iconfont icon-error"></i>
    </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'DatePickerInput',
  data () {
    return {
      dayjs: dayjs,
      time: this.value.format('YYYY-MM-DD') || dayjs()
    }
  },
  props: {
    value: {
      type: Object,
      default: dayjs()
    },
    radius: {
      type: String,
      default: '4px'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clearTime () {
      this.time = null
      this.$emit('input', null)
    }
  },
  watch: {
    value (val) {
      if (val) this.time = val.format('YYYY-MM-DD')
    }
  }
}
</script>


<style lang="less" scoped>
.date-picker__input {
  position: relative;
  width: 100%;
  font-size: 14px;
  cursor: default;
  &:hover {
    .error-icon {
      display: inline-block;
    }
  }
  .date-icon, .error-icon, {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    i {
      color: #999999;
    }
  }
  .date-icon{
    left: 10px;
    i {
      font-size: 20px;
    }
  }
  .error-icon {
    display: none;
    right: 10px;
  }
  input {
    display: inline-block;
    width: 100%;
    border: 0;
    font-size: 14px;
    line-height: 1;
    padding: 11px 40px;
    box-sizing: border-box;
    box-shadow: 0px 0px 1px 0px #999999;
    cursor: default;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 1px 0px #535ef5 ;
    }
    &:hover {
      box-shadow: 0px 0px 1px 0px #535ef5 ;
    }
  }
}
</style>

