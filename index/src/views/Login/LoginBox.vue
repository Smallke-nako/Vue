<template>
  <body id="background" class="background">
  <div class="main-box">
    <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
      <form>
        <h2 class="title">创 建 新 账 户</h2>
<!--        <span class="text">or use email for registration</span>-->
        <input class="form__input" type="text" placeholder="Username" v-model="registerForm.username"/>
        <input class="form__input" type="password" placeholder="Password" v-model="registerForm.password"/>
        <input class="form__input" type="text" placeholder="Email" v-model="registerForm.email"/>
        <input class="form__input" type="text" placeholder="Phone" v-model="registerForm.phone"/>
        <div class="primary-btn" v-on:click="handleRegister">立即注册</div>
      </form>
    </div>
    <div
      :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]"
    >
      <form>
        <h2 class="title">用 户 登 录</h2>
        <!--        <span class="text">or use email for registration</span>-->
        <input class="form__input" type="text" placeholder="Username" v-model="loginForm.username" name="username" />

        <input class="form__input" type="password" placeholder="Password" v-model="loginForm.password" name="password"/>

        <div class="primary-btn" v-on:click="handleLogin">立即登录</div>
      </form>
    </div>
    <div :class="['switch', { login: isLogin }]">
      <div class="switch__circle"></div>
      <div class="switch__circle switch__circle_top"></div>
      <div class="switch__container">
        <h2>{{ isLogin ? 'Hello Friend !' : 'Welcome Back !' }}</h2>
        <p>
          {{
            isLogin
              ? '还没有账号，马上来加入我们吧！'
              : '立 即 登 录 监 控 系 统'
          }}
        </p>
        <div id="btn" class="primary-btn" @click="isLogin = !isLogin">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'LoginBox',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      isLogin: false,
      loginForm: {
        username: undefined,
        password: undefined,
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur',validator: validateUsername}],
        password: [{ required: true, trigger: 'blur',validator: validatePass}]
      },
      registerForm: {
        username: undefined,
        email: undefined,
        password: undefined,
        phone: undefined
      },
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$message({
              type:'success',
              message:'登录成功'
            })
            this.$router.push({ path: this.redirect || '/' })
          })
    },
    handleRegister() {
      request.post('/users/register',this.registerForm).then(res => {
        if(res.code === 200){
          this.$message({
            type:'success',
            message:'注册成功'
          })
          this.registerForm.username = undefined
          this.registerForm.password = undefined
          this.registerForm.phone = undefined
          this.registerForm.email = undefined
          setTimeout(function (){
            const e = document.createEvent('MouseEvents');
            e.initEvent('click',true,true)
            document.getElementById('btn').dispatchEvent(e)
          },500)
        }
      })
    }
  },

}
</script>



<style lang="scss" scoped>

//body {
//  filter: grayscale(100%);
//  -webkit-filter: grayscale(100%);
//  -moz-filter: grayscale(100%);
//  -ms-filter: grayscale(100%);
//  -o-filter: grayscale(100%);
//  filter: url("data:image/svg+xml;utf8,#grayscale");
//  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
//  -webkit-filter: grayscale(1);
//}

#background {
  background: url("../../assets/Norway.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
}
body{
  margin: 0px 0px;
}
.main-box {
  position: absolute;
  left: 70%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  ////background-color: #ecf0f3;
  //box-shadow: 7px 7px 7px #d1d9e6, 7px 7px 7px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;
    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;
      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      .text {
        margin-top: 30px;
        margin-bottom: 12px;
      }
      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
    }
  }
  .container-register {
    z-index: 100;
    left: calc(100% - 600px);
  }
  .container-login {
    left: calc(100% - 600px);
    z-index: 0;
  }
  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }
  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;
    .switch__circle {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -60%;
      left: -60%;
      transition: 1.25s;
    }
    .switch__circle_top {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }
    .switch__container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 400px;
      padding: 50px 55px;
      transition: 1.25s;
      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }
  .login {
    left: calc(100% - 400px);
    .switch__circle {
      left: 0;
    }
  }
  .primary-btn {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    &:hover {
      box-shadow: 4px 4px 6px 0 rgb(255, 255, 255 ),
      -4px -4px 6px 0 rgb(116 ,125 ,136 ),
      inset -4px -4px 6px 0 rgb(255, 255 ,255 ),
      inset 4px 4px 6px 0 rgb(0, 0 ,0 );
    }
  }
}
</style>

