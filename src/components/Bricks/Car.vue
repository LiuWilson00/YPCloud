<template>
  <div class="car animated" :class="this.brickAction.car" :style="style_brick">
    <img
      :src="tires_R"
      alt="tires_R"
      class="tires_R tires animated"
      :class="this.brickAction.tires_R"
      :style="stylyObjectToString(style_Children.tires_R)"
    />

    <img
      :src="tires_L"
      alt="tires_L"
      class="tires_L tires animated"
      :class="this.brickAction.tires_L"
      :style="stylyObjectToString(style_Children.tires_L)"
    />
    <img
      :src="base"
      alt="base"
      class="base animated"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
    />
  </div>
</template>
<style lang="scss" scoped>
.car {
  --basewidth: 480px;
  --basehight: 640px;
  position: absolute;
  --tiresLeft: 12%;
  --tiresDlata: 60%;
  width: var(--basewidth);
  height: var(--basehight);
  * {
    position: absolute;
  }

  .base {
    width: 100%;
  }

  .tires {
    width: 20%;

    top: 46%;
  }

  .tires_R {
    left: calc(var(--tiresLeft) + var(--tiresDlata));
  }
  .tires_L {
    left: var(--tiresLeft);
  }
}
</style>
<script>
import base from "@/assets/bricks/Car/base.png";
import tires_L from "@/assets/bricks/Car/Tires_L.png";
import tires_R from "@/assets/bricks/Car/Tires_R.png";

import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "Car",
  data() {
    return {
      base,
      tires_L,
      tires_R
    };
  },
  mounted() {},
  mixins: [mixin]
};
</script>