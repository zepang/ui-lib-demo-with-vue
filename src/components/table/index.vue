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
