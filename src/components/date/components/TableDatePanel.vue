<template>
  <div class="base-calendar__wrapper">
    <div class="calendar-title__wrapper">
      <div class="prev">
        <i v-if="picker.yearControler" class="iconfont icon-ico-two-left-arrow" @click="changeCalendarDate('subtract', 1, 'year')"></i>
        <i v-if="picker.monthControler" class="iconfont icon-arrowleftb" @click="changeCalendarDate('subtract', 1, 'month')"></i>
      </div>
      <h3 class="calendar-title">{{value.year()}}年{{value.month() + 1}}月</h3>
      <div class="next">
        <i v-if="picker.monthControler" class="iconfont icon-arrowright" @click="changeCalendarDate('add', 1, 'month')"></i>
        <i v-if="picker.yearControler" class="iconfont icon-ico-two-right-arrow" @click="changeCalendarDate('add', 1, 'year')"></i>
      </div>
    </div>
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
    <div class="btn-groups" v-if="picker.btnControler">
      <button @click="confirm">确定</button>
      <button @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'TableDatePanel',
  inject: ['picker'],
  data () {
    return {
      isShow: false,
      selectedDate: null,
      dayjs: dayjs,
      calendar: [],
      time: []
    }
  },
  created () {
    this.time = []
    this.generatCalendar(this.value)
  },
  props: {
    value: {
      type: [Object, Date, Array],
      default: dayjs()
    }
  },
  methods: {
    /**
     * 生成日历数据和初始化日历的状态
     */
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
          date: dayjs(`${curDate.year()}-${curDate.month()}-${date}`).format(this.picker.format)
        })
        date = date - 1
      }

      for (let i = 1; i <= lastDateOfCurMonth; i++) {
        curMonthDateArr.push({
          ...dateObj,
          isDisabled: false,
          date: dayjs(`${curDate.year()}-${curDate.month() + 1}-${i}`).format(this.picker.format),
        })
      }

      for (let i = 1; i <= 42 - startDayOfCurMonth - lastDateOfCurMonth + 1; i++) {
        nextMonthDateArr.push({
          ...dateObj,
          isDisabled: true,
          date: dayjs(`${curDate.year()}-${curDate.month() + 2}-${i}`).format(this.picker.format)
        })
      }
      const tmp = lastMonthDateArr.concat(curMonthDateArr, nextMonthDateArr)
      while (tmp.length) {
        calendar.push(tmp.splice(0, 7))
      }
      this.calendar = calendar
      // 初始化状态
      this.changeSelectedStatus(this.picker.time)
      this.changeHoverStatus(this.picker.time)
    },
    changeSelectedStatus (date) {
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
    changeHoverStatus (time) {
      if (this.picker.type !== 'dateRange') return 
      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          let date = this.calendar[i][j]
          if (time.length === 2 && dayjs(date.date).isAfter(time[0]) && dayjs(date.date).isBefore(time[1])) {
            date.isHover = true
          } else {
            date.isHover = false
          }
        }
      }
    },
    selectDate (item) {
      if (item.isDisabled) return 
      let date = item.date
      this.time.push(date)
      if (this.picker.type === 'date' &&  this.time.length > 1) {
        this.time.shift()
      }
      if (this.picker.type === 'dateRange') {
        if (this.time.length > 2) {
          this.time.shift()
        }
        this.sortTime()
      } 
      this.changeSelectedStatus(this.time)
      this.changeHoverStatus(this.time)
      if (!this.picker.btnControler) {
        this.picker.pickDate(this.time)
      }
    },
    pickRangeDate (date) {
      let time = []
      if (this.picker.time.length) {
        this.picker.time.forEach(item => {
          if (dayjs(item).isAfter(dayjs(date))) {
            time = [date, item]
          } else {
            time = [item, date]
          }
        })
      } else {
        time = [date]
      }
      return time
    },
    resetRangeDateCalendar () {
      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          this.calendar[i][j].isSelected = false
          this.calendar[i][j].isHover = false
        }
      }
    },
    changeCalendarDate (method, val, type) {
      this.$emit('input', dayjs(this.value)[method](val, type))
    },
    sortTime () {
      let tmp, len = this.time.length
      for (let i = 0; i < len; i ++) {
        for (let j = i + 1; j < len; j ++) {
          if (dayjs(this.time[i]).isAfter(dayjs(this.time[j]))) {
            tmp = this.time[i]
            this.time[i] = this.time[j]
            this.time[j] = tmp
          }
        }
      }
    },
    confirm () {
      this.picker.pickDate(this.time)
    },
    cancel () {
      this.picker.hide()
    }
  },
  watch: {
    value (val) {
      this.generatCalendar(val)
    }
  }
}
</script>

<style lang="less" scoped>
.base-calendar__wrapper {
  padding: 10px;
  box-sizing: border-box;
  font-size: 0;
  user-select: none;
  .calendar-title__wrapper {
    width: 100%;
    position: relative;
    .prev, .next {
      position: absolute;
      top: 0;
      cursor: pointer;
      & {
        i {
          color: #c4c1c1;
        }
        i:hover {
          color: #535ef5;
        } 
      }
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
    padding-top: 10px;
    border-top: 1px dashed #e8e8e8;
    text-align: right;
    button {
      display: inline-block;
      margin-left: 10px;
      font-size: 13px;
      padding: 6px 8px;
      line-height: 1;
      appearance: none;
      border: 0;
      cursor: pointer;
      &:first-child {
        background-color: #535ef5;
        color: #ffffff;
      }
      &:last-child {
        background-color: #c4c1c1;
        color: #181818;
      }
    }
  }
}

</style>

