<template>
  <div class="input-tag__wrapper">
     <lai-input-tags :tags="tags" @on-change="handleChangeTags"></lai-input-tags>
  </div>
</template>
<script>
export default {
  data () {
    return  {
      tags: [
        '日本',
        '泰国'
      ]
    }
  },
  methods: {
    handleChangeTags (cur, tags) {
      console.log(cur, tags)
    }
  }
}
</script>
