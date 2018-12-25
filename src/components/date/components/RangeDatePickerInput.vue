<template>
  <div class="date-picker__input" :style="{borderRadius: radius}" >
    <span class="date-icon">
      <i class="iconfont icon-date-empty"></i>
    </span>
    <div class="input-group">
      <input 
      v-model="startTime"
      placeholder="请选择日期"
      type="text" readonly>
      <span class="range-separator">{{rangeSeparator}}</span>
      <input 
      v-model="endTime"
      placeholder="请选择日期"
      type="text" readonly>
    </div>
    <span v-if="clearable && (startTime || endTime)" class="error-icon" @click.stop="clearTime">
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
      startTime:  dayjs(this.value[0]).format(this.format) || null,
      endTime:  dayjs(this.value[1]).format(this.format) || null
    }
  },
  inject: ['value', 'format'],
  props: {
    rangeSeparator: {
      type: String,
      default: '-'
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
  min-width: 260px !important;
  box-shadow: 0px 0px 1px 0px #999999;
  font-size: 14px;
  cursor: default;
  user-select: none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 1px 0px #535ef5 ;
  }
  &:hover {
    box-shadow: 0px 0px 1px 0px #535ef5 ;
  }
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
  .input-group {
    box-sizing: border-box;
    margin: 0 40px;
    font-size: 0;
    .range-separator {
      display: inline-block;
      min-width: 7px;
      vertical-align: top;
      width: 4%;
      line-height: 1;
      padding: 11px 0;
      font-size: 14px;
    }
    input {
      display: inline-block;
      width: 48%;
      min-width: 80px;
      border: 0;
      line-height: 1;
      padding: 11px 0;
      font-size: 14px;
      text-align: center;
      box-sizing: border-box;
      cursor: default;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
