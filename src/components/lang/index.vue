<template>
  <div>
    <el-dropdown @command="changeLanguage" trigger="click">
      <svg-icon style="color:#fff;font-size:20px" icon-class="language"></svg-icon>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command="zh" :disabled="$i18n.locale === 'zh'">中文</el-dropdown-item>
         <el-dropdown-item command="en" :disabled="$i18n.locale === 'en'">En</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'langIndex',
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
    changeLanguage(lang) {
      Cookie.set('language') // 存储到cookie中持久化，记忆用户的选择
      // 通知i18n改变语言包
      // 挂载到Vue上跟vue-router一样可以通过this.$router获取到
      this.$i18n.locale = lang
      this.$message.success('切换语言成功')
    }
  }
}
</script>

<style scoped lang="less"></style>