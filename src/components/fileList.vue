<template>
  <div class="fileList">
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      default-expand-all
    >
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
      >
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="!data.isDirectory"
            type="text"
            size="mini"
            @click="() => downLoadFile(data)"
          >
            下载
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
</template>

<script>
import * as FileSaver from 'file-saver'
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'childrenFileList',
        label: 'fileName'
      }
    }
  },
  methods: {
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
    downLoadFile (data) {
      var path = encodeURI(data.fileAbsolutePath)
      var fileName = data.fileName
      this.axios({
        method: 'POST',
        url: process.env.API_ROOT + 'file/downfileByAbsolutePath?fileAbsolutePath=' + path,
        responseType: 'blob'
      })
        .then(res => {
          console.log(res)
          let blob = new Blob([res.data])
          FileSaver.saveAs(blob, fileName)
        })
        .catch(err => {
          this.$message('请求失败！')
          console.log(err)
        })
      // this.axios.get(process.env.API_ROOT + 'file/downfile?fileName=1.txt').then((response) => {

      // })
    }
  },
  created () {
    this.getFileList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fileList {
  min-height: 550px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
