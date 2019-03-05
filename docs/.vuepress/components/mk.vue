<template>
  <div v-html="markdownContent">
    <slot></slot>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
export default {
  data () {
    return {
      sourceData: '',
      markdownContent: ''
    }
  },
  created () {
    if (this.$slots.default) {
      for (let slot of this.$slots.default) {
        this.sourceData += slot.text
      }
    }
  },
  mounted () {
    let md = MarkdownIt()
    this.markdownContent = md.render(this.sourceData)
  }
}
</script>
