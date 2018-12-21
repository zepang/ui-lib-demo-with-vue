# 日期选择器

## 单个日期选择器

组件的拆分： 

* DatePickerInput 通常是选择器展示的部分 
* BaseCalendar 日历列表

下面的是组件代码， 我现在贴出来得代码是处在能实现基本功能的代码，没有任何整理。

为了方便日期的格式化和取值，我这里使用 dayjs 来操作日期，用法基本和 monment 是一样的但是包小很多，不想引入三方库的可以直接自己写工具函数。

~~~vue
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
    // 生成日历列表数据
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
.base-calendar__wrapper {
  position: absolute;
  top: 110%;
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
~~~
BaseCalendar组件主要在于生成日历列表，其他的逻辑都没有什么。目前用的是一维数组，实际上想试试用二维数组和table来布局日历。

~~~vue
<template>
  <div class="date-picker__input" >
    <span class="date-icon">
      <i class="iconfont icon-date-empty"></i>
    </span>
    <input 
    v-model="time"
    :style="{borderRadius: radius}" 
    placeholder="请选择日期"
    type="text" readonly>
    <span v-if="clearable && time" class="error-icon" @click.stop="clearTime">
      <i class="iconfont icon-error"></i>
    </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'DatePickerInput',
  data () {
    return {
      dayjs: dayjs,
      time: this.value.format('YYYY-MM-DD') || dayjs()
    }
  },
  props: {
    value: {
      type: Object,
      default: dayjs()
    },
    radius: {
      type: String,
      default: '4px'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clearTime () {
      this.time = null
      this.$emit('input', null)
    }
  },
  watch: {
    value (val) {
      if (val) this.time = val.format('YYYY-MM-DD')
    }
  }
}
</script>
DatePickerInput 的组件功能比较简单。

<style lang="less">
.date-picker__input {
  position: relative;
  width: 100%;
  font-size: 14px;
  cursor: default;
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
  input {
    display: inline-block;
    width: 100%;
    border: 0;
    font-size: 14px;
    line-height: 1;
    padding: 11px 40px;
    box-sizing: border-box;
    box-shadow: 0px 0px 1px 0px #999999;
    cursor: default;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 1px 0px #535ef5 ;
    }
    &:hover {
      box-shadow: 0px 0px 1px 0px #535ef5 ;
    }
  }
}
</style>

~~~

~~~vue
<template>
  <div class="date-picker__wrapper">
    <date-picker-input radius="19px" :clearable="true" @click.native="isShow = true" v-model="time"></date-picker-input>
    <transition name="fade">
      <base-calendar v-if="isShow" @on-change="setTime" v-click-outside="hideSelf"></base-calendar>
    </transition>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import BaseCalendar from './components/BaseCalendar'
import DatePickerInput from './components/DatePickerInput'
import clickOutside from '../../directives/click-outside'
export default {
  data () {
    return {
      isShow: false,
      time: dayjs()
    }
  },
  directives: {
    'click-outside': clickOutside
  },
  components: {
    BaseCalendar,
    DatePickerInput
  },
  methods: {
    hideSelf () {
      this.isShow = false
    },
    setTime (value) {
      this.time = value.date
      this.$nextTick(() => {
        this.isShow = false
      })
    }
  }
}
</script>

<style lang="less">
.date-picker__wrapper {
  position: relative;
  width: 200px;
  margin: 0 auto;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-active, .fade-leave-active {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.fade-enter-to, .fade-leave {
  opacity: 1;
  transform: translateY(0px);
}
</style>
~~~

最后将两个组件组合，并且通过props和$emit$on来进行组件通信就好了。

实际上我写完这个组件发现下拉菜单的显示和隐藏不就是一个popover的功能吗？因为后面的范围选择日期组件也会用到popover的功能，所以我先去实现popover组件，具体的实现看popover的文档。



