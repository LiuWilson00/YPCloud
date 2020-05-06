<template>
  <div class="Setting">
    <div class="Setting-back">
      <button class="Setting-back-button" @click="backToAicam">
        <v-icon>keyboard_arrow_up</v-icon>
      </button>
    </div>
    <div class="Setting-body">
      <v-row align="center" class="ml-2 mr-2">
        <v-col cols="12">
          <v-text-field label="Caller ID"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Called Id"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select :items="items" label="Model"></v-select>
        </v-col>
      </v-row>
    </div>
    <div class="Setting-footer">
      <div class="Setting-model-slider">
        <v-btn class="mr-2">ok</v-btn>
        <v-btn>cancel</v-btn>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Setting {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex: 1;
  background-color: ghostwhite;
  z-index: 10;
  width: 80%;
  height: 80%;
  margin: 10%;
  flex-direction: column;
  position: absolute;
  align-items: center;
  overflow: hidden;
  .Setting-back {
    display: flex;
  }
  .Setting-body {
    display: flex;
    flex-direction: column;
    color: darkgray;
  }
  .Setting-footer {
    display: flex;
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
      items: ["YOLO", "YOLO-TINY"]
    };
  },
  computed: {},
  methods: {
    backToAicam() {
      this.$emit("backToAicam");
    }
  },
  components: {}
};
</script>