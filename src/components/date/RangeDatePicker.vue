<template>
  <popover ref="popover">
    <div slot="reference" class="date-picker__input" :style="{borderRadius: radius}" >
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
      <span v-if="clearable && (startTime || endTime)" class="error-icon" @click.stop="clearDate">
        <i class="iconfont icon-error"></i>
      </span>
    </div>
    <div slot="content" class="base-calendar__wrapper">
      <table>
        <thead>
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in calendar" :key="rowIndex">
            <td 
              @click="selectDate(column)"
              v-for="(column, columnIndex) in row" 
              :key="columnIndex" 
              :class="{
                'selected': column.isSelected,
                'hover': column.isHover,
                'disabled': column.isDisabled
              }"><span>{{dayjs(column.date).date()}}</span></td>
          </tr>
        </tbody>
      </table>
      <div class="btn-groups">
        <button @click="confirm">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </popover>
</template>

<script>
import dayjs from 'dayjs'
import Popover from '../popover'
export default {
  name: 'RangeDatePicker',
  inject: ['picker'],
  data () {
    return {
      isShow: false,
      dayjs: dayjs,
      startTime: null,
      endTime:  null,
      // 存储日历的时间列表
      calendar: []
    }
  },
  computed: {
    value () {
      return this.picker.value
    },
    format () {
      return this.picker.format
    },
    rangeSeparator () {
      return this.picker.rangeSeparator
    },
    radius () {
      return this.picker.radius
    },
    clearable () {
      return this.picker.clearable
    }
  },
  components: {
    Popover
  },
  created () {
    if (this.value[0]) this.startTime = dayjs(this.value[0]).format(this.format)
    if (this.value[1]) this.endTime = dayjs(this.value[1]).format(this.format)
    this.generatCalendar()
  },
  methods: {
    generatCalendar (date=dayjs()) {
      const dateObj = {
        date: null,
        isSelected: false,
        isHover: false
      }
      // 上个月在当前月日历上展示的日期集合
      const lastMonthDateArr = []
      // 当前月在日历上展示的日期集合
      const curMonthDateArr = []
      // 下个月在当前月日历上展示的日期集合
      const nextMonthDateArr = []
      // 汇总
      const calendar = []

      let curDate = dayjs(date)
      let lastDateOfCurMonth = curDate.endOf('month').date()
      let lastDateOfLastMonth = curDate.subtract(1, 'month').endOf('month').date()
      // 即为上个月的在 date-table 中展示的天数
      let startDayOfCurMonth = curDate.startOf('month').day() + 1

      for (let i = 1, date = lastDateOfLastMonth; i < startDayOfCurMonth; i++) {
        lastMonthDateArr.unshift({
          ...dateObj,
          isDisabled: true,
          date: dayjs(`${curDate.year()}-${curDate.month()}-${date}`).format(this.format)
        })
        date = date - 1
      }

      for (let i = 1; i <= lastDateOfCurMonth; i++) {
        curMonthDateArr.push({
          ...dateObj,
          isDisabled: false,
          date: dayjs(`${curDate.year()}-${curDate.month() + 1}-${i}`).format(this.format),
        })
      }

      for (let i = 1; i <= 42 - startDayOfCurMonth - lastDateOfCurMonth + 1; i++) {
        nextMonthDateArr.push({
          ...dateObj,
          isDisabled: true,
          date: dayjs(`${curDate.year()}-${curDate.month() + 2}-${i}`).format(this.format)
        })
      }
      const tmp = lastMonthDateArr.concat(curMonthDateArr, nextMonthDateArr)
      while (tmp.length) {
        calendar.push(tmp.splice(0, 7))
      }
      this.calendar = calendar
      // 初始化状态
      this.changeRangeDateSelectedStatus()
    },
    changeRangeDateSelectedStatus () {
      if (this.startTime && this.endTime) {
        this.changeSelectedStatus([this.startTime, this.endTime])
      } else if (this.startTime) {
        this.changeSelectedStatus([this.startTime])
      } else if (this.endTime) {
        this.changeSelectedStatus([this.endTime])
      }
    },
    selectDate (value) {
      if (value.isDisabled) return 
      let dateObj
      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          if (this.calendar[i][j].date === value.date) {
            dateObj = this.calendar[i][j]
          }
        }
      }

      if (this.startTime && dayjs(this.startTime).isBefore(dayjs(dateObj.date))) {
        this.endTime = dateObj.date
      } else if (this.startTime && dayjs(this.startTime).isAfter(dayjs(dateObj.date))) {
        this.endTime = this.startTime
        this.startTime = dateObj.date
      } else if (this.endTime && dayjs(this.endTime).isBefore(dayjs(dateObj.date))) {
        this.startTime = this.endTime
        this.endTime = dateObj.date
      } else if (this.endTime && dayjs(this.endTime).isAfter(dayjs(dateObj.date))) {
        this.startTime = dateObj.date
      } else {
        this.startTime = dateObj.date
      }

      this.changeRangeDateSelectedStatus()
      this.changeHoverStatus()
    },
    changeSelectedStatus (date) {
      if (!(date instanceof Array)) date = [date]
      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          if (~date.indexOf(this.calendar[i][j].date)) {
            this.calendar[i][j].isSelected = true
          } else {
            this.calendar[i][j].isSelected = false
          }
        }
      }
    },
    changeHoverStatus () {
      if (!this.startTime && !this.endTime) return

      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          if (dayjs(this.calendar[i][j].date).isAfter(dayjs(this.startTime)) && dayjs(this.calendar[i][j].date).isBefore(dayjs(this.endTime))) {
            this.calendar[i][j].isHover = true
          } else {
            this.calendar[i][j].isHover = false
          }
        }
      }
    },
    // 选择时间
    confirm () {
      if (!this.startTime && !this.endTime) return 
      
      this.$emit('change', [this.startTime, this.endTime])
      this.$refs.popover.hide()
    },
    // 取消选择
    cancel () {
      this.startTime = dayjs(this.value[0]).format(this.format) || null
      this.endTime = dayjs(this.value[1]).format(this.format) || null
      // 重置状态
      this.changeRangeDateSelectedStatus()
      this.changeHoverStatus()
      this.$nextTick(() => {
        this.$refs.popover.hide()
      })
    },
    clearDate () {
      this.startTime = null
      this.endTime = null
      this.resetRangeDateCalendar()
      this.$emit('input', [])
      this.$nextTick(() => {
        this.$refs.popover.hide()
      })
    },
    resetRangeDateCalendar () {
      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          this.calendar[i][j].isSelected = false
          this.calendar[i][j].isHover = false
        }
      }
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

.base-calendar__wrapper {
  width: 280px;
  padding: 20px;
  box-shadow: 0px 1px 10px 0px rgba(22, 24, 39, 0.08);
  background-color: #fff;
  font-size: 0;
  user-select: none;
  
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
          &.hover:not(.disabled) {
            background-color: #eeeeee;
          }
          &.disabled:hover {
            cursor: not-allowed;
          }
        }
      }
    }
  }

  .btn-groups {
    text-align: right;
    button {
      display: inline-block;
      margin-left: 10px;
    }
  }
}

</style>

