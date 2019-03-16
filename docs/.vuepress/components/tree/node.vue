<template>
  <ul class="tree-list">
    <li class="tree-item">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">-</span>
      </span>
      <checkbox 
        v-if="showCheckbox" 
        v-model="data.checked" 
        @on-change="handleCheck">
      </checkbox>
      <span>{{ data.title }}</span>
      <tree-node
        v-if="data.expand"
        v-for="(item, index) in data.children"
        :key="index"
        :data="item"
        :show-checkbox="showCheckbox"
      ></tree-node>
    </li>
  </ul>
</template>

<script>
import checkbox from '../checkbox'
export default {
  name: 'TreeNode',
  inject: ['tree'],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  components: { checkbox },
  methods: {
    updateTreeDown (data, checked) {
      this.$set(data, 'checked', checked)
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked)
        })
      }
    },
    handleCheck (checked) {
      this.updateTreeDown(this.data, checked)
      this.tree.onCheckChange(this.data)
    },
    handleExpand () {
      this.$set(this.data, 'expand', !this.data.expand)
    }
  },
  watch: {
    'data.children': {
      handler (data) {
        if (data) {
          const checkedAll = data.every(item => item.checked)
          this.$set(this.data, 'checked', checkedAll)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.tree-list, .tree-item{
  list-style: none;
  padding-left: 1em;
}
.tree-item {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.tree-expand{
  cursor: pointer;
}
</style>


