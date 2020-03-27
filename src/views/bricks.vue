<template>
  <div class="bricks">
    <v-card class="mx-auto fixed" width="300">
      <v-list>
        <v-list-item @click="brickList.push(Template.fan)">
          <v-list-item-icon>
            <v-icon>toys</v-icon>
          </v-list-item-icon>

          <v-list-item-title>fan</v-list-item-title>
        </v-list-item>
        <v-list-item @click="brickList.push(Template.phone)">
          <v-list-item-icon>
            <v-icon>stay_primary_portrait</v-icon>
          </v-list-item-icon>

          <v-list-item-title>phone</v-list-item-title>
        </v-list-item>
        <v-list-item @click="brickList.push(Template.light)">
          <v-list-item-icon>
            <v-icon>wb_incandescent</v-icon>
          </v-list-item-icon>

          <v-list-item-title>light</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
    <component
      v-for="(brick,index) in brickList"
      :key="index"
      :is="brick.type"
      :animate="brick.animate"
      :class="`${brick.type+index} ${activeNum==index?'active':''}`"
      :brick_style="brick.style"
      :ref="`${brick.type}${index}`"
      :style="locateFomat(brick.locate)"
      :bIndex="brick.type+index"
      :brickAction="brick.brickAction"
      @click.native="componentClick(index)"
    ></component>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <v-card max-width="500" v-if="isActive" :style="jsonEditorLocate" absolute>
        <v-icon @click="closeHandler">close</v-icon>
        <vue-json-editor
          :value="activeBrick"
          :show-btns="true"
          :exapndedOnStart="true"
          @json-save="onJsonClick"
        ></vue-json-editor>
      </v-card>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
@import "../../node_modules/animate.css/animate.css";
.bricks {
  width: 100%;
  height: 768px;
}
.fixed {
  position: fixed;
}
.active {
  border-style: dashed;
  border-color: cadetblue;
  border-radius: 10px;
}
</style>
<script>
import Fan from "@/components/Bricks/Fan.vue";
import Light from "@/components/Bricks/Light.vue";
import Phone from "@/components/Bricks/Phone.vue";
import brickJson from "@/brick.json";
import vueJsonEditor from "vue-json-editor";
export default {
  name: "bricks",
  data() {
    return {
      isActive: false,
      activeNum: -1,
      activeModel: {},
      Template: brickJson,
      brickList: [
        {
          type: "fan",
          style: { scale: 0.2083, colorRotate: 30 },
          locate: { top: 100, left: 100 },
          animate: [
            {
              targets: ".leaf",
              // rotateZ: 250,
              rotate: {
                value: 720,
                duration: 1800,
                easing: "linear"
              },
              loop: true
            }
          ],
          brickAction: {}
        },
        {
          type: "fan",
          style: { scale: 0.2083 },
          locate: { top: 100, left: 200 },
          animate: [
            {
              targets: ".leaf",
              // rotateZ: 250,
              rotate: {
                value: 360,
                duration: 1800,
                easing: "linear"
              },
              loop: true
            }
          ],
          brickAction: {}
        },
        {
          type: "light",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 100,
            left: 300
          },
          animate: [],
          brickAction: {
            shin: ["heartBeat", "infinite"]
          }
        },
        {
          type: "phone",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 100,
            left: 400
          },
          animate: [],
          brickAction: {
            HelloWorld: ["bounce", "infinite"],
            phone: ["rubberBand", "infinite", "slower"]
          }
        }
      ]
    };
  },
  computed: {
    jsonEditorLocate() {
      if (this.activeNum == -1) return "";

      let h = this.brickList[this.activeNum].style.height;
      if (h == undefined) {
        h = 640 * this.brickList[this.activeNum].style.scale;
      }
      let w = this.brickList[this.activeNum].style.width;
      if (w == undefined) {
        w = 640 * this.brickList[this.activeNum].style.scale;
      }

      return `top:${this.brickList[this.activeNum].locate.top +
        this.styleRemoveUnit(h)}px;left:${this.brickList[this.activeNum].locate
        .left + this.styleRemoveUnit(w)}px`;
    }
  },
  methods: {
    styleRemoveUnit(style) {
      if (typeof style == "number") return style;
      let str = "";

      let unitList = ["rem", "px", "%", "em", "vw"];

      unitList.forEach(unit => {
        if (style.indexOf(unit >= 0)) {
          str = style.replace(unit, "");
        }
        return;
      });
      return parseInt(str);
    },
    locateFomat(locate) {
      return `top:${locate.top}px;left:${locate.left}px`;
    },
    onJsonClick(value) {
      console.log(value);
      this.$set(this.brickList, this.activeNum, value);
    },
    componentClick(index) {
      this.isActive = true;
      this.activeBrick = this.brickList[index];
      this.activeNum = index;
    },
    closeHandler() {
      this.isActive = false;
      this.activeNum = -1;
    }
  },
  components: {
    fan: Fan,
    light: Light,
    phone: Phone,
    vueJsonEditor
  }
};
</script>