<template>
  <div class="girl animated" :class="this.brickAction.girl" :style="style_brick">
    <img
      :src="face"
      alt="face"
      class="face animated"
      :class="this.brickAction.face"
      :style="stylyObjectToString(style_Children.face)"
    />

    <img
      :src="hair"
      alt="hair"
      class="hair animated"
      :class="this.brickAction.hair"
      :style="stylyObjectToString(style_Children.hair)"
    />
    <img
      :src="chothe"
      alt="chothe"
      class="chothe animated"
      :class="this.brickAction.chothe"
      :style="stylyObjectToString(style_Children.chothe)"
    />
  </div>
</template>
<style lang="scss" scoped>
.girl {
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
  .chothe {
  }

  .face {
  }
  .hair {
  }
}
</style>
<script>
import chothe from "@/assets/bricks/Boy/choth.png";
import face from "@/assets/bricks/Boy/face.png";
import hair from "@/assets/bricks/Boy/hair.png";
import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "boy",
  data() {
    return {
      chothe,
      face,
      hair
    };
  },
  mounted() {},
  mixins: [mixin]
};
</script>