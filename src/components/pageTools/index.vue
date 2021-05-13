<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <!-- 有些是没有前面的部分我们需要定制 -->
        <div class="before" v-if="isShowBefore">
          <i class="el-icon-info"></i>
          <!-- 前面的插槽 -->
          <slot name="beforeSlot"></slot>
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <!-- 后面的插槽 -->
          <slot name="afterSlot"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    isShowBefore: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss">
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
 }
</style>