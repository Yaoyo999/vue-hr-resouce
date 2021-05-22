<template>
  <!-- <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <span>{{ nickname }}</span>
      <el-button @click="updateName">修改name</el-button>
    </div> -->
    <!-- <page-tools>
       前面的插槽
      <span slot="beforeSolt">这是前面插槽的位置</span>
      后面的插槽 如果使用v-slot:xxx 这样的写法需要写到template上
      <template v-slot:afterSlot>
        <button>添加</button>
      </template>
    </page-tools> -->
    <!-- 混入 -->
    <!-- <upload-image /> -->
  <!-- </div> -->
  <div class="dashboard-container">
    <!-- 头部内容 -->
    <el-card class="header-card">
      <div>
        <div class="fl headL">
          <div class="headImg">
            <!-- 这里我们需要用自己封的指令 -->
            <img :src="userInfo.staffPhoto" v-imgerror="imgSrc">
          </div>
          <div class="headInfoTip">
            <p class="firstChild">早安，{{this.$store.state.user.userInfo.username}}，祝你开心每一天！</p>
            <p class="lastChild">{{userInfo.username}} | {{ userInfo.companyName || '未知'}} | {{ userInfo.departmentName 
              || '未知' }}</p>
          </div>
        </div>
        <div class="fr" />
      </div>
    </el-card>
    <!-- 主要内容 -->
    <el-row type="flex" justify="space-between">
      <!-- 左侧内容 -->
      <el-col :span="13" style="padding-right:26px">
        <!-- 工作日历 -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>工作日历</span>
            <workCalendar />
          </div>
        <!-- 放置日历组件 -->
        </el-card>
        <!-- 公告 -->
        <el-card class="box-card">
          <div class="advContent">
            <div class="title"> 公告</div>
            <div class="contentItem">
              <ul class="noticeList">
                <li>
                  <div class="item">
                    <img src="@/assets/common/img.jpeg" alt="">
                    <div>
                      <p><span class="col">朱继柳</span> 发布了 第1期“传智大讲堂”互动讨论获奖名单公布</p>
                      <p>2018-07-21 15:21:38</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img src="@/assets/common/img.jpeg" alt="">
                    <div>
                      <p><span class="col">朱继柳</span> 发布了 第2期“传智大讲堂”互动讨论获奖名单公布</p>
                      <p>2018-07-21 15:21:38</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img src="@/assets/common/img.jpeg" alt="">
                    <div>
                      <p><span class="col">朱继柳</span> 发布了 第3期“传智大讲堂”互动讨论获奖名单公布</p>
                      <p>2018-07-21 15:21:38</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="11">
        <el-card class="box-card">
          <div class="header headTit">
            <span>流程申请</span>
          </div>
          <div class="sideNav">
            <el-button class="sideBtn" @click="showDiag = true">离职</el-button>
            <el-button class="sideBtn">请假调休</el-button>
            <el-button class="sideBtn" @click="$router.push('/users/approvals')">审批列表</el-button>
            <el-button class="sideBtn" @click="$router.push('/users/info')">我的信息</el-button>
          </div>
        </el-card>

        <!-- 绩效指数 -->
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>绩效指数</span>
          </div>
          <rader />
        <!-- 放置雷达图 -->
        </el-card>
        <!-- 帮助连接 -->
        <el-card class="box-card">
          <div class="header headTit">
            <span>帮助链接</span>
          </div>
          <div class="sideLink">
            <el-row>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconGuide" />
                  <p>入门指南</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconHelp" />
                  <p>在线帮助手册</p>
                </a>
              </el-col>
              <el-col :span="8">
                <a href="#">
                  <span class="icon iconTechnology" />
                  <p>联系技术支持</p>
                </a>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="离职申请" :visible="showDiag" @close="isCancel">
      <el-form label-width="120px" :model="dataForm" :rules="formRules" ref="postForm">
        <el-form-item label="离职时间" prop="exceptTime">
          <el-date-picker 
          placeholder="选择日期时间" 
          v-model="dataForm.exceptTime" 
          value-format="yyyy-MM-dd HH:mm:ss"
           type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因" style="width: 70%;" prop="reason">
          <el-input type="textarea" placeholder="请输入内容" v-model="dataForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" slot="footer">
        <el-col :span="6">
          <el-button size="small" @click="isCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import workCalendar from './components/work-calendar'
import rader from './components/radar'
import { startProcess } from '@/api/approvals'
const  { mapState }  = createNamespacedHelpers('user')
export default {
  name: 'Dashboard',
  components: {
    workCalendar,
    rader
  },
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      imgSrc: require('@/assets/common/head.jpg'),
      showDiag: false, // 离职弹窗
      dataForm: {
        exceptTime: '',
        reason: '',
        processKey: 'process_dimission', // 特定的审批
        processName: '离职'
      },
      formRules: {
        exceptTime: [
          { required: true, message: '离职时间不能为空', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '离职原因不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 取消
    isCancel() {
      // 清除数据
      this.dataForm = {
        exceptTime: '',
        reason: '',
        processKey: 'process_dimission', // 特定的审批
        processName: '离职'
      }
      this.showDiag = false
    },
    btnOk () {
    //  手动校验表单
    this.$refs.postForm.validate().then(async () => {
    return await startProcess({ ...this.dataForm, userId: this.userInfo.userId, username: this.userInfo.username })
    .then(() => {
    this.$message.success('提交成功')
    this.showDiag = false
    }).catch (error => {
      this.showDiag = false
      console.log(error)
    })
    }
    )}
  }
}
</script>


// var obj = {
//  data () {
//    return {
//       nickname: '小花',
//    }
//  },
//   methods: {
//     updateName () {
//       this.nickname = '土豆'
//     }
//   }
// }
// import { mapGetters } from 'vuex'
// // import PageTools from '@/components/pageTools'
// export default {
//   mixins: [ obj ],
//   name: 'Dashboard',
//   computed: {
//     ...mapGetters([
//       'name'
//     ])
//   },
//   components: {
//     // PageTools,
//   }
// }
// </script>
<style lang="scss" scoped>
.dashboard-container {
  margin: 10px;
  li {
    list-style: none;
  }
  .headImg {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #999;
          img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .headInfoTip {
    padding: 25px 0 0;
    margin-left: 120px;
    p {
      padding: 0 0 15px;
      margin: 0;
      &.firstChild {
        font-size: 24px;
      }
      &.lastChild {
        font-size: 20px;
        color: #7f8c8d;
      }
    }
  }
}

.box-card {
  padding: 5px 10px;
  margin-top: 20px;
  .header {
    span {
      color: #2c3e50;
      font-size: 24px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  .headTit {
    span {
      border-bottom: 4px solid #8a97f8;
      padding-bottom: 10px;
    }
  }
}
.header-card{
  position: relative;
  .header {
    position: absolute;
    right: 20px;
    top: 15px;
    z-index: 1;
  }
}

.advContent {
  background: #fff;
  border-radius: 5px 5px 0px 0px;
  .title {
    font-size: 16px;
    padding: 20px;
    font-weight: bold;
    border-bottom: solid 1px #ccc;
  }
  .contentItem {
    padding: 0 30px;
    min-height: 350px;
    .item {
      display: flex;
      padding:18px 0 10px;
      border-bottom: solid 1px #ccc;
      .col {
        color: #8a97f8;
      }
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 10px;
      }
      p{
        padding: 0 0 8px;
      }
    }
  }
}
.noticeList {
  margin: 0;
  padding: 0;
}
.sideNav,
.sideLink {
  padding: 30px 0 12px;
  .sideBtn {
    padding: 16px 26px;
    font-size:16px;
    margin: 10px 5px;
  }
}
.sideLink {
  text-align: center;
  .icon {
    display: inline-block;
    width: 76px;
    height: 76px;
    background: url('./../../assets/common/icon.png') no-repeat;
  }
  .iconGuide {
    background-position: 0 0;
  }
  .iconHelp {
    background-position: -224px 0;
  }
  .iconTechnology {
    background-position: -460px 0;
  }
}
</style>
