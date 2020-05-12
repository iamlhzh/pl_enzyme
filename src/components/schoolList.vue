<template>
  <div class="schoolList">
    <el-row>
      <el-col :span="8" v-for="item in schoolList" :key="item.abbreviation">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="item.imgUrl" class="image" @click="goToSchool(item.abbreviation)">
          <div style="padding: 1px;">
            <!-- <span>{{item.name}}</span> -->
            <div class="bottom clearfix">
              <el-button type="text"  @click="goToSchool(item.abbreviation)" class="button">进入</el-button>
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
      schoolList: []
    }
  },
  methods: {
    goToSchool (abbreviation) {
      console.log(abbreviation)
      this.$router.push({
        name: 'courseList',
        params: {
          abbreviation: abbreviation
        },
        query: {
          adminLte: 'no'
        }
      })
    },
    getAllSchool () {
      this.axios.get(process.env.API_ROOT + 'school/getAllSchool').then((response) => {
        console.log(response)
        if (response.data.code === 'SCOM0000') {
          this.schoolList = response.data.obj
        }
      })
    }
  },
  created () {
    this.getAllSchool()
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
    /* width: 164px;
    height: 60px; */
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
