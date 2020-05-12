<template>
  <div class="courseList">
<h1>课程列表</h1>
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
      const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      this.axios.post(process.env.API_ROOT + 'course/getAllCourse', params, config).then((response) => {
        console.log(response)
        if (response.data.code === 'SCOM0000') {
          this.schoolList = response.data.obj
        }
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

</style>
