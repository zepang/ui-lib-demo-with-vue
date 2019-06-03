<template>
  <div class="input-tag">
    <span class="tag" v-for="(tag, i) in tags" :key="i">
      {{tag}}
      <a href="javascript:;" @click="delTag(i)">&times;</a>  
    </span>
    <input type="text" @keydown.enter="addTag">
  </div>
</template>

<script>
export default {
  props: {
     tags: Array
   },
   mounted () {
     console.log(this.tags)
   },
   methods: {
     addTag (e) {
       let value = e.target.value.trim()
       if (!this.tags.includes(value)) {
         this.tags.push(value)
        }
       e.target.value = ''
       this.$emit('on-change',value, this.tags)
     },
     delTag (index) {
       this.tags.splice(index, 1)
     }
   }
}
</script>
<style lang="less" scoped>
.input-tag {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -5%);
  display: inline-block;
  padding: 10px 16px;
  border: 1px solid #d6d5d5;
  border-radius: 4px;
  background-color: #fff;
}

.input-tag .tag {
  display: inline-block;
  margin-right: 10px;
  padding: 3px 5px;
  background-color: #41c5b4;
  font-size: 13px;
  color: #fff;
  border-radius: 4px;
}

.input-tag .tag a { 
  display: inline-block;
  vertical-align: 1px;
  text-decoration: none;
  color: #00000091;
  font-size: 14px;
}

.input-tag input {
  width: 300px;
  height: 23px;
  display: inline-block;
  vertical-align: top;
  border: 0;
  letter-spacing: 1.6px;
}
.input-tag input:focus {
  outline: none;
}
</style>

