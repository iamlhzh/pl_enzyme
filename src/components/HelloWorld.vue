<template>
  <div class="hello">
    <!-- <el-carousel
      type="card"
      :interval="1000"
      arrow="always"
      height="800px"
    >
      <el-carousel-item
        v-for="item in lunboList"
        :key="item.id"
      >
        <el-link :href="item.url">
          <el-image
            style="width: 60%; height: 60%"
            :src="item.img"
          ></el-image>
        </el-link>
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script>
import t1 from '../images/background/6.jpg'
import t2 from '../images/background/7.jpg'
import t3 from '../images/background/8.jpg'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lunboList: [
        { id: '1', url: 'http://47.94.19.131', img: t1 },
        { id: '2', url: 'http://47.94.19.131', img: t2 },
        { id: '3', url: 'http://47.94.19.131', img: t3 }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item:nth-child(2n) {
  height: 655px;
  background-color: #99a9bf;
  /* background-image: url("../images/background/4.jpg"); */
}
.el-carousel__item:nth-child(2n + 1) {
  height: 655px;
  background-color: #d3dce6;
  /* background-image: url("../images/background/ma.png"); */
}
.hello {
  min-height: 550px;
  width: 100%;
  height: 100%;
  /* background-image: url("../images/background/3.jpg"); */
  /* background-repeat:no-repeat; */
}
h1 {
  margin: 0;
}
.hello .el-carousel__container {
  height: 655px;
}
</style>
