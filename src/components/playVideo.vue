<template>
  <div class="playVideo">
    <h1>{{videoInfo.videoName}}</h1>
    <video class="videoClass"  controls>
  <source :src="videoInfo.videoUrl" type="video/mp4">
</video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoInfo: {
        videoName: '',
        videoUrl: ''
      }
    }
  },
  methods: {
    goToTitle () {
      document.documentElement.scrollTop = 260
    }

  },
  created () {
    this.videoInfo.videoName = this.$route.query.videoName
    this.videoInfo.videoUrl = this.$route.query.videoUrl
    this.goToTitle()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.playVideo .videoClass{
/* width:100%; */
max-width: 1250px;
max-height:666px;
}
</style>
