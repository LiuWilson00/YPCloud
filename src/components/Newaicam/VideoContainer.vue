<template>
  <div class="VideoContainer">
    <video autoplay playsinline class="userVideo" muted src ref="userVideo"></video>
  </div>
</template>
<style lang="scss" scoped>
.VideoContainer {
  width: 100%;
  height: 100%;
  background-color: black;
  justify-content: center;
  align-items: center;
  display: flex;
  .userVideo {
    width: 100%;
    max-width: 1024px;
  }
}

@media screen and (min-width: 420px) and (max-width: 768px) {
  .VideoContainer {
    .userVideo {
      width: 100%;
      max-width: 640px;
    }
  }
}
@media screen and (max-width: 420px) {
  .VideoContainer {
    .userVideo {
      width: 100%;
      max-width: 420px;
    }
  }
}
</style>
<script>
export default {
  name: "VideoContainer",
  data() {
    return {};
  },
  props: ["userVideo"],
  watch: {
    userVideo: {
      handler: function(src) {
        // console.log(this);
        this.$refs.userVideo.srcObject = src;
        this.$emit("videoStart", this.$refs.userVideo);
      }
    }
  }
};
</script>