<template>
  <lai-render-less-comp :value="tags">
    <div slot-scope="{tags, addTag, delTag}" class="tags-input__wrapper">
      <div class="tags-input">
        <input type="text" @keydown.enter="addTag">
      </div>
      
      <ul>
        <li v-for="(tag, i) in tags" :key="i">{{tag}} <span @click="delTag(i)">&times;</span></li>
      </ul>
    </div>
  </lai-render-less-comp>
</template>
<script>
export default {
  data () {
    return {
      tags: ['法国', '日本']
    }
  }
}
</script>
<style lang="less" scoped>
.tags-input__wrapper {
  margin: 0 auto;
  ul {
    margin: 10px 0;
    padding: 0;
    li {
      display: inline-block;
      margin-right: 10px;
      padding: 6px 8px;
      background-color: #4dc298;
      border-radius: 4px;
      list-style: none;
      span {
        cursor: pointer;
      }
    }
  }
}
.tags-input {
  display: inline-block;
  padding: 10px 16px;
  border: 1px solid #d6d5d5;
  border-radius: 4px;
  background-color: #fff;
  input {
    width: 300px;
    height: 23px;
    display: inline-block;
    vertical-align: top;
    border: 0;
    letter-spacing: 1.6px;
    &:focus {
      outline: none;
    }
  }
}
</style>

