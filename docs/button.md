# Button 组件实现思路

### 是否该选择 button 标签？

因为 <code>&lt;button&gt;</code>标签自带复杂的默认样式，在不同的浏览器中略有不同，特别是在移动端的开发中，更多的人员喜欢用 <code>&lt;div&gt;、&lt;span&gt;、&lt;a&gt;</code>代替 <code>&lt;button&gt;</code>。出于主要是出于 HTML 的语义化做考量，而且这样做更有利于 SEO，我们还是选择<code>&lt;button&gt;</code>。

我们创建 button.vue 文件，并添加下面代码
~~~vue
<template>
  <button class="lai-btn">确认</button>
</template>
~~~

### 重置<code>&lt;button&gt;</code>默认样式

~~~less
.lai-btn { 
  display: inline-block;
  appearance: none;
  border: 0px;
  box-sizing: border-box;
  background-color: transparent; 
  color: inherit; 
  font: inherit; 
  letter-spacing: 0px;
  line-height: 1;
  cursor: pointer;
}
~~~

<vuep template="#example"></vuep>

<script type="text/x-template" id="example">
<template>
  <button class="lai-btn">确认</button>
</template>
<style>
  .lai-btn { 
    display: inline-block;
    appearance: none;
    border: 0px;
    box-sizing: border-box;
    background-color: transparent; 
    color: inherit; 
    font: inherit; 
    letter-spacing: 0px;
    line-height: 1;
    cursor: pointer;
  }
</style>
<script>
  module.exports = {}
</script>
</script>

这样看来基本就和普通的文本标签没啥两样。

### 给按钮添加上默认样式
<vuep template="#example"></vuep>

<script type="text/x-template" id="example">
<template>
  <button class="lai-btn">确认</button>
</template>
<style lang="less">
  .lai-btn { 
    display: inline-block;
    appearance: none;
    padding: .5em 1em;
    border: 0px;
    box-sizing: border-box;
    background-color: transparent; 
    color: inherit; 
    font: inherit; 
    letter-spacing: 0px;
    line-height: 1;
    cursor: pointer;
  }
</style>
<script>
  module.exports = {}
</script>
</script>


