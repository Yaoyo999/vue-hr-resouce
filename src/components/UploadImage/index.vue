<template>
<div>
  <!-- action为什么给#， 因为前面我们讲过了，我们要上传到腾讯云，需要自定义的上传方式,action给个#防止报错 -->
  <el-upload 
    list-type="picture-card" 
    action="#" 
    :limit="1"
    :file-list="fileList"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :class="{disabled: fileComputed }"
    :on-change="onChange"
    :before-upload="beforeUpload"
    :http-request="upload"
    >
    <i class="el-icon-plus" />
  </el-upload>
  <el-progress :percentage="percent" v-if="progressShow"></el-progress>
  <el-dialog
   title="图片"
  :visible.sync="dialogShow">
    <img :src="imgSrc" style="width:100%">
  </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
    SecretId: 'AKIDXt0rRlpc8PQBfspVu3wZv1rRkmY4KK3V', // 身份识别 ID
    SecretKey: 'D9oEiyyrZ2FCvNYS5RWKtCF0UifLQFp8', // 身份密钥
})
export default {
  name: 'uploadImage',
  components: {},
  props: {},
  data () {
    return {
      fileList: [{url: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=233301930,3031623456&fm=11&gp=0.jpg'}], // 上传的文件列表数组中的url就是选择显示的图片
      imgSrc: '', // 预览图片的src值
      dialogShow: false, // 弹出层的显示和隐藏
      currentFileUid: null, // 要上传文件的uid
      percent: 0, // 进度条百分比 [0-100] 进度条随着该数值的变化不断变化
      progressShow: false // 是否展示进度条
    }
  },
  computed: {
    // 通过计算上传文件列表数组的长度来决定是否显示上传图片的区域
    fileComputed () {
      return this.fileList.length === 1
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 获取图片信息和预览效果+号
    onPreview (file) {
      // 赋值给imgSrc实现弹窗预览图片
     this.imgSrc = file.url
    // 展示弹出层
    this.dialogShow = true
      console.log(file)
    },
    // 删除文件列表中的回调
    onRemove (file,fileList) {
      // 文件对象中都有一个uid我们可以根据uid来判断删除哪个元素(这里只有一张图片可以将文件列表置空但是我们要考虑以后多张图片的情况)
      // console.log(file, fileList)
      // 过滤出与删除uid不相等的图片
     this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 文件修改，上传成功，失败时触发
    onChange (file,fileList) {
      // console.log(file)
      // console.log(fileList.length) // 1 0
      // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
    // [] => [...fileList] [] => fileList.map()
    // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功 过程 有数据 --> 没有数据 --> 有数据
      this.fileList = fileList.map(item => item)
      // console.log(this.fileList)
    },
    // 上传文件之前检查
    beforeUpload (file) {
      // file是正在上传的文件
      // console.log(file) 1M = 1024kb 1kb = 1024b
     const maxSize = 5 * 1024 * 1024
     const listType = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (file.size > maxSize) {
        this.$message.error('文件大小不能超过5M')
        return false // 停止上传
      } else if (!listType.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false // 停止上传
      }
      // 如果上面两个条件都满足
      // 记录下要上传文件的uid
      this.currentFileUid = file.uid
      return true // 这里一定要返回true 不写的话函数默认值返回undefined 转为boolean还是为false
    },
    // http-request：upload 覆盖默认的上传行为，可以自定义上传的实现（action和header等等）
    upload (params) {
      // 这里执行上传动作调用上传腾讯云
      // 回调函数接收一个参数 里面包含了文件对象file headers data 等信息
      // console.log(params)
      if (params.file) {
        // 如果有文件对象
        this.progressShow = true
         cos.putObject({
           Bucket: 'hr106-1302820565', // 存储桶的名称
           Region: 'ap-chengdu', // 地域
           Key: params.file.name, // 文件名
           Body: params.file, // 要上传的对象
           StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
           onProgress: (params) => {
            //  console.log(params)
            // params里 的percent是不断变化的从0-1代表进度
            this.percent = params.percent * 100
           }
           // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
         },(err, data) => {
          //  console.log(data)
          // data中有一个statusCode === 200 的时候说明上传成功
          if (!err && data.statusCode === 200) {
            // 此时说明文件上传成功  要获取成功的返回地址
            // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址(现在是本地的地址)变成 现在上传成功的地址
            // 目前虽然是一张图片 但是请注意 我们的fileList是一个数组
            // 需要知道当前上传成功的是哪一张图片
           this.fileList = this.fileList.map(item => {
             if ( item.uid === this.currentFileUid) {
               // 去找谁的uid等于刚刚记录下来的id
               return { url: 'http://' + data.Location, upload: true }
             }
             // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
             // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
            //  没找到将原数据返回
             return item
            })
          setTimeout(()=>{
            // 不管err还是成功都会走到这里
            // 隐藏进度条
            this.progressShow = false
            // 重置进度条百分比
            this.percent = 0
          }, 2000)
           // 将上传成功的地址 回写到了fileList中 fileList变化  =》 upload组件 就会根据fileList的变化而去渲染视图
          }
         })
      }
    }
  }
}
</script>
<style>
/* 这里style不能加scoped 否则样式不生效 */
.disabled .el-upload--picture-card {
  display: none;
}
.el-progress-bar {
  width: 180px;
}
</style>