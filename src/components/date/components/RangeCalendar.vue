<template>
  <div class="base-calendar__wrapper">
    <ul class="weekDaysTitle">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>
    <ul class="days">
      <li 
        class="day"
        v-for="item in calendar" 
        @click="getTime(item)" 
        :class="[{
          'selected': item.isSelected,
          'hover': item.isHover,
          'disabled': item.isDisabled
        }]">
        <span>{{item.date.date()}}</span>
      </li>
    </ul>
    <div class="btn-groups">
      <button @click="selectRangeDate">确定</button>
      <button>取消</button>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
function createDateObj (date) {
  return {
    date,
    isSelected: false,
    isHover: false,
    isDisabled: false
  }
}
export default {
  data () {
    return {
      startTime: this.value[0] && dayjs(this.value[0]) || null,
      endTime: this.value[1] && dayjs(this.value[1]) || null,
      selectedDate: null,
      dayjs: dayjs,
      calendar: []
    }
  },
  inject: ['value'],
  created () {
    this.initList()
  },
  methods: {
    initList () {
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

      let lastDateOfCurMonth = dayjs().endOf('month').date()
      let lastDateOfLastMonth = dayjs().subtract(1, 'month').endOf('month').date()
      // 即为上个月的在 date-table 中展示的天数
      let startDayOfCurMonth = dayjs().startOf('month').day()

      for (let i = 1, date = lastDateOfLastMonth; i < startDayOfCurMonth; i++) {
        lastMonthDateArr.unshift({
          ...dateObj,
          isDisabled: true,
          date: dayjs(`${dayjs().year()}-${dayjs().month()}-${date}`)
        })
        date = date - 1
      }

      for (let i = 1; i <= lastDateOfCurMonth; i++) {
        curMonthDateArr.push({
          ...dateObj,
          isDisabled: false,
          date: dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${i}`),
        })
      }

      for (let i = 1; i <= 42 - startDayOfCurMonth - lastDateOfCurMonth + 1; i++) {
        nextMonthDateArr.push({
          ...dateObj,
          isDisabled: true,
          date: dayjs(`${dayjs().year()}-${dayjs().month() + 2}-${i}`)
        })
      }
      this.calendar = lastMonthDateArr.concat(curMonthDateArr, nextMonthDateArr)

      this.initListStatus()
    },
    initListStatus () {
      if (this.startTime) {
        debugger
        this.calendar.find(item => item.date.format('YYYY_MM_DD') === this.startTime.format('YYYY_MM_DD')).isSelected = true
      }
      if (this.endTime) {
        this.calendar.find(item => item.date.format('YYYY_MM_DD') === this.endTime.format('YYYY_MM_DD')).isSelected = true
      }
      this.changeHover()
    },
    getTime (value) {
      if (value.isDisabled) return 
      let dateObj = this.calendar.find(item => item.date === value.date)
      dateObj.isSelected = true

      if (this.startTime && this.startTime.isBefore(dateObj.date)) {
        this.endTime = dateObj.date

      } else if (this.startTime && this.startTime.isAfter(dateObj.date)) {
        this.endTime = this.startTime
        this.startTime = dateObj.date
      } else if (this.endTime && this.endTime.isBefore(dateObj.date)) {
        this.startTime = this.endTime
        this.endTime = dateObj.date
      } else if (this.endTime && this.endTime.isAfter(dateObj.date)) {
        this.startTime = dateObj.date
      } else {
        this.startTime = dateObj.date
      }

      this.calendar = this.calendar.map(item => {
        item.isSelected = false
        return item
      })

      this.startTime && (this.calendar.find(item => item.date.formate('YYYY-MM-DD') === this.startTime.formate('YYYY-MM-DD')).isSelected = true)
      this.endTime && (this.calendar.find(item => item.date.formate('YYYY-MM-DD') === this.endTime.formate('YYYY-MM-DD')).isSelected = true)

      // 改变范围内的 li 样式
      this.changeHover()

      console.log('startTime:', this.startTime && this.startTime);
      console.log('endTime:', this.endTime && this.endTime);
    },
    changeHover (hoverDate) {
      if (!this.startTime && !this.endTime) return
      let prev = this.startTime
      let next = this.endTime
      if (this.startTime.isAfter(this.endTime)) {
        prev = this.endTime
        next = this.startTime
      }

      this.calendar = this.calendar.map(item => {
        if (item.date.isAfter(prev) && item.date.isBefore(next)) {
          item.isHover = true
        } else {
          item.isHover = false
        }
        return item
      })
    },
    selectRangeDate () {
      if (!this.startTime && !this.endTime) return 
      console.log([this.startTime.format('YYYY-MM-DD'), this.endTime.format('YYYY-MM-DD')])
      // this.$emit('on-change', [this.startTime.format('YYYY-MM-DD'), this.endTime.format('YYYY-MM-DD')])
    }
  }
}
</script>

<style lang="less" scoped>
.base-calendar__wrapper {
  width: 280px;
  padding: 20px;
  box-shadow: 0px 1px 10px 0px rgba(22, 24, 39, 0.08);
  font-size: 0;
  user-select: none;
  .weekDaysTitle {
    border-bottom: 1px solid #f5f5f5;
  }
}
ul {
  width: 100%;
  margin: 0;
  padding: 0;
  user-select: none;
}
ul li {
  list-style-type: none;
  display: inline-block;
  width: 40px;
  height: 40px;
  padding: 5px;
  line-height: 30px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  cursor: default;
  border-radius: 50%;
  transition: background-color 1.5s;
  &:not(.disabled):hover {
    background-color: #eeeeee;
    color: #535ef5;
    cursor: pointer;
  }
  &.hover:not(.disabled) {
    background-color: #eeeeee;
    cursor: pointer;
  }
  &.disabled:hover {
    cursor: not-allowed;
  }
  span {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

li.day.selected {
  background-color: #eeeeee;
  span {
    background-color: #535ef5 !important;
    box-shadow: 2px 1px 10px 0px rgba(22, 24, 39, 0.28);
    color: #ffffff;
  }
}

li.day.disabled {
  color: #c4c1c1;
}

.btn-groups {
  text-align: right;
  button {
    display: inline-block;
    margin-left: 10px;
  }
}

</style>


