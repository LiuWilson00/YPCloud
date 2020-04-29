<template>
  <div class="Setting">
    <VideoHeader class="Setting-header" @click="playerAcrion"></VideoHeader>
    <div class="Setting-footer">
      <div class="Setting-model-slider" :style="leftOfSlilder">
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


.Setting {
  position: absolute;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .Setting-header {
    color: white;
    position: absolute;
    top: calc(10% - 40px);
  }
  .Setting-footer {
    position: absolute;
    top: 80%;
    .Setting-model-slider {
      transition: all 0.5s;
      position: relative;
      display: flex;
    }
  }
}
</style>
<script>

export default {
  name: "VideoSetting",
  data() {
    return {
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
    playerAcrion(actionObject) {
      this.$emit("playerOnAcrion", actionObject);
      if (actionObject.type == "footer") {
        this.activeModel = actionObject.model;
      }
    },
    checkActionStatus(modelName) {
      return this.activeModel == modelName ? "click" : "onActive";
    }
  },
  components: {
  }
};
</script>