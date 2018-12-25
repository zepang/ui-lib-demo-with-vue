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
      <span v-if="clearable && (startTime || endTime)" class="error-icon" @click.stop="clearTime">
        <i class="iconfont icon-error"></i>
      </span>
    </div>
    <div slot="content" class="base-calendar__wrapper">
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
      <div class="btn-groups">
        <button @click="selectRangeDate">确定</button>
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
  inject: ['injectProps'],
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
  components: {
    Popover
  },
  created () {
    if (this.value[0]) this.startTime = dayjs(this.value[0]).format(this.format)
    if (this.value[1]) this.endTime = dayjs(this.value[1]).format(this.format)
    this.initList()
    console.log(this)
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

      this.initListStatus()
    },
    initListStatus () {
      if (this.startTime) {
        this.calendar.find(item => item.date === this.startTime).isSelected = true
      }
      if (this.endTime) {
        this.calendar.find(item => item.date === this.endTime).isSelected = true
      }
      this.changeHover()
    },
    getTime (value) {
      if (value.isDisabled) return 
      let dateObj = this.calendar.find(item => item.date === value.date)
      dateObj.isSelected = true

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

      this.calendar = this.calendar.map(item => {
        item.isSelected = false
        return item
      })

      this.startTime && (this.calendar.find(item => item.date === this.startTime).isSelected = true)
      this.endTime && (this.calendar.find(item => item.date === this.endTime).isSelected = true)

      // 改变范围内的 li 样式
      this.changeHover()

      console.log('startTime:', this.startTime && this.startTime);
      console.log('endTime:', this.endTime && this.endTime);
    },
    changeHover (hoverDate) {
      if (!this.startTime && !this.endTime) return
      let prev = this.startTime
      let next = this.endTime

      this.calendar = this.calendar.map(item => {
        if (dayjs(item.date).isAfter(dayjs(this.startTime)) && dayjs(item.date).isBefore(dayjs(this.endTime))) {
          item.isHover = true
        } else {
          item.isHover = false
        }
        return item
      })
    },
    // 选择时间
    selectRangeDate () {
      if (!this.startTime && !this.endTime) return 
      
      this.$emit('change', [this.startTime, this.endTime])
      this.$refs.popover.hide()
    },
    // 取消选择
    cancel () {
      this.startTime = dayjs(this.value[0]).format(this.format) || null
      this.endTime = dayjs(this.value[1]).format(this.format) || null
      // 重置状态
      this.initListStatus()
      this.$refs.popover.hide()
    },
    setTime (value) {
      this.time = value.date
      this.$nextTick(() => {
        this.$refs.popover.hide()
      })
    },
    clearTime () {
      this.startTime = null
      this.endTime = null

      this.$emit('input', [])
    }
  },
  // watch: {
  //   value (val) {
  //     if (val[0]) this.startTime = dayjs(this.value[0]).format(this.format)
  //     if (val[1]) this.endTime = dayjs(this.value[1]).format(this.format)
  //   }
  // }
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
}

</style>

