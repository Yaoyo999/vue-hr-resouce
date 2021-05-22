import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 考虑到我们的自定义组件并不是单独的一个，我们就一次性的遍历注册而不是单独的引入注册
//针对下面的引入语法  **`import *  as  变量`**  得到的是一个对象**`{ 变量1：对象1，变量2： 对象2 ...   }`**, 所以可以采用对象遍历的方法进行处理
import * as directives from '@/directives/index'
// console.log(directives)
Object.keys(directives).forEach(directive => {
  Vue.directive(directive, directives[directive])
})
// 引入自定义组件文件
import selfComponent from '@/components/index'
// 引入自定义过滤器
import * as filters from '@/filters'
Object.keys(filters).forEach(filterName => {
  // 遍历注册所有的过滤器
  Vue.filter(filterName, filters[filterName])
})
// 引入混合
import checkPermPoint from '@/mixins/checkPermPoint'
// 注册混合
Vue.mixin(checkPermPoint)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 全局注册自定义组件
// Vue.component('page-tools', PageTools)  import PageTools from '@/components/pageTools' 单独引入组件注册的方法
// 注册自己封装好的插件
Vue.use(selfComponent)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
