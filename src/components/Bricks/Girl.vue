<template>
  <div class="girl animated" :class="this.brickAction.girl" :style="style_brick">
    <img
      :src="chothe"
      alt="chothe"
      class="chothe animated"
      :class="this.brickAction.chothe"
      :style="stylyObjectToString(style_Children.chothe)"
    />

    <img
      :src="face"
      alt="face"
      class="face animated"
      :class="this.brickAction.face"
      :style="stylyObjectToString(style_Children.face)"
    />
    <img
      :src="butterfly"
      alt="butterfly"
      class="butterfly animated"
      :class="this.brickAction.butterfly"
      :style="stylyObjectToString(style_Children.butterfly)"
    />
    <img
      :src="hair"
      alt="hair"
      class="hair animated"
      :class="this.brickAction.hair"
      :style="stylyObjectToString(style_Children.hair)"
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

  .butterfly {
    width: 65%;
    top: 45%;
    left: 19%;
  }

  .chothe {
    width: 100%;
    top: 19%;
  }

  .face {
    width: 132%;
    top: -11%;
    left: -16%;
  }
  .hair {
    width: 132%;
    top: -11%;
    left: -16%;
  }
}
</style>
<script>
import butterfly from "@/assets/bricks/Girl/butterfly.png";
import chothe from "@/assets/bricks/Girl/chothe.png";
import face from "@/assets/bricks/Girl/face.png";
import hair from "@/assets/bricks/Girl/hair.png";
import anime from "animejs/lib/anime.es.js";
import mixin from "./Mixin";

export default {
  name: "girl",
  data() {
    return {
      butterfly,
      chothe,
      face,
      hair
    };
  },
  mounted() {},
  mixins: [mixin]
};
</script>