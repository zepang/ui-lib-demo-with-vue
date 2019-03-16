<template>
  <div>
    <tree-node
      v-for="(item, index) in cloneData"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox">
    </tree-node>
  </div>
</template>

<script>
import deepClone from './deepClone'
import TreeNode from './node'
export default {
  provide () {
    return {
      tree: this
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  components: { TreeNode },
  data () {
    return {
      cloneData: []
    }
  },
  created () {
    this.updateData()
  },
  methods: {
    updateData () {
      this.cloneData = deepClone(this.data)
    },
    onCheckChange (data) {
      this.$emit('on-check-change', data, this.data)
    }
  },
  watch: {
    data () {
      this.updateData()
    }
  }
}
</script>
