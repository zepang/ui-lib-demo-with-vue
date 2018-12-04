<template>
  <div>
    <lai-select v-model="selected" :options="options" @change="change"></lai-select>
    <!-- <lai-select v-model="selected" :multiple="true" :options="options" @change="change"></lai-select> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: 1,
      options: [
        {
          label: '选项1',
          value: 1
        },
        {
          label: '选项2',
          value: 2
        },
        {
          label: '选项3',
          value: 3
        }
      ]
    }
  },
  methods: {
    change (val) {
      console.log(val)
    }
  }
}
</script>
