<template>
  <div class="date-picker__wrapper">
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
          'selected': selectedDate === item.date,
          'hover': item.isHover,
          'disabled': item.isDisabled
        }]">
        <span>{{item.date.date()}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      selectedDate: null,
      dayjs: dayjs,
      calendar: []
    }
  },
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
    },
    getTime (value) {
      if (value.isDisabled) return 
      this.selectedDate = value.date
      this.$emit('on-change', value)
    }
  }
}
</script>

<style lang="less" scoped>
.date-picker__wrapper {
  margin: 100px auto;
  width: 280px;
  padding: 30px;
  box-shadow: 0px 3px 10px 0px rgba(22, 24, 39, 0.08);
  font-size: 0;
  .weekDaysTitle {
    border-bottom: 1px solid #f5f5f5;
  }
}
ul {
  width: 100%;
  margin: 0;
  padding: 0;
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
  span {
    background-color: #535ef5 !important;
    box-shadow: 2px 1px 10px 0px rgba(22, 24, 39, 0.28);
    color: #ffffff;
  }
}

li.day.disabled {
  color: #c4c1c1;
}

</style>


