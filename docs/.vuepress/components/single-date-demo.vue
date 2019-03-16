<template>
  <div>
    <p>{{time}}</p>
    <div style="margin-top: 20px; display: inline-block">
      <lai-date-picker
        v-model="time"
        format="YYYY-MM-DD"
        type="date"
        :btnControler="true"
        :monthControler="true"
        :yearControler="true"
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
      time: new Date()
    };
  },
  components: { LaiDatePicker },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>
