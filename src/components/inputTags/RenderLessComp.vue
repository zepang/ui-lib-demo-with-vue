<script>
export default {
  props: ['value'],
  methods: {
    addTag (e) {
      let value = e.target.value.trim()
      if (!this.value.includes(value)) {
        this.value.push(value)
      }
      e.target.value = ''
    },
    delTag (index) {
      this.value.splice(index, 1)
    }
  },
  render () {
    return this.$scopedSlots.default({
      tags: this.value,
      addTag: this.addTag,
      delTag: this.delTag
    })
  }
}
</script>
