<style lang="scss" scoped>
@import "../../../node_modules/animate.css/animate.css";
</style>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "Mixin",
  data() {
    return {
      reservedWord: ["colorRotate", "scale"],
      basewidth: 480,
      basehight: 640
    };
  },
  computed: {
    style_brick() {
      let list = [];
      Object.keys(this.brick_style).forEach(key => {
        if (
          typeof this.brick_style[key] == "object" ||
          this.reservedWord.indexOf(key) >= 0
        )
          return;
        list.push(`${key}:${this.brick_style[key]}`);
      });
      return list.join(";");
    },
    style_Children() {
      let list = {};
      Object.keys(this.brick_style).forEach(key => {
        if (typeof this.brick_style[key] == "object") {
          console.log(key);
          list[key] = this.brick_style[key];
        }
      });
      return list;
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
    },
    stylyObjectToString(style) {
      if (style == undefined) return "";
      return Object.keys(style)
        .map(key => {
          return `${key}:${style[key]}`;
        })
        .join(";");
    },
    updateWid(val) {
      this.$el.style.setProperty("--basewidth", `${val}px`);
    },
    updateHig(val) {
      this.$el.style.setProperty("--basehight", `${val}px`);
    }
  },
  props: ["brick_style", "animate", "bIndex", "brickAction"],
  watch: {
    animate: {
      handler(newVal) {
        const vm = this;
        newVal.forEach(el => anime.remove(`.${this.bIndex}${el.targets}`));
        document
          .querySelectorAll(`.${this.bIndex}.${bName} *`)
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
    },
    basewidth: {
      handler(newVal) {
        let scale = this.brick_style.scale;
        this.updateWid(newVal * scale == undefined ? 1 : scale);
      }
    },
    basehight: {
      handler(newVal) {
        let scale = this.brick_style.style.scale;
        this.updateHig(newVal * scale == undefined ? 1 : scale);
      }
    }
  },
  mounted() {
    let scale = this.brick_style.scale;
    var temp = {};
    this.traAnimeList.forEach(ani => {
      anime(ani);
    });
    this.updateHig(this.basehight * (scale == undefined ? 1 : scale));
    this.updateWid(this.basewidth * (scale == undefined ? 1 : scale));
  }
};
</script>