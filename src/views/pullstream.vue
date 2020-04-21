<template>
  <div>
    <video class="demo-video" ref="player"></video>
  </div>
</template>

<script>
import flvjs from "flv.js";
export default {
  /**
   * @returns {{player: flvjs.Player}}
   */
  data() {
    return {
      player: null,
      id: "wilson",
      rtsp: "rtsp://localhost:8554/stream"
    };
  },
  mounted() {
    if (flvjs.isSupported()) {
      let video = this.$refs.player;
      if (video) {
        this.player = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          url: `ws://localhost:9000/pullStream/${this.id}/?url=${this.rtsp}`
        });
        this.player.attachMediaElement(video);
        try {
          this.player.load();
          this.player.play();
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  beforeDestroy() {
    this.player.destory();
  }
};
</script>

<style>
.demo-video {
  max-width: 480px;
  max-height: 360px;
}
</style>