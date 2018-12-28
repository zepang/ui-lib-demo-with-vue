<template>
  <popover ref="popover">
    <div slot="reference" class="date-picker__input" :style="{borderRadius: picker.radius}" >
      <span class="date-icon">
        <i class="iconfont icon-date-empty"></i>
      </span>
      <div class="input-group">
        <input 
        v-model="picker.time[0]"
        placeholder="请选择日期"
        type="text" readonly>
        <span class="range-separator">{{picker.rangeSeparator}}</span>
        <input 
        v-model="picker.time[1]"
        placeholder="请选择日期"
        type="text" readonly>
      </div>
      <span v-if="picker.clearable && picker.time.length === 2" class="error-icon" @click.stop="clearTime">
        <i class="iconfont icon-error"></i>
      </span>
    </div>
    <table-date-panel
      slot="content" 
      ref="tableDatePanel"
      v-model="calendarDate"></table-date-panel>
  </popover>
</template>

<script>
import dayjs from 'dayjs'
import Popover from '../popover'
import TableDatePanel from './components/TableDatePanel'
export default {
  name: 'RangeDatePicker',
  inject: ['picker'],
  data () {
    return {
      calendarDate: dayjs(),
      isShow: false,
      dayjs: dayjs,
      // 存储日历的时间列表
      calendar: []
    }
  },
  components: {
    Popover,
    TableDatePanel
  },
  methods: {
    clearTime () {
      this.picker.time = []
      this.$nextTick(() => {
        this.$refs.tableDatePanel.resetRangeDateCalendar()
      })
      this.picker.hide()
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

