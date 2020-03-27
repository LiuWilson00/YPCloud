<template>
  <div class="light animated" :class="this.brickAction.light" :style="style_brick">
    <img
      :src="bulb"
      alt="bulb"
      class="bulb animated"
      :class="this.brickAction.bulb"
      :style="stylyObjectToString(style_Children.bulb)"
    />
    <img
      :src="base"
      alt="base"
      class="base animated"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
    />
    <img
      :src="wire"
      alt="wire"
      class="wire animated"
      :class="this.brickAction.wire"
      :style="stylyObjectToString(style_Children.wire)"
    />
    <img
      :src="shin"
      alt="shin"
      class="shin animated"
      :class="this.brickAction.shin"
      :style="stylyObjectToString(style_Children.shin)"
    />
  </div>
</template>
<style lang="scss" scoped>
.light {
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
  .wire {
    width: 25%;
    top: 80%;
    left: 30%;
  }
  .bulb {
    width: 85%;
  }

  .base {
    width: 50%;
    top: 115%;
    left: 21%;
  }
  .shin {
    top: -5%;
    left: -6%;
  }
}
</style>
<script>
import base from "@/assets/bricks/Light/light_base.png";
import bulb from "@/assets/bricks/Light/light_bulb.png";
import shin from "@/assets/bricks/Light/light_shin.png";
import wire from "@/assets/bricks/Light/light_wire.png";

import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "light",
  data() {
    return {
      base,
      bulb,
      shin,
      wire
    };
  },
  mounted() {
    console.log(this.brickAction);
  },
  mixins: [mixin]
};
</script>