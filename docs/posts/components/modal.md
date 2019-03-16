# Modal 模态框

# Alert 消息

##### 示例
<box>
<!-- <modal-demo></modal-demo> -->
</box>

##### 代码
```vue
<lai-button @click.native="alert" type="ok">message</lai-button>
...
<script>
  let _uid = 0
  export default {
    ....
    alert () {
      const types = ['success', 'info', 'warn', 'error']
      this.$alert({
        content: 'There is one message',
        duration: 2000,
        type: types[_uid%4]
      })
    }
  }
</script>
```

##### API
<box>
<mk>
| 属性     | 说明                                            | 类型   | 默认值  |
| -------- | ----------------------------------------------- | ------ | ------- |
| content  | 消息内容                                        | string | 无      |
| type     | 消息类型，可选值`success` `info` `warn` `error` | string | success |
| duration | 消息框存在的时间                                | number | 3000    |
</mk>
</box>