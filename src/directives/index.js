// 自定义指令模块

// 当图片加载失败时的指令，作用是当图片加载失败，可以使用我们的自定义图片地址
export const imgerror = {
   // 当被绑定的元素插入到 DOM 后执行(使用v-imgerror后)
  inserted(dom, options) {
    // 如果本来就没有图片地址就不会有加载错误这样的话我们需要判断是否有值
    dom.src = dom.src || options.value
    // dom  dom 表示当前指令作用的dom对象 这里是图片
    // options是 指令中的变量的解释  其中有一个属性叫做 value 可以通过value来获取绑定的默认值 v-imgerror="photo" 获取到photo的地址值
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    dom.onerror = function () {
      // 将dom(img)的src址设置为我们的备用图片地址值
      dom.src = options.value
    }
  },
  // 组件更新之后的钩子中同样判断
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}