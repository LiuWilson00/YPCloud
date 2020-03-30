<template>
  <div class="drone animated" :class="this.brickAction.drone" :style="style_brick">
    <img
      :src="support"
      alt="support"
      class="support animated"
      :class="this.brickAction.support"
      :style="stylyObjectToString(style_Children.support)"
    />

    <img
      :src="base"
      alt="base"
      class="base animated"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
    />

    <img
      :src="propeller"
      alt="propeller"
      class="propeller propeller1 animated"
      :class="this.brickAction.propeller"
      :style="stylyObjectToString(style_Children.propeller)"
    />
    <img
      :src="propeller"
      alt="propeller"
      class="propeller propeller2 animated"
      :class="this.brickAction.propeller"
      :style="stylyObjectToString(style_Children.propeller)"
    />
    <img
      :src="propeller"
      alt="propeller"
      class="propeller propeller3 animated"
      :class="this.brickAction.propeller"
      :style="stylyObjectToString(style_Children.propeller)"
    />
    <img
      :src="propeller"
      alt="propeller"
      class="propeller propeller4 animated"
      :class="this.brickAction.propeller"
      :style="stylyObjectToString(style_Children.propeller)"
    />
    <img
      :src="eye"
      alt="eye"
      class="eye animated"
      :class="this.brickAction.eye"
      :style="stylyObjectToString(style_Children.eye)"
    />
  </div>
</template>
<style lang="scss" scoped>
.drone {
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

  .support {
    top: 23%;
  }

  .base {
    top: 18%;
  }

  .propeller {
    width: 40%;
  }
  .propeller1 {
    top: 4%;
    left: -11%;
  }

  .propeller2 {
    top: 9%;
    left: 17%;
    height: 10%;
    width: 32%;
  }

  .propeller3 {
    top: 9%;
    left: 52%;
    height: 10%;
    width: 32%;
  }
  .propeller4 {
    top: 4%;
    left: 71%;
  }
  .eye {
    width: 10%;
    top: 29%;
    left: 44%;
  }
}
</style>
<script>
import base from "@/assets/bricks/Drone/base.png";
import eye from "@/assets/bricks/Drone/eye.png";
import propeller from "@/assets/bricks/Drone/propeller.png";
import support from "@/assets/bricks/Drone/support.png";
import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "drone",
  data() {
    return {
      base,
      eye,
      propeller,
      support
    };
  },
  mounted() {},
  mixins: [mixin]
};
</script>