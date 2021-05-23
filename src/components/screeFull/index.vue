<template>
  <div style="margin-right:10px;display:inline-block">
    <!-- 放置一个svg图标 -->
    <svg-icon 
    icon-class="fullscreen" 
    style="color:#fff; width: 20px; height: 20px" 
    @click="changeScreen"
    />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    changeScreen () {
      // 原生js调用，全屏和退出全屏
      // document.documentElement.requestFullscreen()
      // document.exitFullscreen()
      // 插件调用
       if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()  原生js调用
      //   如果可用 就可以全屏
      ScreenFull.toggle()
    }
  }
}
</script>

<style>
.right-menu-item {
  vertical-align: middle;
}
</style>