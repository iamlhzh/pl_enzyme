<template>
  <div id="app">
    <el-container id="container">
      <el-header
        v-if="true"
        id="header"
      >
        <window-top></window-top>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <foot></foot>
        <!-- 版权所有 © 2010-2017 大工酶设计京ICP备 15050778号
        <br>
        Copyright © 2010-2019 DaGong Technology Co., Ltd. All Rights Reserved. -->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import windowTop from './components/windowTop'
import foot from './components/foot'
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true,
      menu: '',
      massage: '',
      contentStyleObj: {
        height: '',
        width: ''
      }
    }
  },
  components: {
    windowTop,
    foot
  },
  methods: {
    getHeight () {

    }
  },
  created () {
  },
  mounted () {
    // var orderHight = window.screen.height
    // document.getElementById('app').style.height = orderHight - 170 + 'px'
    // var orderWidth = window.screen.width
    // document.getElementById('app').style.width = orderWidth - 10 + 'px'
  },
  destroyed () {
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: white;
  /* overflow-y: auto; */
  /* border: 5px solid red; */
}
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  height: 230px !important;
  width: 100% !important;
  /* border: 5px solid black; */
}
.el-main {
  color: white;
  text-align: center;
  width: 100% !important;
  /* height: 55% !important; */
  /* border: 5px solid yellow; */
  /* overflow: auto; */
  padding: 5px;
}
.el-footer {
  /* background-color: blue; */
  height: 300px !important;
  width: 100%;
  /* border: 5px solid black; */
}
#container {
  /* border: 5px solid blue; */
  width: 100% !important;
  /* height: 100%; */
}
</style>
