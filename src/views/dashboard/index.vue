<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <span>{{ nickname }}</span>
      <el-button @click="updateName">修改name</el-button>
    </div>
    <!-- <page-tools>
       前面的插槽
      <span slot="beforeSolt">这是前面插槽的位置</span>
      后面的插槽 如果使用v-slot:xxx 这样的写法需要写到template上
      <template v-slot:afterSlot>
        <button>添加</button>
      </template>
    </page-tools> -->
    <!-- 混入 -->
    <upload-image />
  </div>
</template>

<script>
var obj = {
 data () {
   return {
      nickname: '小花',
   }
 },
  methods: {
    updateName () {
      this.nickname = '土豆'
    }
  }
}
import { mapGetters } from 'vuex'
// import PageTools from '@/components/pageTools'
export default {
  mixins: [ obj ],
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components: {
    // PageTools,
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
