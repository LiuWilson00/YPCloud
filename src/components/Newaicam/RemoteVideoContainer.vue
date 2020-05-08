<template>
  <div class="VideoContainer" :class="{maximize:maximize}" ref="videoContainer">
    <video autoplay playsinline class="userVideo" src ref="userVideo"></video>
    <v-btn class="resize" :icon="!maximize" @click="resizeScreen">
      <v-icon class="resize-icon">{{ maximize?'keyboard_arrow_up':'zoom_out_map'}}</v-icon>
    </v-btn>
  </div>
</template>
<style lang="scss" scoped>
.VideoContainer {
  width: 25%;
  position: absolute;
  background-color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 10;
  transition: all 0.1s;
  flex-direction: column;
  .userVideo {
    width: 100%;
    background-color: whitesmoke;
    max-width: 1024px;
  }
  .resize {
    position: absolute;
    align-self: flex-end;
    top: calc(100% - 2rem);
    .resize-icon {
      font-size: 1rem;
    }
  }
}
.VideoContainer.maximize {
  width: 100%;
  height: 100%;
  background-color: rgba(43, 39, 39, 0.8);
  .userVideo {
    background-color: black;
    width: 95%;
    max-width: 1024px;
  }
  .resize {
    width: 100%;
    height: 20px;
    margin-top: 5px;
    display: flex;
    color: whitesmoke;
    background-color: gray !important;
    opacity: 0.6;
    position: relative;
    z-index: 15;
    top: auto;
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
  name: "RemoteVideoContainer",
  data() {
    return {
      maximize: false
    };
  },
  props: ["remoteVideo"],
  methods: {
    resizeScreen() {
      this.maximize = !this.maximize;
    }
  },
  watch: {
    remoteVideo: {
      handler: function(src) {
        // console.log(this);
        this.$refs.userVideo.srcObject = src;
        this.$emit("videoStart", this.$refs.userVideo);
      }
    }
  }
};
</script>