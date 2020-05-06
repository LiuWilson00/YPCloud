<template>
  <div
    class="PlayerContorls"
    v-touch:swipe.left="swipeLeftContorls"
    v-touch:swipe.right="swipeRightContorls"
    ref="PlayerContorls"
  >
    <VideoHeader class="controls-header" @click="playerAcrion"></VideoHeader>
    <div class="controls-footer">
      <div class="controls-model-slider" :style="leftOfSlilder">
        <VideoContainerButton
          v-for="(model) in modelList"
          :key="model.name"
          :icon="model.icon"
          :small="model.name!=activeModel"
          :large="model.name==activeModel"
          @click="playerAcrion({model:model.name,type:'footer',status:checkActionStatus(model.name)})"
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
    top: calc(10% - 40px);
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
        { name: "switch", icon: "flip_camera_ios" },
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

      return `left:calc(${((centerOfModelList - activeIndex) * 100) /
        this.modelList.length}% + 32px ) `;
    }
  },
  methods: {
    playerAcrion(actionObject) {
      this.$emit("playerOnAcrion", actionObject);
      if (actionObject.type == "footer") {
        this.activeModel = actionObject.model;
      }
    },
    checkActionStatus(modelName) {
      return this.activeModel == modelName ? "click" : "onActive";
    },
    swipeLeftContorls() {
      let nowIndex = this.modelList.findIndex(item => {
        return item.name == this.activeModel;
      });
      if (nowIndex + 1 >= this.modelList.length) return;
      this.activeModel = this.modelList[nowIndex + 1].name;
    },
    swipeRightContorls() {
      let nowIndex = this.modelList.findIndex(item => {
        return item.name == this.activeModel;
      });
      if (nowIndex - 1 < 0) return;
      this.activeModel = this.modelList[nowIndex - 1].name;
    },
    initSetActiveModel() {
      let activeIndex = Math.floor((this.modelList.length + 1) / 2 - 1);
      this.activeModel = this.modelList[activeIndex].name;
      return this.modelList[activeIndex].name;
    }
  },
  mounted() {
    console.log(this.$refs.PlayerContorls);
    this.initSetActiveModel();
  },
  components: {
    VideoContainerButton,
    VideoHeader
  }
};
</script>