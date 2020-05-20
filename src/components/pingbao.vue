<template>
  <div
    class="pingbao"
    style="border: 25px solid green;"
  >
    <!-- <h1>Hello,World! Now, We are coming!</h1> -->
    <div
      id="t1"
      style="width:10px;height:10px"
    >
      <el-image
        id="t2"
        :src="url"
        style="width:10px;height:10px"
      ></el-image>
    </div>
    <!-- <el-image
      :style="t2Style"
      :src="url"
      :fit="fit"
    ></el-image>
    <el-image
      :style="t3Style"
      :src="url"
      :fit="fit"
    ></el-image>
    <el-image
      :style="t4Style"
      :src="url"
      :fit="fit"
    ></el-image> -->
  </div>
</template>

<script>
import t1 from '../images/background/6.jpg'
import $ from 'jquery'
export default {
  name: 'index',
  data () {
    return {
      url: t1
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
var xin = true
var yin = true
var step = 10
var delay = 100
$(function () {
  var $obj1 = $('#t1')
  var time = window.setInterval(move, delay)
  $obj1.mouseover(function () {
    clearInterval(time)
  })
  $obj1.mouseout(function () {
    time = window.setInterval(move, delay)
  })
})
function move () {
  var $obj11 = $('#t1')
  var left = $obj11.offset().left
  var top = $obj11.offset().top
  var L = 0 // 左边界和顶部边界
  var T = 0
  var R = $('.index').width() - $obj11.width() // 右边界
  var B = $('.index').height() - $obj11.height() // 下边界
  // 难点:怎样判断广告的4个边框有没有超出可视化范围!
  if (left < L) {
    xin = true // 水平向右移动
  }
  if (left > R) {
    xin = false
  }
  if (top < T) {
    yin = true
  }
  if (top > B) {
    yin = false
  }
  // 根据有没有超出范围来确定广告的移动方向
  left += step * (xin === true ? 1 : -1)
  top += step * (yin === true ? 1 : -1)
  // 给div 元素重新定位
  $obj11.offset({
    top: top,
    left: left
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pingbao {
  width: 100%;
  height: 650px;
  background-image: url("../images/background/dt.gif");
  background-repeat: no-repeat;
  background-position: center;
}
</style>
