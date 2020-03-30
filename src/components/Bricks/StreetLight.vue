<template>
  <div class="SteetLight animated" :class="this.brickAction.SteetLight" :style="style_brick">
    <img
      :src="light"
      alt="light"
      class="light animated"
      :class="this.brickAction.light"
      :style="stylyObjectToString(style_Children.light)"
    />

    <img
      :src="base"
      alt="base"
      class="base animated"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
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
.SteetLight {
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

  .light {
    top: 2%;
    width: 55%;
    left: 43%;
  }

  .base {
  }
  .shin {
    width: 80%;
    top: 3%;
    left: 35%;
  }
}
</style>
<script>
import base from "@/assets/bricks/SteetLight/base.png";
import light from "@/assets/bricks/SteetLight/light.png";
import shin from "@/assets/bricks/SteetLight/shin.png";

import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "drone",
  data() {
    return {
      base,
      light,
      shin
    };
  },
  mounted() {},
  mixins: [mixin]
};
</script>