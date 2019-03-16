# Tree 树形组件

##### 示例

<box>
  <tree-demo></tree-demo>
</box>

##### 代码

```vue
<template>
  <box>
    <lai-tree :data="treeData" :showCheckbox="true"></lai-tree>
  </box>
</template>
<script>
export default {
  data () {
    return {
      treeData: [
        {
          title: 'node_1',
          expand: true,
          children: [
            {
              title: 'node_1_1',
              expand: true,
              children: [
                {
                  title: 'node_1_1_1',
                  expand: true,
                },
                {
                  title: 'node_1_1_2',
                  expand: true,
                },
                {
                  title: 'node_1_1_3',
                  expand: true,
                }
              ]
            },
            {
              title: 'node_1_2',
              expand: true,
              children: [
                {
                  title: 'node_1_2_1',
                  expand: true,
                },
                {
                  title: 'node_1_2_2',
                  expand: true,
                },
                {
                  title: 'node_1_2_3',
                  expand: true,
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
```

<box>
<mk>
| 属性         | 说明               | 类型    | 默认值 |
| ------------ | ------------------ | ------- | ------ |
| data         | 树类组件的数据     | Array   | []     |
| showCheckbox | 是否显示CheckBox | Boolean | false  |
</mk>
</box>