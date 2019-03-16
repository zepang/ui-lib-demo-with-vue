# Checkbox 复选框

##### 示例

<box>
  <checkbox-demo></checkbox-demo> 
</box>

##### 代码

```vue
<template>
  <div>
    <lai-checkbox v-model="value">复选框</lai-checkbox>
    ...
  </div>
</template>
<script>
...
export default {
  data () {
    return {
      value: false
    }
  },
  ...
}
</script>

```

##### 复选框组

<box>
  <checkbox-group-demo></checkbox-group-demo>
</box>

##### 代码

```vue
<template>
  <div>
    <lai-checkbox-group v-model="model" @on-change="changeCheckbox">
      <lai-checkbox :label="1">复选框1</lai-checkbox>
      <lai-checkbox :label="2">复选框2</lai-checkbox>
      <lai-checkbox :label="3">复选框3</lai-checkbox>
      <lai-checkbox :label="4">复选框4</lai-checkbox>
    </lai-checkbox-group>
    ...
  </div>
</template>

<script>
...
export default {
  data() {
    return {
      model: [1, 2, 3, 4],
      checkbox: true
    };
  },
  ...
  methods: {
    changeCheckbox(value) {
      console.log(value);
    }
  }
};
</script>
```

##### API
<box>
<mk>
| 属性     | 说明                                                 | 类型    | 默认值 |
| -------- | ---------------------------------------------------- | ------- | ------ |
| value    | 只在单独使用时有效。可以使用 v-model 双向绑定数据 | boolean  | false |
| label     | 与 `checkbox-group`组合使用有效             | String 或 Number 或 Boolean  | -     |
| disabled | 设置为禁用状态                                   | Boolean | false  |
</mk>
</box>