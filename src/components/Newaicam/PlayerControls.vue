<template>
  <div class="PlayerContorls">
    <VideoHeader class="controls-header"></VideoHeader>
    <div class="controls-footer">
      <div class="controls-model-slider" :style="leftOfSlilder">
        <VideoContainerButton
          v-for="(model) in modelList"
          :key="model.name"
          :icon="model.icon"
          :small="model.name!=activeModel"
          :large="model.name==activeModel"
          @click="clickHandler(model.name)"
        ></VideoContainerButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.PlayerContorls {
  position: absolute;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .controls-header {
    color: white;
    position: absolute;
    top: calc( 10% - 40px);
  }
  .controls-footer {
    position: absolute;
    top: 80%;
    .controls-model-slider {
      transition: all 0.5s;
      position: relative;
      display: flex;
    }
  }
}
</style>
<script>
import VideoContainerButton from "./VideoContainer/VideoContainerButton";
import VideoHeader from "./VideoContainer/VideoHeader";
export default {
  name: "VideoControls",
  data() {
    return {
      activeModel: "voice",
      modelList: [
        { name: "photo", icon: "photo" },
        { name: "video", icon: "voice_chat" },
        { name: "voice", icon: "settings_voice" },
        { name: "translate", icon: "translate" },
        { name: "visibility", icon: "visibility" }
      ]
    };
  },
  computed: {
    leftOfSlilder() {
      const vm = this;
      let centerOfModelList = Math.floor((1 + this.modelList.length) / 2) - 1;
      let activeIndex = this.modelList.findIndex(model => {
        return model.name == vm.activeModel;
      });

      return `left:${(centerOfModelList - activeIndex) * 20}%`;
    }
  },
  methods: {
    clickHandler(name) {
      console.log(123);
      this.activeModel = name;
    }
  },
  components: {
    VideoContainerButton,
    VideoHeader
  }
};
</script>