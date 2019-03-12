<template>
  <div class="box">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.box {
  // display: inline-block;
  margin: 1em 0;
  padding: 2em;
  border-radius: 0.3em;
  box-shadow: 0px 0px 1px 1px #eee;
  &:hover {
    box-shadow: 0px 1px 4px 2px #eee;
  }
}
</style>

