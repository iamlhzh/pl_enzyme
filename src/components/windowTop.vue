<template>
  <div class="windowTop">
    <div class="topImg">
      <!-- 公司logo以及二维码 -->
      <div class="mylogo">
        <img
          style="width: 267px; height: 150px;"
          src="../assets/mylogonobg.png"
        >
      </div>
      <div class="myName">
        <img
          style="width: 600px; height: 150px;"
          src="../assets/myNamewhitescreennbg.png"
        >
      </div>
      <div class="myewm">
        <el-image
          style="width: 151px; height: 150px;"
          :src="url2"
        ></el-image>
      </div>
      <div class="myewm">
        <el-image
          style="width: 151px; height: 150px;"
          :src="url2"
        ></el-image>
      </div>
      <!-- logo -->
    </div>
    <div class="navbar">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        active-text-color=white
        router
        background-color=#545c64
      >
        <el-menu-item index="HelloWorld">公司简介</el-menu-item>
        <el-submenu index="product">
          <template slot="title">产品介绍</template>
          <el-menu-item index="molecularDocking">分子对接</el-menu-item>
          <el-menu-item index="proteinActivity">蛋白质活性</el-menu-item>
          <el-menu-item index="molecularDynamics">分子动力学分析</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">药物设计</template>
            <el-menu-item index="enzymeDesign">酶设计</el-menu-item>
            <el-menu-item index="drugTesting">药物检测</el-menu-item>
            <el-menu-item index="processPlanning">工艺设计</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="case">案例分享</el-menu-item>
        <el-menu-item index="contactUS"><a>联系我们</a></el-menu-item>
        <el-menu-item index="fileList"><a>文件中心</a></el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import t1 from '../images/mylogo.jpg'
import t2 from '../images/ewm.jpg'
import t3 from '../images/myNamewhitescreen.jpg'
export default {
  name: 'windowTop',
  data () {
    return {
      url: t1,
      url2: t2,
      url3: t3
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
.windowTop {
  width: 100%;
  background-image: url("../images/background/2.jpg");
  /* background-repeat: no-repeat; */
  /* background-position: center; */
}
.windowTop .topImg {
  /* border: 1px solid red; */
  /* background-color: red; */
  width: 100%;
  height: 150px;
  /* position: inherit; */
  /* overflow: scroll; */
}
.windowTop .topImg .mylogo {
  /* border: 1px solid black; */
  /* background-color: red; */
  width: 267px;
  height: 150px;
  margin: 0px;
  float: left;
}
.windowTop .topImg .myewm {
  /* border: 1px solid black; */
  /* background-color: red; */
  width: 151px;
  height: 150px;
  margin-right: 20px;
  float: right;
}
.windowTop .topImg .myName {
  /* border: 1px solid black; */
  width: 600px;
  height: 150px;
  float: left;
  margin-left: 120px;
}
.windowTop .navbar {
  /* border: 1px solid blue; */
  /* background-color: red; */
  width: 100%;
  height: 65px;
  margin-top: 5px;
  align-self: center;
}
.windowTop .navbar .el-menu-item {
  padding: 0px 102px;
}
.windowTop .navbar .el-menu-demo .el-menu-item {
  width: 20%;
}
.windowTop .navbar .el-menu-demo .el-submenu {
  width: 20%;
}
</style>
