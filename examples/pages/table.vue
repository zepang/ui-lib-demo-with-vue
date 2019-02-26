<template>
  <lai-table :data="tableData" :columns="tableColumns"></lai-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          name: '王小明',
          age: 18
        },
        {
          name: '张小刚',
          age: 25
        }
      ],
      tableColumns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        }
      ]
    }
  }
}
</script>
