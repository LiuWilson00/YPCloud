<template>
  <div class="controls-group">
    <div class="controls-left-group">
      <v-btn class="controls-button" icon >
        <v-icon class="controls-header-icon">keyboard_backspace</v-icon>
      </v-btn>
    </div>
    <div class="controls-mid-group">
      <v-btn class="controls-button" text>
        <p class="controls-button-text">AICAM</p>
      </v-btn>
    </div>
    <div class="controls-right-group">
      <v-btn class="controls-button" icon >
        <v-icon class="controls-header-icon">insert_photo</v-icon>
      </v-btn>
      <v-btn class="controls-button" icon >
        <v-icon class="controls-header-icon">more_vert</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
  name: "VideoHeader"
};
</script>