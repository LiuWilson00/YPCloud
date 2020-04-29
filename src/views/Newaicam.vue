<template>
  <div class="new-aicam">
    <VideoContainer :userVideo="camStream" @videoStart="setVideoToData"></VideoContainer>
    <PlayerContorls @playerOnAcrion="actionHandler"></PlayerContorls>
    <StatusLoader :status="videoStatus"></StatusLoader>
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
import StatusLoader from "../components/Newaicam/StatusLoader";

import CamMethods from "../components/Newaicam/CamMethods";
import mms from "../components/AIBot/mms";
import peer from "../components/AIBot/peer";

export default {
  name: "aicam",
  data() {
    return {
      camStream: {},
      isRegistered: false,
      imgList: [],
      formData: new FormData(),
      videoDom: null
    };
  },
  methods: {
    actionHandler(actionObject) {
      console.log(actionObject);
      switch (actionObject.model) {
        case "switch":
          this.backDeviceChange();
          break;
        case "photo":
          if ((actionObject.status = "click")) {
            this.captureImage(this.videoDom);
          }
        default:
          return;
          break;
      }
    },
    setVideoToData(video) {
      this.videoDom = video;
    },
    initConnect() {
      this.initDeviceChange();
      this.mmsInit();
      this.peerInit();
    }
  },
  computed: {
    videoStatus() {
      if (!this.isRegistered) {
        return "loading";
      }
      return "noting";
    }
  },
  mixins: [CamMethods, mms, peer],
  mounted() {
    this.initConnect();
  },
  components: { VideoContainer, PlayerContorls, StatusLoader }
};
</script>