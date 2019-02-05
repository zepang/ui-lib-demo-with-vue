<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
import EventBus from './EventBus'
import Vue from 'vue'
export default {
  provide () {
    return {
      form: this
    }
  },
  data () {
    return {
      fields: []
    }
  },
  created () {
    EventBus.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field)
    })
    EventBus.$on('on-form-item-remove', (field) => {
      if (field) this.fields.splice(this.fields.indexOf(this), 1)
    })
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
}
</script>

