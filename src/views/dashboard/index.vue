<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <page-tools>
       前面的插槽
      <span slot="beforeSolt">这是前面插槽的位置</span>
      后面的插槽 如果使用v-slot:xxx 这样的写法需要写到template上
      <template v-slot:afterSlot>
        <button>添加</button>
      </template>
    </page-tools> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PageTools from '@/components/pageTools'
export default {
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
