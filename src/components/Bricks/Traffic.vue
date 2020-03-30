<template>
  <div class="traffic animated" :class="this.brickAction.traffic" :style="style_brick">
    <img
      :src="base"
      alt="base"
      class="base animated"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
    />

    <img
      :src="redLight"
      alt="redLight"
      class="redLight light animated"
      :class="this.brickAction.redLight"
      :style="stylyObjectToString(style_Children.redLight)"
    />

    <img
      :src="yelloLight"
      alt="yelloLight"
      class="yelloLight light animated"
      :class="this.brickAction.yelloLight"
      :style="stylyObjectToString(style_Children.yelloLight)"
    />
    <img
      :src="greenLight"
      alt="greenLight"
      class="greenLight light animated"
      :class="this.brickAction.greenLight"
      :style="stylyObjectToString(style_Children.greenLight)"
    />
  </div>
</template>
<style lang="scss" scoped>
.traffic {
  --basewidth: 480px;
  --basehight: 640px;
  position: absolute;
  --lightBaseLeft: 25%;
  --lightDelta: 30;
  width: var(--basewidth);
  height: var(--basehight);
  * {
    position: absolute;
  }

  .base {
    width: 100%;
  }

  .light {
    width: 30%;
    left: 36%;
  }

  .redLight {
    top: calc(var(--lightBaseLeft));
  }
  .yelloLight {
    top: calc(var(--lightBaseLeft) + var(--lightDelta) * 1%);
  }

  .greenLight {
    top: calc(var(--lightBaseLeft) + var(--lightDelta) * 2%);
  }
}
.Carousel {
  .light {
    animation-name: lightCarousel;
    animation-duration: 3s;
    opacity: 0.5;
    animation-iteration-count: infinite;
  }
  .redLight {
    animation-delay: 1s;
  }
  .yelloLight {
    animation-delay: 2s;
  }
  .greenLight {
    animation-delay: 3s;
  }
  @keyframes lightCarousel {
    0% {
      opacity: 0.5;
    }
    10% {
      opacity: 1;
    }
    43% {
      opacity: 1;
    }
    53% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.5;
    }
  }
}
</style>
<script>
import base from "@/assets/bricks/Traffic/base.png";
import redLight from "@/assets/bricks/Traffic/red.png";
import yelloLight from "@/assets/bricks/Traffic/yello.png";
import greenLight from "@/assets/bricks/Traffic/green.png";

import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "Traffic",
  data() {
    return {
      base,
      redLight,
      yelloLight,
      greenLight
    };
  },
  mounted() {
    console.log(this.brickAction);
  },
  mixins: [mixin]
};
</script>