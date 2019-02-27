<template>
  <div>
    <slot name="demo" :link="link"></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      link: {
        href: 'https://www.baidu.com',
        title: 'baidu'
      }
    }
  }
}
</script>

