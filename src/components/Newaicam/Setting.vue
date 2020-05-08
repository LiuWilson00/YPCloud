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
          <v-text-field label="Caller ID" disabled v-model="peerID"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Called ID"
            :value="peerTarget"
            @change="setData($event,'peerTarget')"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            :items="aiModItems"
            :value="aiMod"
            @change="setData($event,'aiMod')"
            label="Model"
          ></v-select>
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
  z-index: 30;
  width: 80%;
  height: 80%;
  max-width: 768px;
  align-self: center;
  margin: 5% 0;
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
      useInputAiMod: ""
    };
  },
  props: ["peerID", "aiModItems", "aiMod", "peerTarget"],
  computed: {},
  methods: {
    backToAicam() {
      this.$emit("backToAicam");
    },
    setData(value, varName) {
      console.log(value);
      this.$emit("settingOnAction", {
        model: "set_data",
        type: "header",
        status: "click",
        dataName: varName,
        dataValue: value
      });
    },
    changeTextInput(e) {
      console.log(e);
    }
  },
  watch: {
    peerTarget: {
      handler() {
        this.subPeerTarget = this.peerTarget;
      }
    }
  },
  components: {}
};
</script>