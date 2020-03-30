<template>
  <div class="phone animated" :class="this.brickAction.phone" :style="style_brick">
    <img
      :src="base"
      alt="base"
      class="base animated"
      :class="this.brickAction.base"
      :style="stylyObjectToString(style_Children.base)"
    />
    <img
      :src="btn"
      alt="btn"
      class="btn animated"
      :class="this.brickAction.btn"
      :style="stylyObjectToString(style_Children.btn)"
    />
    <img
      :src="Screen"
      alt="Screen"
      class="Screen animated"
      :class="this.brickAction.Screen"
      :style="stylyObjectToString(style_Children.Screen)"
    />
    <img
      :src="HelloWorld"
      alt="HelloWorld"
      class="HelloWorld animated"
      :class="this.brickAction.HelloWorld"
      :style="stylyObjectToString(style_Children.HelloWorld)"
    />
  </div>
</template>
<style lang="scss" scoped>
.phone {
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
  .base {
    width: 100%;
  }
  .btn {
    width: 10%;
    top: 88%;
    left: 45%;
  }

  .Screen {
    width: 64%;
    top: 12%;
    left: 19%;
  }
  .HelloWorld {
    top: 30%;
    left: 32%;
    width: 42%;
  }
}
</style>
<script>
import btn from "@/assets/bricks/Phone/btn.png";
import HelloWorld from "@/assets/bricks/Phone/HelloWorld.png";
import base from "@/assets/bricks/Phone/phone_base.png";
import Screen from "@/assets/bricks/Phone/Screen.png";

import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "light",
  data() {
    return {
      btn,
      HelloWorld,
      base,
      Screen
    };
  },
  mounted() {
    console.log(this.brickAction);
  },
  mixins: [mixin]
};
</script>