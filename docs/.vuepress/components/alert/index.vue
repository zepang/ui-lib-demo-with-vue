<template>
  <div class="alert-wrapper">
    <alert-content
      v-for="(item, index) in notices" 
      :key="index"
      :style="{transitionDelay: `${index * .1}s`}"
      :notice="item"></alert-content>
  </div>
</template>

<script>
import AlertContent from './alertContent'
let _uid = 0
export default {
  data () {
    return {
      notices: []
    }
  },
  components: {
    AlertContent
  },
  methods: {
    add (notice) {
      let _notice = Object.assign({
        _uid: _uid++
      }, notice)

      this.notices.push(_notice)

      const duration = notice.duration
      setTimeout(() => {
        // this.remove(id)
        this.notices.shift()
      }, duration)
    },
    remove (uid) {
      let index = this.notices.findIndex(item => item._uid === uid)
      this.notices.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.alert-wrapper{
  position: fixed;
  display: inline-block;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 999;
  pointer-events: none;
}
</style>


