<template>
  <div class="date-picker__input">
    <span class="date-icon"></span>
    <input 
    v-model="time"
    :style="{borderRadius: radius}" 
    type="text" readonly>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'DatePickerInput',
  data () {
    return {
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
    }
  },
  watch: {
    value (val) {
      this.time = val.format('YYYY-MM-DD')
    }
  }
}
</script>


<style lang="less">
.date-picker__input {
  input {
    display: inline-block;
    width: 100%;
    border: 0;
    font-size: 14px;
    line-height: 1;
    padding: 11px 16px;
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

