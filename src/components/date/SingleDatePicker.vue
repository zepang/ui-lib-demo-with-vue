<template>
  <popover width="200px" ref="popover">
    <div class="date-picker__input" :style="{borderRadius: radius}" slot="reference">
      <span class="date-icon">
        <i class="iconfont icon-date-empty"></i>
      </span>
      <div class="input-group">
        <input 
        v-model="picker.time"
        placeholder="请选择日期"
        type="text" readonly>
      </div>
      <span v-if="clearable && picker.time" class="error-icon" @click.stop="clearTime">
        <i class="iconfont icon-error"></i>
      </span>
    </div>
    <!-- <div class="base-calendar__wrapper" slot="content">
      <div class="calendar-title__wrapper">
        <div class="prev">
          <i class="iconfont icon-ico-two-left-arrow" @click="calendarDate = calendarDate.subtract(1, 'year')"></i>
          <i class="iconfont icon-arrowleftb" @click="calendarDate = calendarDate.subtract(1, 'month')"></i>
        </div>
        <h3 class="calendar-title">{{calendarDate.year()}}年{{calendarDate.month() + 1}}月</h3>
        <div class="next">
          <i class="iconfont icon-arrowright" @click="calendarDate = calendarDate.add(1, 'month')"></i>
          <i class="iconfont icon-ico-two-right-arrow" @click="calendarDate = calendarDate.add(1, 'year')"></i>
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
              @click="confirm(column)"
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
    </div> -->
    <table-date-panel 
      slot="content" 
      ref="tableDatePanel"
      v-model="calendarDate"
      :format="format"></table-date-panel>
  </popover>
</template>

<script>
import dayjs from 'dayjs'
import Popover from '../popover'
import clickOutside from '../../directives/click-outside'
import TableDatePanel from './components/TableDatePanel'
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
  directives: {
    'click-outside': clickOutside
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



