<template>
  <box>
    <lai-table :data="tableData" :columns="tableColumns"></lai-table>
    <demo>
      <div slot-scope="{link}" slot="demo">{{link.title}}</div>
    </demo>
  </box>
</template>
<script>
import demo from '../components/demo'
export default {
  data () {
    return {
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddress: '',
      editIndex: -1,
      tableData: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          birthday: '563472000000',
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          birthday: '687024000000',
          address: '深圳市南山区深南大道'
        }
      ],
      tableColumns: [
        {
          title: '姓名',
          key: 'name',
          render: (h, { row, index }) => {
            let edit;
            // 当前行为聚焦行时
            if (this.editIndex === index) {
              edit = [h('input', {
                domProps: {
                  value: row.name
                },
                on: {
                  input: (event) => {
                    this.editName = event.target.value
                  }
                }
              })];
            } else {
              edit = row.name
            }
            return h('div', [
              edit
            ])
          }
        },
        {
          title: '年龄',
          key: 'age',
          render: (h, { row, index }) => {
            let edit;
            // 当前行为聚焦行时
            if (this.editIndex === index) {
              edit = [h('input', {
                domProps: {
                  value: row.age
                },
                on: {
                  input: (event) => {
                    this.editAge = event.target.value
                  }
                }
              })];
            } else {
              edit = row.age
            }
            return h('div', [
              edit
            ])
          }
        },
        {
          title: '出生日期',
          key: 'birthday',
          render: (h, { row, index }) => {
            let edit
            // 当前行为聚焦行时
            if (this.editIndex === index) {
              edit = [h('input', {
                domProps: {
                  value: row.birthday
                },
                on: {
                  input: (event) => {
                    this.editBirthday = event.target.value;
                  }
                }
              })];
            } else {
              const date = new Date(parseInt(row.birthday));
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();

              edit = `${year}-${month}-${day}`;
            }

            return h('div', [
              edit
            ]);
          }
        },
        {
          title: '地址',
          key: 'address',
          render: (h, { row, index }) => {
            let edit;

            // 当前行为聚焦行时
            if (this.editIndex === index) {
              edit = [h('input', {
                domProps: {
                  value: row.address
                },
                on: {
                  input: (event) => {
                    this.editAddress = event.target.value;
                  }
                }
              })];
            } else {
              edit = row.address;
            }

            return h('div', [
              edit
            ]);
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            if (this.editIndex === params.index) {
              return [h('button', {
                on: {
                  click: () => {
                    this.tableData[params.index].name = this.editName
                    this.tableData[params.index].age = this.editAge
                    this.tableData[params.index].birthday = this.editBirthday
                    this.tableData[params.index].address = this.editAddress
                    this.editIndex = -1
                  }
                }
              }, '保存'),
              h('button', {
                style: {
                  marginLeft: '6px'
                },
                on: {
                  click: () => {
                    this.editIndex = -1
                  }
                }
              }, '取消')]
            } else {
              return h('button', {
                on: {
                  click: () => {
                    this.editName = params.row.name
                    this.editAge = params.row.age
                    this.editBirthday = params.row.birthday
                    this.editAddress = params.row.address
                    this.editIndex = params.index
                  }
                }
              }, '修改')
            }
          }
        }
      ]
    }
  },
  components: {
    demo
  }
}
</script>
