<template>
  <div class="new-aicam">
    <VideoContainer :userVideo="camStream"></VideoContainer>
    <PlayerContorls></PlayerContorls>
  </div>
</template>
<style lang="scss" scoped>
.new-aicam {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
<script>
import VideoContainer from "../components/Newaicam/VideoContainer";
import PlayerContorls from "../components/Newaicam/PlayerControls";

export default {
  name: "aicam",
  data() {
    return {
      camStream: {}
    };
  },
  methods: {
    initDeviceChange() {
      const vm = this;
      var constraints = {
        video: true
      };
      function handleSuccess(stream) {
        console.log(stream, typeof stream);
        window.stream = stream; // only to make stream available to console
        vm.camStream = stream;
      }

      function handleError(error) {
        console.log("getUserMedia error: ", error);
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
    }
  },
  mounted() {
    this.initDeviceChange();
  },
  components: { VideoContainer, PlayerContorls }
};
</script>