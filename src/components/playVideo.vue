<template>
    <div class='playVideo'>
        <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions">
        </video-player>
    </div>
</template>

<script>
export default {
  data () {
    return {
      playerOptions: {
        // 播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0],
        // 如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [{
          // 类型
          type: 'video/mp4',
          // url地址
          src: ''
        }],
        // 你的封面地址
        poster: '',
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          // 全屏按钮
          fullscreenToggle: true
        }
      }

    }
  },

  methods: {
    goToTitle () {
      document.documentElement.scrollTop = 260
    }

  },
  created () {
    this.playerOptions.sources[0].src = this.$route.query.videoUrl
    // this.playerOptions.sources[0].src = 'http://baymax.wang/file/download/西方文学作品导读_北京大学_中国大学MOOC（慕课）（2019年10月15日-2020年01月31日版）/第一部分_关于阅读——一些被遗忘的常识性忠告（开场白）/gushi.mp4'
    this.goToTitle()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .playVideo{
    display: inline-block;
    width:70%;
    height: auto;
    text-align: center;
    line-height: 100px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  /* .playVideo:hover{
    display: block;
  } */
</style>
