<template>
  <div class="animated fan" :class="this.brickAction.fan" :style="style_brick">
    <img
      :src="leaf"
      alt="leaf"
      class="animated leaf"
      :class="this.brickAction.leaf"
      :style="stylyObjectToString(style_Children.leaf)"
    />
    <img
      :src="frame"
      alt="frame"
      :class="this.brickAction.frame"
      class="animated frame"
      :style="stylyObjectToString(style_Children.frame)"
    />
    <img
      :src="base"
      alt="base"
      class="animated base"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
    />
  </div>
</template>
<style lang="scss" scoped>
@import "../../../node_modules/animate.css/animate.css";

.fan {
  --basewidth: 480px;
  --basehight: 640px;
  width: var(--basewidth);
  height: var(--basehight);
  position: absolute;
  --deg: 0deg;
  img {
    position: absolute;
  }
  img.leaf {
    width: 80%;
    top: 10%;
    left: 10%;
    filter: hue-rotate(var(--deg));
  }
  img.frame {
    width: 100%;
    filter: hue-rotate(var(--deg));
  }
  img.base {
    width: 80%;
    top: 76%;
    left: 10%;
    filter: hue-rotate(var(--deg));
  }
}
</style>
<script>
import leaf from "@/assets/bricks/Fan/fan1.svg";
import frame from "@/assets/bricks/Fan/fan2.svg";
import base from "@/assets/bricks/Fan/fan3.svg";
import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "Fan",
  data() {
    return {
      bName: "fan",
      leaf,
      frame,
      base
    };
  },
  mixins: [mixin]
};
</script>