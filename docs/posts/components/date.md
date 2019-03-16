# DatePicker 日期选择器

##### 单选日期

<box>
<ClientOnly>
<single-date-demo></single-date-demo>
</ClientOnly>
</box>

##### 代码
```vue
<template>
  <lai-date-picker 
    v-model="time" 
    format="YYYY-MM-DD" 
    type="date" 
    :btnControler="false" 
    :monthControler="false" 
    :yearControler="false"  
    @change="handleChange"></lai-date-picker>
</template>
<script>
...
export default {
  data () {
    return {
      time: new Date()
    }
  },
  ...
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>
```

##### 范围日期-single panel

<box>
  <range-date-demo></range-date-demo>
</box>

##### 代码

```vue
<template>
  <lai-date-picker
    v-model="time"
    :singleCalendar="true"
    format="YYYY-MM-DD"
    type="dateRange"
    @change="handleChange"
  ></lai-date-picker>
</template>
<script>
...
export default {
  data() {
    return {
      time: [new Date(), new Date()],
      time2: new Date()
    };
  },
  ...
  methods: {
    handleChange(val) {
      console.log("app:", val);
    }
  }
};
</script>
```

##### 范围日期-double panel
<box>
  <date-demo></date-demo> 
</box>

##### 代码

```vue
<template>
    <lai-date-picker 
      v-model="time" 
      format="YYYY-MM-DD" 
      type="dateRange" 
      @change="handleChange">
    </lai-date-picker>
</template>
<script>
...
export default {
  data () {
    return {
      time: [new Date(), new Date()]
    }
  },
  methods: {
    handleChange (val) {
      console.log('app:', val)
    }
  }
}
</script>
```
##### API
<box>
<mk>
| 属性           | 说明                                     | 类型    | 默认值                                                                                                                                                                                                 |
| -------------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value          | 日期值                                   | Date    | 无                                                                                                                                                                                                     |
| type           | 日期选择器类型，可选值`date` `dateRange` | string  | `date`                                                                                                                                                                                                 |
| format         | 日期格式化                               | String  | 参考[https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats](https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats) |
| clearable      | 是否显示删除当前选择按钮                 | Boolean | true                                                                                                                                                                                                   |
| btnControler   | 是否显示确定选择日期按钮                 | Boolean | false                                                                                                                                                                                                  |
| yearControler  | 年递增和递减按钮                         | Boolean | true                                                                                                                                                                                                   |
| monthControler | 月递增和递减按钮                         | Boolean | true                                                                                                                                                                                                   |
</mk>
</box>