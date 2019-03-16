<template>
  <popover width="200px" ref="popover">
    <div class="date-picker__input" :style="{borderRadius: picker.radius}" slot="reference">
      <span class="date-icon">
        <i class="iconfont icon-date-empty"></i>
      </span>
      <div class="input-group">
        <input 
        v-model="picker.time"
        placeholder="请选择日期"
        type="text" readonly>
      </div>
      <span v-if="picker.clearable && picker.time" class="error-icon" @click.stop="clearTime">
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
import TableDatePanel from './TableDatePanel'
export default {
  name: 'SingleDatePicker',
  inject: ['picker'],
  provide () {
    return { popover: this.$refs.popover }
  },
  data () {
    return {
      calendarDate: dayjs(),
      isShow: false,
      selectedDate: null,
      dayjs: dayjs,
      calendar: []
    }
  },
  components: {
    Popover,
    TableDatePanel
  },
  methods: {
    clearTime () {
      this.picker.time = null
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
  box-shadow: 0px 0px 1px 0px #999999;
  font-size: 14px;
  cursor: default;
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
    input {
      display: inline-block;
      width: 100%;
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

.base-calendar__wrapper {
  // width: 280px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 1px 10px 0px rgba(22, 24, 39, 0.08);
  font-size: 0;
  user-select: none;
  .calendar-title__wrapper {
    width: 100%;
    position: relative;
    .prev, .next {
      position: absolute;
      top: 0;
      cursor: pointer;
    }
    .prev {
      left: 0;
    }
    .next {
      right: 0;
    }
    .calendar-title {
      font-size: 16px;
      line-height: 1;
      font-weight: 600;
      text-align: center;
    }
  }
  table {
    width: 100%;
    thead {
      th {
        padding: 10px;
        font-size: 14px;
      }
    }
    tbody {
      tr {
        td {
          padding: 3%;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          &.selected {
            border-radius: 50%;
            background-color: #535ef5;
            color: #ffffff;
          }
          &.disabled {
            color: #c4c1c1;
          }
          &:not(.disabled):not(.selected):hover {
            background-color: #eeeeee;
          }
          &.disabled:hover {
            cursor: not-allowed;
          }
        }
      }
    }
  }
}

</style>



