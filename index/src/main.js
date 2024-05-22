// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
//导入permission.js，用户进行前端的权限控制

import store from './store'
import router from './router'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/icons' // ico
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import '@/permission' // permission control

// import * as echarts from 'echarts';
// Vue.prototype.$echarts = echarts;
Vue.use(ElementUI,{locale})

Vue.prototype.$axios = axios
Vue.prototype.$url = 'http://localhost:8443/'


import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
