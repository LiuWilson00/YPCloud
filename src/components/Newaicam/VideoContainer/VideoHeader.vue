<template>
  <div class="controls-group">
    <div class="controls-left-group">
      <v-btn
        :disabled="backspaceDisable"
        class="controls-button"
        :class="{disaple:backspaceDisable}"
        icon
        @click="buttonClickHandler('backspace')"
      >
        <v-icon class="controls-header-icon">keyboard_backspace</v-icon>
      </v-btn>
    </div>
    <div class="controls-mid-group">
      <v-btn
        class="controls-button"
        :disabled="switchCameraDisable"
        :class="{disaple:switchCameraDisable}"
        icon
        @click="buttonClickHandler('switch')"
      >
        <v-icon class="controls-header-icon">switch_camera</v-icon>
      </v-btn>
    </div>
    <div class="controls-right-group">
      <v-btn
        class="controls-button"
        :disabled="imageCameraDisable"
        :class="{disabled:imageCameraDisable}"
        icon
        @click="buttonClickHandler('insert_photo')"
      >
        <v-icon class="controls-header-icon">insert_photo</v-icon>
      </v-btn>
      <v-btn class="controls-button" icon @click="buttonClickHandler('more_vert')">
        <v-icon class="controls-header-icon">more_vert</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.disaple {
  opacity: 0 !important;
}
.controls-group {
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: space-between;
  align-items: center;
  .controls-button {
    .controls-header-icon {
      color: white;
    }
    .controls-button-text {
      color: white;
      line-height: 40px;
    }
  }
}
</style>
<script>
export default {
  name: "VideoHeader",
  data() {
    return {
      backspaceDisable: true,
      switchCameraDisable: true,
      imageCameraDisable: true
    };
  },
  methods: {
    buttonClickHandler(actionName) {
      this.$emit("click", this.getActionObject(actionName));
    },
    getActionObject(actionName) {
      return {
        model: actionName,
        type: "header",
        status: "click"
      };
    }
  }
};
</script>