<template>
  <div class="playVideo">
    <h1>{{videoInfo.videoName}}</h1>
    <video width="320" height="240" controls>
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

  },
  created () {
    this.videoInfo.videoName = this.$route.query.videoName
    this.videoInfo.videoUrl = this.$route.query.videoUrl
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
