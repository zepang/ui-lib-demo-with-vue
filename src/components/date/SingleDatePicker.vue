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
      <table>
        <thead>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
          <th>日</th>
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
    this.generatCalendar()
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
    /**
     * 生成日历数据和初始化日历的状态
     */
    generatCalendar () {
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
      
      const tmp = lastMonthDateArr.concat(curMonthDateArr, nextMonthDateArr)
      while (tmp.length) {
        calendar.push(tmp.splice(0, 7))
      }
      this.calendar = calendar
      // 初始化状态
      this.initCalendarStatus(this.time)
    },
    initCalendarStatus (date) {
      for (let i = 0; i < this.calendar.length; i++) {
        for (let j = 0; j < this.calendar[i].length; j++) {
          if (this.calendar[i][j].date === date) {
            this.calendar[i][j].isSelected = true
          } else {
            this.calendar[i][j].isSelected = false
          }
        }
      }
    },
    selectDate (item) {
      if (item.isDisabled) return 
      this.time = item.date
      this.initCalendarStatus(item.date)
      this.$nextTick(() => {
        this.$refs.popover.hide()
      })
      this.$emit('change', item.date)
    },
    clearTime () {
      this.time = null
      this.$emit('input', null)
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
  padding: 20px;
  box-shadow: 0px 1px 10px 0px rgba(22, 24, 39, 0.08);
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
          &.disabled:hover {
            cursor: not-allowed;
          }
        }
      }
    }
  }
}

</style>



