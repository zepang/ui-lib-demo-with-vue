<template>
  <div>
    <lai-checkbox-group v-model="model" @on-change="changeCheckbox">
      <lai-checkbox :label="1">复选框1</lai-checkbox>
      <lai-checkbox :label="2">复选框2</lai-checkbox>
      <lai-checkbox :label="3">复选框3</lai-checkbox>
      <lai-checkbox :label="4">复选框4</lai-checkbox>
    </lai-checkbox-group>
    <p>{{model}}</p>
  </div>
</template>

<script>
import LaiCheckbox from "./checkbox";
import LaiCheckboxGroup from "./checkboxGroup";
export default {
  data() {
    return {
      model: [1, 2, 3, 4],
      checkbox: true
    };
  },
  components: { LaiCheckbox, LaiCheckboxGroup },
  methods: {
    changeCheckbox(value) {
      console.log(value);
    }
  }
};
</script>

