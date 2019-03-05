# Button 按钮

##### 示例

<box>
  <lai-button size="small">按钮示例</lai-button>
  <lai-button size="middle">按钮示例</lai-button>
  <lai-button size="large">按钮示例</lai-button>
  <br />
  <br />
  <lai-button size="small" type="cancel">按钮示例</lai-button>
  <lai-button size="middle" type="cancel">按钮示例</lai-button>
  <lai-button size="large" type="cancel">按钮示例</lai-button>
  <br />
  <br />
  <lai-button size="small" :disabled="true">按钮示例</lai-button>
  <lai-button size="middle" :disabled="true">按钮示例</lai-button>
  <lai-button size="large" :disabled="true">按钮示例</lai-button>
</box>

##### 代码
```vue
<lai-button size="small">按钮示例</lai-button>
<lai-button size="middle">按钮示例</lai-button>
<lai-button size="large">按钮示例</lai-button>

<lai-button size="small" type="cancel">按钮示例</lai-button>
<lai-button size="middle" type="cancel">按钮示例</lai-button>
<lai-button size="large" type="cancel">按钮示例</lai-button>

<lai-button size="small" :disabled="true">按钮示例</lai-button>
<lai-button size="middle" :disabled="true">按钮示例</lai-button>
<lai-button size="large" :disabled="true">按钮示例</lai-button>
```
##### API
<box>
<mk>
| 属性     | 说明                                                 | 类型    | 默认值 |
| -------- | ---------------------------------------------------- | ------- | ------ |
| size     | 按钮大小，可选值为`small` `middle` `large`或者不设置 | string  | middle |
| type     | 按钮类型，可选值`ok` `cancel`或者不设置              | string  | ok     |
| disabled | 设置按钮为禁用状态                                   | Boolean | false  |
</mk>
</box>