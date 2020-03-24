<template>
  <div class="fan" :style="style_fan">
    <img :src="leaf" alt="leaf" class="leaf" />
    <img :src="frame" alt="leaf" class="frame" />
    <img :src="base" alt="leaf" class="base" />
  </div>
</template>
<style lang="scss" scoped>
@import "../../../node_modules/animate.css/animate.css";

.fan {
  position: absolute;
  --deg: 0deg;
  img {
    position: absolute;
  }
  img.leaf {
    width: 80%;
    top: 7%;
    left: 10%;
    filter: hue-rotate(var(--deg));
  }
  img.frame {
    width: 100%;
    filter: hue-rotate(var(--deg));
  }
  img.base {
    width: 80%;
    top: 68%;
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
export default {
  name: "Fan",
  data() {
    return {
      leaf,
      frame,
      base,

      init_animate: {
        leaf_animate: {
          targets: ".leaf",

          rotate: {
            value: 0,
            duration: 300,
            easing: "linear"
          },
          loop: false
        }
      }
    };
  },
  computed: {
    style_fan() {
      return `width:${this.brick_style.width}px;
      height:${this.brick_style.width * 1.5}px`;
    },
    traAnimeList() {
      let list = [];
      const vm = this;

      vm.animate.forEach(ani => {
        let newObj = {};
        Object.keys(ani).forEach(key => {
          if (key == "targets") {
            newObj[key] = `.${vm.bIndex} ${ani[key]}`;
          } else {
            newObj[key] = ani[key];
          }
        });
        list.push(newObj);
      });
      return list;
    }
  },
  methods: {
    updateColor(deg) {
      this.$el.style.setProperty("--deg", `${deg}deg`);
    }
  },
  props: ["brick_style", "animate", "bIndex"],
  watch: {
    animate: {
      handler(newVal) {
        const vm = this;
        newVal.forEach(el => anime.remove(`.${this.bIndex}${el.targets}`));
        document
          .querySelectorAll(`.${this.bIndex}.fan *`)
          .forEach(el => el.removeAttribute("style"));
        this.traAnimeList.forEach(ani => {
          anime(ani);
        });
      },
      deep: true
    },
    "brick_style.colorRotate": {
      handler(val) {
        this.updateColor(val);
      }
    }
  },
  mounted() {
    var temp = {};
    this.traAnimeList.forEach(ani => {
      anime(ani);
    });
    this.updateColor(this.brick_style.colorRotate);
  },
  created() {}
};
</script>