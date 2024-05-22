<template>
  <body id="paper">
  <el-form class="login-container" label-position="left"
           label-width="0px" v-loading="loading" :rules="rules">
    <h3 class="login_title">用户注册</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="registerForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="registerForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="registerForm.email"
                auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="registerForm.phone"
                auto-complete="off" placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
import request from "../utils/request";
import {Message} from "element-ui"
import {isvalidUsername} from "../utils/validate";

export default {
  name: 'Register',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: undefined,
        password: undefined,
        email: undefined,
        phone: undefined
      },
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur',validator: validateUsername}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur',validator: validatePass}]
      },
      checked: true,
      loading: false
    }
  },
  methods: {
    register (){
      request.post('/users/register',this.registerForm).then(res => {
        if(res.code === 200){
          this.$message({
            type:'success',
            message:'注册成功'
          })
          this.$router.push({path:this.redirect || '/login'})
        }else if(res.code === 500){
          Message.error('该用户已存在')
        }
      })
    }
  }
}
</script>

<style scoped>
#paper {
  background: url("../assets/Mountai.png") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: -5px 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
