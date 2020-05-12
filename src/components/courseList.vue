<template>
  <div class="courseList">
<h1>课程列表</h1>
    <el-row>
      <el-col :span="8" v-for="item in courseList" :key="item.id">
        <el-card>
          <img :src="item.bigPhoto" class="image">
          <div style="padding: 1px;">
            <!-- <span>{{item.name}}</span> -->
            <div class="bottom clearfix">
              <el-button type="text"  class="button" @click="downLoadCourse(item)">下载</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      abbreviation: '',
      courseList: []
    }
  },
  methods: {
    // goToSchool (abbreviation) {
    //   console.log(abbreviation)
    // },
    getAllCourse (params) {
      const config = { headers: { 'Content-Type': 'application/json' } }
      this.axios.post(process.env.API_ROOT + 'course/getAllCourse', params, config).then((response) => {
        console.log(response)
        if (response.data.code === 'SCOM0000') {
          this.courseList = response.data.obj.result.list
        }
      })
    },
    downLoadCourse (item) {
      console.log(item.schoolSN + '-' + item.id)
      var schoolCourseId = item.schoolSN + '-' + item.id
      this.axios.get(process.env.API_ROOT + 'crawler/crawlerCourse?schoolCourseId=' + schoolCourseId).then((response) => {
        console.log(response)
      })
    }
  },
  created () {
    this.abbreviation = this.$route.params.abbreviation
    console.log(this.abbreviation)
    var params = {
      courseStatus: 30,
      abbreviation: this.$route.params.abbreviation,
      p: 1,
      psize: 20,
      type: 1
    }
    this.getAllCourse(params)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bottom {
    margin-top: 3px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
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
