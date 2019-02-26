<template>
  <div>
    <div style="width: 300px; margin-top: 20px; display: inline-block">
      <lai-date-picker v-model="time" format="YYYY-MM-DD" type="dateRange" @change="handleChange"></lai-date-picker>
    </div>
    <div style="width: 300px; margin-top: 20px; display: inline-block">
      <lai-date-picker v-model="time" :singleCalendar="true" format="YYYY-MM-DD" type="dateRange" @change="handleChange"></lai-date-picker>
    </div>
    <div style="margin-top: 20px; display: inline-block">
      <lai-date-picker v-model="time2" format="YYYY-MM-DD" type="date" :btnControler="false" :monthControler="false" :yearControler="false"  @change="handleChange"></lai-date-picker>
    </div>
    <div>
      <lai-checkbox v-model="checkbox" :disabled="true"></lai-checkbox>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      time: [new Date(), new Date()],
      time2: new Date()
    }
  },
  methods: {
    handleChange (val) {
      console.log('app:', val)
    }
  }
}
</script>

