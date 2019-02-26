<template>
  <div>
    <lai-checkbox-group v-model="model" @on-change="changeCheckbox">
      <lai-form>
        <lai-checkbox :label="1"></lai-checkbox>
        <lai-checkbox :label="2"></lai-checkbox>
        <lai-checkbox :label="3"></lai-checkbox>
        <lai-checkbox :label="4"></lai-checkbox>
      </lai-form>
    </lai-checkbox-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      model: [1,2,3,4],
      checkbox: true
    }
  },
  methods: {
    changeCheckbox (value) {
      console.log(value)
    }
  }
}
</script>
