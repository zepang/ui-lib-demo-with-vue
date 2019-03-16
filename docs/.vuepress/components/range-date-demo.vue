<template>
  <div>
    <p>{{time}}</p>
    <div style="width: 300px; margin-top: 20px; display: inline-block">
      <lai-date-picker
        v-model="time"
        :singleCalendar="true"
        format="YYYY-MM-DD"
        type="dateRange"
        @change="handleChange"
      ></lai-date-picker>
    </div>
  </div>
</template>

<script>
import LaiDatePicker from "./date";
export default {
  data() {
    return {
      time: [new Date(), new Date()],
      time2: new Date()
    };
  },
  components: { LaiDatePicker },
  methods: {
    handleChange(val) {
      console.log("app:", val);
    }
  }
};
</script>