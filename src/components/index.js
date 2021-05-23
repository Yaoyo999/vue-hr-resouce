// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './pageTools'
import UploadExcel from './uploadExcel'
import UploadImage from './UploadImage'
import Print from 'vue-print-nb'
import screeFull from './screeFull'
import ThemePicker from './themePicker'
import Lang from './lang'
export default {
   install (Vue) { // Vue.use()方法其实的调用install方法，该方法接收一个参数就是Vue
    // 全局注册组件使用Vue.component 全局注册插件使用Vue.use() 全局注册过滤器使用Vue.filter()
    Vue.component('page-tools', PageTools)
    Vue.component('upload-excel', UploadExcel)
    Vue.component('upload-image', UploadImage)
    Vue.use(Print)
    Vue.component('screen-full', screeFull)
    Vue.component('theme-picker', ThemePicker)
    Vue.component('lang', Lang)
  }
}