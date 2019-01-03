<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div><slot></slot></div>
  </div>
</template>
<script>
import EventBus from './EventBus'
import A from './EventBus.1'
import Vue from 'vue'
export default {
  inject: ['EventBus'],
   beforeMount () {
    console.log(A);
    console.log(EventBus);
    // 普通的类
    console.log(Object.is(this.A, A)) // false
    // vue 实例
    console.log(Object.is(this.EventBus, EventBus)) //true
    console.log(this.EventBus);
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  }
}
</script>

