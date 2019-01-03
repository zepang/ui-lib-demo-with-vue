<template>
  <popover ref="popover">
    <div slot="reference" class="date-picker__input" :style="{borderRadius: picker.radius}" >
      <span class="date-icon">
        <i class="iconfont icon-date-empty"></i>
      </span>
      <div class="input-group">
        <input 
        :value="picker.time[0]"
        placeholder="请选择日期"
        @blur="handleBlur"
        type="text" >
        <span class="range-separator">{{picker.rangeSeparator}}</span>
        <input 
        :value="picker.time[1]"
        placeholder="请选择日期"
        type="text" >
      </div>
      <span v-if="picker.clearable && picker.time.length === 2" class="error-icon" @click.stop="clearTime">
        <i class="iconfont icon-error"></i>
      </span>
    </div>
    <table-date-panel
      v-if="picker.singleCalendar"
      slot="content"
      ref="tableDatePanel"
      v-model="calendarDate"></table-date-panel>
    <div class="calendar-list_wrapper" v-else slot="content">
      <ul class="calendar-list" >
        <li class="calendar-panel" v-for="(item, index) in calendarDate" :key="index">
          <table-date-panel
          ref="tableDatePanel"
          v-model="calendarDate[index]"></table-date-panel>
        </li>
      </ul>
    </div>
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
  created () {
    if (this.picker.singleCalendar) {
      this.calendarDate = dayjs()
    } else {
      this.calendarDate = [dayjs(), dayjs().add(1, 'month')]
    }
  },
  components: {
    Popover,
    TableDatePanel
  },
  methods: {
    handleBlur (e) {
      console.log(e.target.value);
    },
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

.calendar-list__wrapper {
  position: relative;
}

.calendar-list {
  width: 200%;
  position: absolute;
  margin: 0;
  padding: 0;
  box-shadow: 0px 1px 10px 0px rgba(22, 24, 39, 0.08);
  .calendar-panel {
    width: 50%;
    display: inline-block;
    list-style: none;
  }
}
</style>

