<template>
  <div>
    <lai-form :model="form" :rules="rules">
      <lai-form-item label="姓名" prop="name">
        <lai-form-input v-model="form.name"></lai-form-input>
      </lai-form-item>
      <lai-form-item label="邮件" prop="email">
        <lai-form-input v-model="form.email"></lai-form-input>
      </lai-form-item>
    </lai-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
