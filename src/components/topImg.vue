<template>
  <div class="index">
    <div class="topImg">
      <!-- 公司logo以及二维码 -->
      <div class="mylogo">
        <el-image
          style="width: 267px; height: 150px;"
          :src="url"
          :fit="fit"
        ></el-image>
      </div>
      <!-- <div class="myName">
        大连酶设计公司
      </div> -->
      <div class="myewm">
        <el-image
          style="width: 151px; height: 150px;"
          :src="url2"
          :fit="fit"
        ></el-image>
      </div>
      <div class="myewm">
        <el-image
          style="width: 151px; height: 150px;"
          :src="url2"
          :fit="fit"
        ></el-image>
      </div>
      <!-- logo -->
    </div>
    <div class="Navbar">
      <!-- 公司logo以及二维码 -->
      <!-- logo -->
    </div>
  </div>
</template>

<script>
import t1 from '../images/mylogo.jpg'
import t2 from '../images/ewm.jpg'
export default {
  name: 'index',
  data () {
    return {
      url: t1,
      url2: t2
    }
  },
  methods: {
    // move () {
    //   console.log(this.t1Style.trimRight())
    // }
  },
  created () {
    // this.move()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  width: 100%;
  /* background-image: url("../images/background/dt.gif"); */
  /* background-repeat: no-repeat;
  background-position: center; */
}
.index .topImg {
  /* border: 1px solid red; */
  /* background-color: red; */
  width: 100%;
  height: 150px;
  /* position: inherit; */
  /* overflow: scroll; */
}
.index .topImg .mylogo {
  /* border: 1px solid black; */
  /* background-color: red; */
  width: 267px;
  height: 150px;
  margin: 0px;
  float: left;
}
.index .topImg .myewm {
  /* border: 1px solid black; */
  /* background-color: red; */
  width: 151px;
  height: 150px;
  margin-right: 20px;
  float: right;
}
.index .Navbar {
  border: 1px solid blue;
  /* background-color: red; */
  width: 100%;
  height: 80px;
  margin-top: 5px;
}
</style>
