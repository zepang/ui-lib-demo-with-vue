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
        <td v-for="(col, i) in columns" :key="i">
          <template v-if="'render' in col">
            <render :row="row" :column="col" :index="rowIndex" :render="col.render"></render>
          </template>
          <template v-else>
            {{ row[col.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from './render'
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
  },
  components: { Render }
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

