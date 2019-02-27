<template>
  <table>
    <caption>Title</caption>
    <thead>
      <tr>
        <th v-for="(col, colIndex) in columns" :key="colIndex">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col, i) in columns" :key="i">{{ row[col.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => {}
    }
  }
}
</script>
<style lang="less" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: auto;
  empty-cells: show;
  tr:hover {
    background-color: #f7f7f7;
  }
  td, th {
    padding: 0.5em;
    border: 1px solid #e9e9e9;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
}
</style>

