<template>
  <div class="new-aicam">
    <VideoContainer :userVideo="camStream" @videoStart="setVideoToData" ref="clentVideo"></VideoContainer>
    <PlayerContorls @playerOnAcrion="actionHandler"></PlayerContorls>
    <StatusLoader :status="videoStatus"></StatusLoader>
  </div>
</template>
<style lang="scss" scoped>
@import "../../node_modules/animate.css/animate.css";
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
      lenOriginal: "front",
      formData: new FormData(),
      videoDom: null,
      statusMenu: {
        mmsError: "cloudError",
        ajaxError: "cloudError",
        peerError: "connectError",
        inDevelopment: "not_interested",
        send_mms: "send_mms",
        send_ajax: "send_ajax",
        mms_ok: "mms_ok"
      },
      aicamStatus: null,
      actionMethodsList: {
        switch: this.switchLen,
        photo: this.photoAction
      }
    };
  },
  methods: {
    actionHandler(actionObject) {
      // console.log(actionObject, actionObject.status);
      this.actionMethodsList[actionObject.model] == undefined
        ? this.setStatusInDevelopment(actionObject)
        : this.actionMethodsList[actionObject.model](actionObject);
    },
    setStatusInDevelopment(actionObject) {
      if (actionObject.status == "click") {
        this.aicamStatus = "inDevelopment";
        setTimeout(this.listenerToStatus, 10);
      }
    },
    switchLen() {
      this.lenOriginal == "front"
        ? (this.lenOriginal = "back")
        : (this.lenOriginal = "front");
    },
    photoAction(actionObject) {
      if (actionObject.status == "click") {
        this.aicamStatus = "send_ajax";
        this.captureImage(
          this.videoDom,
          this.displayAjaxMsg,
          this.displayMMSMsg,
          this.catchRemoteError
        );
        this.shutter();
      }
    },
    shutter() {
      this.$refs.clentVideo.$el.classList.add("flash");
      this.$refs.clentVideo.$el.classList.add("faster");
      this.$refs.clentVideo.$el.classList.add("animated");
      setTimeout(() => {
        this.$refs.clentVideo.$el.classList.remove("flash");
        this.$refs.clentVideo.$el.classList.remove("faster");
        this.$refs.clentVideo.$el.classList.remove("animated");
      }, 500);
    },
    displayAjaxMsg(msgCallBack) {
      this.aicamStatus = "send_mms";
    },
    displayMMSMsg(msgCallBack) {
      if (msgCallBack[0].IN.State.ErrCode != 0) {
        this.aicamStatus = "mmsError";
        this.listenerToStatus();
      } else {
        this.aicamStatus = "mms_ok";
        this.listenerToStatus();
      }
    },
    catchRemoteError(error) {
      console.log("err", error);
      this.aicamStatus = "ajaxError";
    },
    listenerToStatus() {
      const vm = this;
      document.documentElement.addEventListener("click", this.setStatusToNull);
    },
    listenerToStatusOff() {
      document.documentElement.removeEventListener(
        "click",
        this.setStatusToNull
      );
    },
    setStatusToNull() {
      this.aicamStatus = null;
      this.listenerToStatusOff();
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
  watch: {
    lenOriginal: {
      handler(val) {
        if (val == "front") {
          this.initDeviceChange();
        } else if (val == "back") {
          this.backDeviceChange();
        } else {
          this.initDeviceChange();
        }
      }
    }
  },
  computed: {
    videoStatus() {
      if (!this.isRegistered) {
        return "loading";
      }
      if (this.aicamStatus != null) {
        return this.statusMenu[this.aicamStatus];
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