<template>
  <div class="foot">
    <div class="container">
      <div class="row">
        <div class="content">
          <h4>热门产品</h4>
          <ul>
            <li><a href="http://www.wecomput.com/product/vfruit/">vFruit</a></li>
            <li><a href="http://www.wecomput.com/product/hardware/">GPUserver</a></li>
            <li><a href="http://www.wecomput.com/product/find-target/">vTarget</a></li>
            <li><a href="#">vLab</a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>
        <div class="content">
          <h4>热门服务</h4>
          <ul>
            <li><a href="http://www.wecomput.com/molecular-dynamics/">分子动力学模拟</a></li>
            <li><a href="http://www.wecomput.com/docking/">分子对接</a></li>
            <li><a href="http://www.wecomput.com/homology-modeling/">同源模建</a></li>
            <li><a href="http://www.wecomput.com/virtual_screening/">虚拟筛选</a></li>
            <li><a href="#">量化计算</a></li>
          </ul>
        </div>
        <div class="content">
          <h4>其他业务</h4>
          <ul>
            <li><a href="http://www.wecomput.com/other/hardware/">硬件解决方案</a></li>
            <li><a href="http://www.wecomput.com/other/training/">软件和技术培训</a></li>
            <li><a href="http://www.wecomput.com/other/sciservice/">科研周边服务</a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>
        <div class="content">
          <h4>微信公众号</h4>
          <ul>
            <li><img
                src="../assets/ewm.jpg"
                alt="二维码"
              ></li>
          </ul>
        </div>
        <div class="content">
          <h4>联系我们</h4>
          <ul>
            <li><i class="fa fa-phone fa-fw"></i> 电话：<a href="#">999-999-9999</a></li>
            <li><i class="fa fa-envelope fa-fw"></i> 邮箱：<a href="mailto:info@wecomput.com">enzyme@163.com</a></li>
            <li><i class="fa fa-map-signs fa-fw"></i> 地址：<a href="#">大连市凌水路屹馨南街60号</a></li>
          </ul>
        </div>
      </div>
      <hr>
      <div class="row2">
        <div class="centered">
          <p>
            版权所有 © 2010-2017 大工酶设计京ICP备 15050778号
            <br>Copyright © 2010-2019 DaGong Technology Co., Ltd. All Rights Reserved.<br> </p>
        </div><!-- .footer-text -->

      </div><!-- .row -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'myFooter',
  data () {
    return {
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
.foot {
  background-color: #222;
  height: 350px !important;
  width: 100%;
  /* border: 5px solid green; */
  color: #777;
}
.foot .container {
  height: 300px !important;
  position: relative;
  width: 90%;
  /* border: 5px solid yellow; */
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}
.foot .container .row {
  height: 75% !important;
  line-height: 1.667;
  width: 100%;
  /* border: 5px solid red; */
}
.foot .container .row2 {
  height: 20%;
  line-height: 1.667;
  width: 100%;
  /* border: 5px solid orangered; */
}
.foot .container .row .content {
  width: 20%;
  float: left;
  /* position: relative; */
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  /* border: 5px solid blue; */
}
.centered {
  height: 100%;
  text-align: center;
  /* border: 5px solid black; */
  float: center;
}
</style>
