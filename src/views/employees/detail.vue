<template>
<div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 120px; margin-top:30px" :model="userInfo" :rules="formData" ref="userInfoForm">
              <el-form-item label="姓名:" prop="username">
                <el-input style="width:300px" v-model="userInfo.username" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input style="width:300px" type="password" v-model="userInfo.password2" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailInfo" :loading="btnLoading">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- <user-info /> 常规组件使用-->
            <!-- 我们使用了动态组件(动态组件可以切换只需要改变is所绑定的组件名即可)**component**，它通过 **`is`**属性来绑定需要显示在该位置的组件，is属性可以直接为**`注册组件`**的组件名称即可 is为强制绑定属性-->
            <component :is="USERINFO" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
          <!-- 动态组件 -->
          <component :is="JOBINFO"/>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getBaseUserInfo } from '@/api/user'
import { saveUserDetailInfo } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  name: 'detail',
  components: {
    UserInfo,
    JobInfo
  },
  props: {},
  data () {
    return {
      USERINFO: UserInfo,
      JOBINFO: JobInfo,
      userId: this.$route.params.id, // 这样可以后面直接通过 this.userId进行获取数据
      // 收集，显示表单数据
      userInfo: {
        username: '', // 员工姓名
        password2: '' // 员工输入的密码，因为后端返回的是加密后的密码我们不能直接进行修改所以我们新建一个password2将password2的值给password
      },
      // 验证规则 
      formData: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      },
      // 按钮loading
      btnLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getBaseUserInfo()
  },
  mounted () {},
  methods: {
    // 获取员工基本信息
    async getBaseUserInfo() {
      // 数据回写
      this.userInfo = await getBaseUserInfo(this.userId)
    },
    // 保存用户信息
   async saveUserDetailInfo() {
      this.btnLoading = true
      try {
      await this.$refs.userInfoForm.validate()
        //这里我们需要用对象延展将password2的值给数据中的password实现密码修改
      await saveUserDetailInfo({...this.userInfo, password: this.userInfo.password2})
      // 提示用户
      this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      } finally {
      // 关闭loaidng状态
      this.btnLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>