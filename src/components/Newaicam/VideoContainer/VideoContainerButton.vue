<template>
  <div class="controls-footer-buttonborder" :style="buttonPadding" ref="buttonRoot">
    <v-btn
      class="controls-footer-button"
      @click="clickHandler"
      fab
      dark
      :small="small"
      :large="large"
      :color="color"
    >
      <v-icon class="button-icon">{{icon}}</v-icon>
    </v-btn>
  </div>
</template>
<style lang="scss" scoped>
.controls-footer-buttonborder {
  --button-width: 45px;
  --button-height: 45px;
  --button-color: white;
  --button-iconFontColor: black;
  transition: all 0.2s;
  margin: 5px;
  width: var(--button-width);
  height: var(--button-height);
  border-width: 1px;
  padding: 1.5px;
  border-color: var(--button-color);
  border-style: solid;
  border-radius: 50%;
  .controls-footer-button {
    transition: all 0.2s;
    .button-icon {
      color: var(--button-iconFontColor);
    }
  }
}
</style>
<script>
export default {
  name: "VideoContainerButton",
  data() {
    return {
      size: {
        small: 40,
        namal: 56,
        large: 64,
        xLarge: 72
      },
      width: "60.48px"
    };
  },
  props: {
    icon: {
      type: String,
      default: "check_circle_outline"
    },
    color: {
      type: String,
      default: "white"
    },
    iconFontColor: {
      type: String,
      default: "black"
    },
    active: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonPadding() {
      return `padding:${(this.widthToNumber - this.size[this.buttonSize]) /
        2}px`;
    },
    widthToNumber() {
      return parseInt(this.width.replace("px", ""));
    },
    buttonSize() {
      if (this.small == true) {
        return "small";
      } else if (this.large == true) {
        return "large";
      } else {
        return "nomal";
      }
    }
  },
  watch: {
    color: {
      handler() {
        this.setPropertyOfStyle("color");
      }
    },
    width: {
      handler() {
        this.setPropertyOfStyle("width");
        this.setPropertyOfStyle("height", this.width);
      }
    },
    iconFontColor: {
      handler() {
        this.setPropertyOfStyle("iconFontColor");
      }
    },
    small: {
      handler(val) {
        if (val == true) {
          this.width = `${this.size.small * 1.12}px`;
        } else if (!this.small && !val) {
          this.width = `${this.size.namal * 1.12}px`;
        }
      },
      immediate: true
    },
    large: {
      handler(val) {
        if (val == true) {
          this.width = `${this.size.large * 1.12}px`;
        } else if (!this.small && !val) {
          this.width = `${this.size.namal * 1.12}px`;
        }
      },
      immediate: true
    }
  },
  methods: {
    setPropertyOfStyle(style, value) {
      const vm = this;
      var root = vm.$refs.buttonRoot;

      function defultSetProperty(style) {
        root.style.setProperty(`--button-${style}`, vm.$props[style]);
      }
      function setPropertyOfValue(style, value) {
        root.style.setProperty(`--button-${style}`, value);
      }

      return value == undefined
        ? defultSetProperty(style)
        : setPropertyOfValue(style, value);
    },
    initButtonStyle() {
      this.setPropertyOfStyle("color");
      this.setPropertyOfStyle("width");
      this.setPropertyOfStyle("height", this.width);
      this.setPropertyOfStyle("iconFontColor");
    },

    clickHandler() {
      this.$emit("click");
    }
  },
  mounted() {
    this.initButtonStyle();
  }
};
</script>