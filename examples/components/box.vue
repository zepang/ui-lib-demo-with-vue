<template>
  <div class="box">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.box {
  display: inline-block;
  padding: 2em;
  box-shadow: 0px 0px 4px 1px #eee;
  &:hover {
    box-shadow: 0px 1px 6px 2px #eee;
  }
}
</style>

