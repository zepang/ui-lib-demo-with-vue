<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
import Emitter from '../../mixin/emitter'
import EventBus from './EventBus'
import A from './EventBus.1'
import Vue from 'vue'
export default {
  provide () {
    return {EventBus, A}
  },
  beforeMount () {
    A.add(1)
    console.log(A);
    console.log(this)
    EventBus.$on('test')
    console.log(EventBus);
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  }
}
</script>

