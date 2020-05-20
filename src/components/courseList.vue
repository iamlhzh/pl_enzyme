<template>
  <div class="courseList">
<h1>课程列表</h1>
    <el-row>
      <el-col :span="8" v-for="item in courseList" :key="item.id">
        <el-card>
          <img :src="item.bigPhoto" class="image">
          <div style="padding: 1px;">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <el-button type="text"  class="button" @click="toDownLoadCourse(item)">去下载</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
        <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="psize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

    <el-dialog
  :title="dialogCourseData.courseName"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
      <el-table
      :data="dialogCourseData.termList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseId"
        label="courseId"
        width="180">
      </el-table-column>
      <el-table-column
        prop="text"
        label="授课时间">
      </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">下载该版本</el-button>
      </template>
    </el-table-column>
    </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      abbreviation: '',
      courseList: [],
      psize: 21,
      total: 0,
      currentPage: 1,
      dialogVisible: false,
      dialogCourseData: {
        id: '',
        courseName: '',
        termList: []
      }

    }
  },
  methods: {
    // goToSchool (abbreviation) {
    //   console.log(abbreviation)
    // },
    handleClose () {
      this.dialogVisible = false
      this.dialogCourseData = {
        id: '',
        courseName: '',
        termList: []
      }
    },
    handleCurrentChange () {
      var params = {
        courseStatus: 30,
        abbreviation: this.abbreviation,
        p: this.currentPage,
        psize: 21,
        type: 1
      }
      this.getAllCourse(params)
    },
    getAllCourse (params) {
      const config = { headers: { 'Content-Type': 'application/json' } }
      this.axios.post(process.env.API_ROOT + 'course/getAllCourse', params, config).then((response) => {
        console.log(response)
        if (response.data.code === 'SCOM0000') {
          this.courseList = response.data.obj.result.list
          this.total = response.data.obj.result.query.totleCount
          this.currentPage = response.data.obj.result.query.pageIndex
        }
      })
    },
    toDownLoadCourse (item) {
      this.dialogVisible = true
      console.log(item.schoolSN + '-' + item.id)
      var schoolCourseId = item.schoolSN + '-' + item.id
      this.axios.get(process.env.API_ROOT + 'course/getCourseVersions?schoolCourseId=' + schoolCourseId).then((response) => {
        console.log(response)
        this.dialogCourseData.id = response.data.obj.id
        this.dialogCourseData.courseName = response.data.obj.courseName
        this.dialogCourseData.termList = response.data.obj.termList
      })
    },
    handleClick (item) {
      console.log(item)
      var params = {
        id: item.id,
        courseName: this.dialogCourseData.courseName + '（' + item.text + '版）'
      }
      const config = { headers: { 'Content-Type': 'application/json' } }
      this.axios.post(process.env.API_ROOT + 'crawler/crawlerCourseByCourse', params, config).then((response) => {
        console.log(response)
      })
      this.handleClose()
    }
    // downLoadCourse (item) {
    //   console.log(item.schoolSN + '-' + item.id)
    //   var schoolCourseId = item.schoolSN + '-' + item.id
    //   this.axios.get(process.env.API_ROOT + 'crawler/crawlerCourse?schoolCourseId=' + schoolCourseId).then((response) => {
    //     console.log(response)
    //   })
    // }
  },
  created () {
    this.abbreviation = this.$route.params.abbreviation
    console.log(this.abbreviation)
    var params = {
      courseStatus: 30,
      abbreviation: this.$route.params.abbreviation,
      p: 1,
      psize: 21,
      type: 1
    }
    this.getAllCourse(params)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .courseList .bottom {
    margin-top: 3px;
    line-height: 12px;
  }

  .courseList .button {
    padding: 0;
    float: right;
  }

  .courseList .image {
    width:88%;
    display: inline;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
