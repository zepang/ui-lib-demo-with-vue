<template>
  <popover width="200px" ref="popover">
    <div class="date-picker__input" :style="{borderRadius: radius}" slot="reference">
      <span class="date-icon">
        <i class="iconfont icon-date-empty"></i>
      </span>
      <div class="input-group">
        <input 
        v-model="time"
        placeholder="请选择日期"
        type="text" readonly>
      </div>
      <span v-if="clearable && time" class="error-icon" @click.stop="clearTime">
        <i class="iconfont icon-error"></i>
      </span>
    </div>
    <div class="base-calendar__wrapper" slot="content">
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
          <span>{{dayjs(item.date).date()}}</span>
        </li>
      </ul>
    </div>
  </popover>
</template>

<script>
import dayjs from 'dayjs'
import Popover from '../popover'
import clickOutside from '../../directives/click-outside'
export default {
  name: 'SingleDatePicker',
  inject: ['injectProps'],
  data () {
    return {
      isShow: false,
      time: null,
      selectedDate: null,
      dayjs: dayjs,
      calendar: []
    }
  },
  created () {
    if (this.value) this.time = dayjs(this.value).format(this.format)
    this.initList()
  },
  computed: {
    value () {
      return this.injectProps.value
    },
    format () {
      return this.injectProps.format
    },
    rangeSeparator () {
      return this.injectProps.rangeSeparator
    },
    radius () {
      return this.injectProps.radius
    },
    clearable () {
      return this.injectProps.clearable
    }
  },
  directives: {
    'click-outside': clickOutside
  },
  components: {
    Popover
  },
  methods: {
    clearTime () {
      this.time = null
      this.$emit('input', null)
    },
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
          date: dayjs(`${dayjs().year()}-${dayjs().month()}-${date}`).format(this.format)
        })
        date = date - 1
      }

      for (let i = 1; i <= lastDateOfCurMonth; i++) {
        curMonthDateArr.push({
          ...dateObj,
          isDisabled: false,
          date: dayjs(`${dayjs().year()}-${dayjs().month() + 1}-${i}`).format(this.format),
        })
      }

      for (let i = 1; i <= 42 - startDayOfCurMonth - lastDateOfCurMonth + 1; i++) {
        nextMonthDateArr.push({
          ...dateObj,
          isDisabled: true,
          date: dayjs(`${dayjs().year()}-${dayjs().month() + 2}-${i}`).format(this.format)
        })
      }
      this.calendar = lastMonthDateArr.concat(curMonthDateArr, nextMonthDateArr)

      // 初始化日历状态
      this.initCalendarStatus()
    },
    initCalendarStatus () {
      if (this.time) this.changeCalendarStatus(this.time)
    },
    getTime (value) {
      if (value.isDisabled) return 
      this.selectedDate = value.date
      this.time = value.date
      this.changeCalendarStatus(this.time)
      this.$emit('change',  value.date)
      this.$refs.popover.hide()
    },
    changeCalendarStatus (date) {
      this.calendar = this.calendar.map(item => {
        if (item.date === date) {
          item.isSelected = true
        } else {
          item.isSelected = false
        }
        return item
      })
    },
    setTime (value) {
      this.time = value.date
      this.$nextTick(() => {
        this.$refs.popover.hide()
      })
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
  width: 280px;
  padding: 20px;
  box-shadow: 0px 1px 10px 0px rgba(22, 24, 39, 0.08);
  font-size: 0;
  user-select: none;
  .weekDaysTitle {
    border-bottom: 1px solid #f5f5f5;
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
    transition: background-color 1s;
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
}

</style>



