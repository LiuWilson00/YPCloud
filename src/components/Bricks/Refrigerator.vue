<template>
  <div class="refrigerator animated" :class="this.brickAction.refrigerator" :style="style_brick">
    <img
      :src="base"
      alt="base"
      class="base animated"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
    />
    <img
      :src="food"
      alt="food"
      class="food animated"
      :class="this.brickAction.food"
      :style="stylyObjectToString(style_Children.food)"
    />
    <img
      :src="doorUp"
      alt="doorUp"
      class="doorUp animated"
      :class="this.brickAction.doorUp"
      :style="stylyObjectToString(style_Children.doorUp)"
    />
    <img
      :src="doorDown"
      alt="doorDown"
      class="doorDown animated"
      :class="this.brickAction.doorDown"
      :style="stylyObjectToString(style_Children.doorDown)"
    />
  </div>
</template>
<style lang="scss" scoped>
.refrigerator {
  --basewidth: 480px;
  --basehight: 640px;
  position: absolute;

  width: var(--basewidth);
  height: var(--basehight);
  * {
    position: absolute;
  }
  img {
    width: 100%;
  }

  .food {
    top: 5%;
    width: 130%;
    left: -16%;
  }

  .base {
  }
  .doorDown {
    width: 93%;
    top: 53%;
    left: 4%;
    transform-origin: right;
  }
  .doorUp {
    width: 93%;
    top: 1%;
    left: 4%;
    transform-origin: right;
  }
}
</style>
<script>
import base from "@/assets/bricks/Refrigerator/base.png";
import food from "@/assets/bricks/Refrigerator/food.png";
import doorDown from "@/assets/bricks/Refrigerator/doorDown.png";
import doorUp from "@/assets/bricks/Refrigerator/doorUp.png";

import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "refrigerator",
  data() {
    return {
      base,
      food,
      doorDown,
      doorUp
    };
  },
  mounted() {},
  mixins: [mixin]
};
</script>