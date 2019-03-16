<template>
  <div>
    <p>{{time}}</p>
    <div style="width: 300px; margin-top: 20px; display: inline-block">
      <lai-date-picker v-model="time" format="YYYY-MM-DD" type="dateRange" @change="handleChange"></lai-date-picker>
    </div>
  </div>
</template>
<script>
import LaiDatePicker from './date'
import LaiButton from './lai-button'
export default {
  components: { LaiDatePicker, LaiButton },
  data () {
    return {
      time: [new Date(), new Date()]
    }
  },
  methods: {
    handleChange (val) {
      console.log('app:', val)
    }
  }
}
</script>
