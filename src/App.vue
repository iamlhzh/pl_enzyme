<template>
  <div id="app">
    <el-container>
      <el-header v-if="true">
        <window-top></window-top>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer v-if="false">版权所有 © 2010-2017 大工酶设计京ICP备 15050778号
        <br>
        Copyright © 2010-2019 DaGong Technology Co., Ltd. All Rights Reserved.
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import windowTop from './components/windowTop'
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
    windowTop
  },
  methods: {
    getHeight () {

    }
  },
  created () {
  },
  mounted () {
    var orderHight = window.screen.height
    document.getElementById('app').style.height = orderHight - 170 + 'px'
    var orderWidth = window.screen.width
    document.getElementById('app').style.width = orderWidth - 10 + 'px'
  },
  destroyed () {
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: white;
  height: 100%;
  /* overflow: auto; */
}
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  height: 10%;
  width: 100%;
}
.el-main {
  color: white;
  text-align: center;
  height: 80%;
}
.el-footer {
  /* background-color: blue; */
  height: 10%;
}
</style>
