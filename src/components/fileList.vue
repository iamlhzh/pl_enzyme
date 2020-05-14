<template>
  <div class="fileList">
    <div class="upLoad">
      <el-button
        type="text"
        @click="openUpLoadDialog"
      >上传文件</el-button>
    </div>
    <div class="treeList">
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
        <span
          class="custom-tree-node"
          slot-scope="{ node, data }"
        >
          <span>{{ node.label }} &nbsp;&nbsp;&nbsp;<span
              style="color:blue"
              v-show="!data.isDirectory"
            >{{ data.fileSize | fileSizeFormat }}</span></span>

          <span>
            <el-button
              v-if="!data.isDirectory"
              type="text"
              size="mini"
              @click="() => downLoadFile(data)"
            >
              下载
            </el-button>
            <el-button
              v-if="!data.isDirectory && data.suffix === 'mp4'"
              type="text"
              size="mini"
              @click="() => playFile(data)"
            >
              播放
            </el-button>
            <!-- <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          >
            Delete
          </el-button> -->
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog
      title="文件上传"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="upLoadDialogClose()"
    >
      <div class="uploadDialog">
        <el-form
          ref="form"
          :model="form"
          label-width="180px"
          :rules="rules"
        >
          <el-form-item
            label="上传目录"
            prop="fileDirectory"
          >
            <el-input
              v-model="form.fileDirectory"
              placeholder="可以手动输入目录,可不输入,默认是根目录"
              style="width:80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择目录">
            <el-cascader
              :options="options"
              :props="{ checkStrictly: true,value:'fileName',label:'fileName',children:'childrenFileList' }"
              @change="handleChange"
              clearable
              style="width:80%"
              placeholder="请选择文件要上传的目录,可不选择,默认是根目录"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="选择上传的文件"
            size="medium"
            prop="files"
            style="height:150px;align:left"
          >
            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :http-request=getFile
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :on-exceed="handleExceed"
              :on-success="uploadSuccess"
              :on-progress="upLoadProgress"
              :limit="upLoadLimit"
              :file-list="form.files"
            >
              <el-button
                size="small"
                type="primary"
                style="margin-bottom:20px"
              >选取文件</el-button>
            </el-upload>
            <el-dialog :visible.sync="imgDialogVisible">
              <img
                width="100%"
                :src="dialogImageUrl"
                alt=""
              >
            </el-dialog>
          </el-form-item>
          <!-- <el-form-item
            label=""
            prop=""
          >

          </el-form-item> -->
          <el-form-item label-width="200px">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="uploadFileList('form')"
            >确 定</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-dialog>
    <el-dialog
      title="文件上传进程"
      :visible.sync="upLoadProgressdialogVisible"
      width="50%"
      @close="upLoadProgressDialogClose()"
    >
      <div style="height:200px">
        <div v-show="progressShow">{{showUpLoadRate}}</div>
        <div v-show="progressShow">{{showLoaded}}/{{showTotal}}</div>
        <div v-show="progressShow">已经上传时间:{{showAlreadyTime}}</div>
        <div v-show="progressShow">预计还要时间:{{showLeftTime}}</div>
        <el-progress
          style="width:80%;margin-left:50px"
          :percentage="percentage"
          :color="colors"
          v-show="progressShow"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import * as FileSaver from 'file-saver'
import Vue from 'vue';
// 定义一个 Vue 全局的过滤器，名字叫做  msgFormat
Vue.filter('fileSizeFormat', function (size) {
  var returnSizeString = '';
  var fileSize = 0;
  if (size < 1024) {
    fileSize = size
    returnSizeString = fileSize.toFixed(2) + 'B'
  } else if (size < 1024 * 1024) {
    fileSize = size / 1024
    returnSizeString = fileSize.toFixed(2) + 'KB'
  } else if (size < 1024 * 1024 * 1024) {
    fileSize = size / 1024 / 1024
    returnSizeString = fileSize.toFixed(2) + 'MB'
  } else {
    fileSize = size / 1024 / 1024 / 1024
    returnSizeString = fileSize.toFixed(2) + 'GB'
  }
  return returnSizeString;
})
export default {
  data () {
    var validatefileDirectory = (rule, value, callback) => {
      var patt1 = /[\\:\*\?<>\|]+/
      if (patt1.test(value)) {
        callback(new Error('文件目录名称不能包含' + '\\/:*?<>|字符'))
      }
      callback()
    }
    var validatefiles = (rule, value, callback) => {
      console.log(value.length)
      if (value.length === 0) {
        callback(new Error('请选取要上传文件'))
      }
      callback()
    }
    return {
      form: {
        file: {},
        fileDirectory: '',
        files: [],
        fileList: new FormData()
      },
      rules: {
        fileDirectory: [
          { required: false, validator: validatefileDirectory, trigger: 'blur' }
        ],
        files: [
          { required: true, validator: validatefiles, trigger: 'blur' }
        ]
      },
      upLoadLimit: 3,
      data: [],
      options: [],
      dialogVisible: false,
      imgDialogVisible: false,
      dialogImageUrl: '',
      defaultProps: {
        children: 'childrenFileList',
        label: 'fileName'
      },
      percentage: 0,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      progressShow: false,
      total: 0,
      loaded: 0,
      upLoadRate: 0,
      lastloaded: 0,
      lastTime: 0,
      initialTime: 0,
      alreadyTime: 0,
      leftTime: 0,
      showTotal: '',
      showLoaded: '',
      showAlreadyTime: '',
      showLeftTime: '',
      showUpLoadRate: '0B/s',
      upLoadProgressdialogVisible: false

    }
  },
  methods: {
    getFile (item) {
      console.log(item.file)
      this.form.file = item.file
      this.form.files.push(item.file)
      this.form.fileList.append('fileList', item.file)
    },
    upload () {
      const fd = new FormData()
      fd.append('filename', this.form.file)
      fd.append('fileDirectory', this.form.fileDirectory)
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.axios.post(process.env.API_ROOT + 'upLoad/upLoadFile', fd, config).then((response) => {
        console.log(response)
        if (response.data.code === '000') {
          this.dialogVisible = false
          this.percentage = 0;
          this.$message(response.data.msg)
          this.getFileList()
        }
      })
    },
    uploadFileList (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.upLoadProgressdialogVisible = true
          this.dialogVisible = false
          this.form.fileList.append('fileDirectory', this.form.fileDirectory)
          console.log(this.form.fileList)
          const config = { headers: { 'Content-Type': 'multipart/form-data' } }
          this.progressShow = true
          this.lastTime = new Date().getTime();
          this.initialTime = new Date().getTime();
          this.axios.post(process.env.API_ROOT + 'upLoad/upLoadFileList', this.form.fileList,
            {
              "Content-Type": 'multipart/form-data',
              onUploadProgress: progressEvent => {
                console.log(progressEvent);
                console.log(progressEvent.lengthComputable);
                if (progressEvent.lengthComputable) {
                  let val = parseInt(
                    (
                      (progressEvent.loaded / progressEvent.total) * 100
                    ).toFixed(0)
                  );
                  console.log(new Date().getTime())
                  //文件整体大小B
                  var all = progressEvent.total
                  //已经上传大小B
                  var already = progressEvent.loaded
                  //当前时间ms
                  var nowTime = new Date().getTime();
                  //与上次间隔时间ms
                  var intervalTime = nowTime - this.lastTime;
                  //上传速度B/ms相当于KB/s
                  if (intervalTime > 0) {
                    var uploadNow = (already - this.lastloaded) / intervalTime;
                  } else {
                    var uploadNow = (already - this.lastloaded) / 1;
                  }
                  //重新赋值上次时间,留待下次使用ms
                  this.lastTime = nowTime;
                  //已经上传时间ms
                  this.alreadyTime = nowTime - this.initialTime;
                  //剩余时间ms
                  if (uploadNow > 0) {
                    this.leftTime = (all - already) / uploadNow
                  } else {
                    this.leftTime = (all - already) / 1
                  }
                  //对已经上传时间做处理
                  this.showAlreadyTime = this.dealTime(this.alreadyTime)
                  this.showLeftTime = this.dealTime(this.leftTime)
                  //对剩余时间做处理
                  //对显示文件大小处理
                  this.showTotal = this.dealFileSize(all);
                  // if (all < 1024) {
                  //   this.total = all
                  //   this.showTotal = this.total.toFixed(2) + 'B'
                  // } else if (all < 1024 * 1024) {
                  //   this.total = all / 1024
                  //   this.showTotal = this.total.toFixed(2) + 'KB'
                  // } else if (all < 1024 * 1024 * 1024) {
                  //   this.total = all / 1024 / 1024
                  //   this.showTotal = this.total.toFixed(2) + 'MB'
                  // } else {
                  //   this.total = all / 1024 / 1024 / 1024
                  //   this.showTotal = this.total.toFixed(2) + 'GB'
                  // }
                  //对已经上传大小做处理
                  this.showLoaded = this.dealFileSize(already);
                  // if (already < 1024) {
                  //   this.loaded = already
                  //   this.showLoaded = this.loaded.toFixed(2) + 'B'
                  // } else if (already < 1024 * 1024) {
                  //   this.loaded = already / 1024
                  //   this.showLoaded = this.loaded.toFixed(2) + 'KB'
                  // } else if (already < 1024 * 1024 * 1024) {
                  //   this.loaded = already / 1024 / 1024
                  //   this.showLoaded = this.loaded.toFixed(2) + 'MB'
                  // } else {
                  //   this.loaded = already / 1024 / 1024 / 1024
                  //   this.showLoaded = this.loaded.toFixed(2) + 'GB'
                  // }
                  if (uploadNow < 0) {
                    this.showUpLoadRate = '0B/s'
                  } else if (uploadNow < 1) {
                    this.upLoadRate = uploadNow * 1024
                    this.showUpLoadRate = this.upLoadRate.toFixed(2) + 'B/s'
                  } else if (uploadNow < 1024) {
                    this.upLoadRate = uploadNow
                    this.showUpLoadRate = this.upLoadRate.toFixed(2) + 'KB/s'
                  } else if (uploadNow < 1024 * 1024) {
                    this.upLoadRate = uploadNow / 1024
                    this.showUpLoadRate = this.upLoadRate.toFixed(2) + 'MB/s'
                  } else {
                    this.upLoadRate = uploadNow / 1024 / 1024
                    this.showUpLoadRate = this.upLoadRate.toFixed(2) + 'GB/s'
                  }
                  this.lastloaded = progressEvent.loaded;
                  console.log(val);
                  this.percentage = val

                }
              }
            }
          ).then((response) => {
            console.log(response)
            if (response.data.code === '000') {

              this.upLoadProgressdialogVisible = false
              this.$message(response.data.msg)
              this.getFileList()
            }
          })
        } else {
          return false
        }
      })
    },
    dealFileSize (size) {
      var returnSizeString = '';
      var fileSize = 0;
      if (size < 1024) {
        fileSize = size
        returnSizeString = fileSize.toFixed(2) + 'B'
      } else if (size < 1024 * 1024) {
        fileSize = size / 1024
        returnSizeString = fileSize.toFixed(2) + 'KB'
      } else if (size < 1024 * 1024 * 1024) {
        fileSize = size / 1024 / 1024
        returnSizeString = fileSize.toFixed(2) + 'MB'
      } else {
        fileSize = size / 1024 / 1024 / 1024
        returnSizeString = fileSize.toFixed(2) + 'GB'
      }
      return returnSizeString;
    },
    dealTime (time) {//time是毫秒
      var returnTimeString = ''
      if (time < 1000) {//小于1s
        var ms = time.toFixed(2)
        returnTimeString = ms + 'ms'
      } else if (time < 1000 * 60) {//小于1min
        var sec = (time / 1000).toFixed(2)
        returnTimeString = sec + 's'
      } else if (time < 1000 * 60 * 60) {//小于1h
        var min = Math.floor(time / 1000 / 60)
        var sec = (time / 1000 - min * 60).toFixed(2)
        returnTimeString = min + 'min' + sec + 's'
      } else if (time < 1000 * 60 * 60 * 24) {//小于1d
        var h = Math.floor(time / 1000 / 60 / 60)
        var min = Math.floor(time / 1000 / 60 - h * 60)
        var sec = (time / 1000 - h * 60 * 60 - min * 60).toFixed(2)
        returnTimeString = h + 'hour' + min + 'min' + sec + 's'
      } else {
        var d = Math.floor(time / 1000 / 60 / 60 / 24)
        var h = Math.floor(time / 1000 / 60 / 60 - d * 24)
        var min = Math.floor(time / 1000 / 60 - h * 60 - d * 24 * 60)
        var sec = (time / 1000 - d * 24 * 60 * 60 - h * 60 * 60 - min * 60).toFixed(2)
        returnTimeString = d + 'day' + h + 'hour' + min + 'min' + sec + 's'
      }
      return returnTimeString;
    },
    upLoadDialogClose () {
      this.$refs.upload.clearFiles()
      this.dialogVisible = false
      this.form.fileList = new FormData()
      this.form.files = []
      console.log('upLoadDialogClose')
    },
    upLoadProgressDialogClose () {
      this.progressShow = false
    },
    openUpLoadDialog () {
      this.percentage = 0
      this.dialogVisible = true
      this.getDirectoryList()
    },
    handleChange (value) {
      console.log(value)
      this.form.fileDirectory = ''
      var i = 1
      value.forEach(element => {
        if (element === '/') {
          this.form.fileDirectory = element
        } else {
          if (i === 1) {
            this.form.fileDirectory = element
            i++
          } else {
            this.form.fileDirectory = this.form.fileDirectory + '/' + element
          }
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    uploadSuccess (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      console.log(this.form.fileList)
      console.log('上传成功')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      console.log(1)
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.imgDialogVisible = true
      console.log(file)
    },
    handleExceed (files, fileList) {
      console.log(3)
      var all = files.length + fileList.length
      this.$message.warning('当前限制选择 ' + this.upLoadLimit + ' 个文件，本次选择了 ' + files.length + ' 个文件，共选择了 ' + all + ' 个文件')
    },
    upLoadProgress (event, file, fileList) {

    },
    beforeRemove (file, fileList) {
      console.log(4)
      // return this.$confirm('确定移除 ${file.name}');
    },
    handleNodeClick (data) {
      console.log(data)
      // if (data.isDirectory) {

      // } else {
      //   this.downLoadFile(data)
      // }
    },
    getFileList () {
      this.axios.get(process.env.API_ROOT + 'fileList/getFileList').then((response) => {
        console.log(response)
        if (response.data.code === '000') {

          this.data = response.data.obj
        }
      })
    },
    getDirectoryList () {
      this.axios.get(process.env.API_ROOT + 'fileList/getDirectoryList').then((response) => {
        console.log(response)
        if (response.data.code === '000') {
          var base = { fileName: '/', isDirectory: true, childrenFileList: null }
          var list = response.data.obj[0].childrenFileList
          list.unshift(base)
          this.options = list
        }
      })
    },
    downLoadFile (data) {
      var path = encodeURI(data.fileAbsolutePath)
      window.location.href = process.env.API_ROOT + 'file/downfileByAbsolutePath?fileAbsolutePath=' + path
      // var fileName = data.fileName
      // this.axios({
      //   method: 'POST',
      //   url: process.env.API_ROOT + 'file/downfileByAbsolutePath?fileAbsolutePath=' + path,
      //   responseType: 'blob'
      // })
      //   .then(res => {
      //     console.log(res)
      //     let blob = new Blob([res.data])
      //     FileSaver.saveAs(blob, fileName)
      //   })
      //   .catch(err => {
      //     this.$message('请求失败！')
      //     console.log(err)
      //   })
    },
      playFile (data) {
      console.log(data)
      this.$router.push({
        name: 'playVideo',
        query: {
          videoName: data.fileName,
          videoUrl:data.fileUrl
        }
      })
    }
  },
  created () {
    this.getFileList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fileList .treeList{
  min-height: 550px;
}
.fileList .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.fileList .uploadDialog {
  /* border: 1px solid red; */
  width: 100%;
  height: 350px;
}
</style>
