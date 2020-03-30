<template>
  <div class="bricks">
    <v-menu bottom origin="center center" class="fixed" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Bricks Tool</v-btn>
      </template>
      <v-card class="mx-auto" width="300">
        <v-list>
          <v-list-item
            v-for="item in brickToolbarList"
            :key="item.name"
            @click="brickList.push(Template[item.name])"
            :class="{unEffective:item.Effective}"
          >
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

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
.unEffective {
  display: none;
}
</style>
<script>
import Fan from "@/components/Bricks/Fan.vue";
import Light from "@/components/Bricks/Light.vue";
import Phone from "@/components/Bricks/Phone.vue";
import Traffic from "@/components/Bricks/Traffic.vue";
import Car from "@/components/Bricks/Car.vue";
import Girl from "@/components/Bricks/Girl.vue";
import Boy from "@/components/Bricks/Boy.vue";
import StreetLight from "@/components/Bricks/StreetLight.vue";
import Drone from "@/components/Bricks/Drone.vue";
import Refrigerator from "@/components/Bricks/Refrigerator.vue";

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
      brickToolbarList: [
        { name: "fan", icon: "toys", effective: true },
        { name: "phone", icon: "phone", effective: true },
        { name: "traffic", icon: "traffic", effective: true },
        { name: "light", icon: "wb_incandescent", effective: true },
        { name: "car", icon: "directions_car", effective: true },
        { name: "girl", icon: "sentiment_satisfied_alt", effective: true },
        { name: "boy", icon: "sentiment_satisfied_alt", effective: true },
        { name: "drone", icon: "send", effective: true },
        { name: "streetLight", icon: "flare", effective: true },
        { name: "refrigerator", icon: "kitchen", effective: true }
      ],
      brickList: [
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
        },
        {
          type: "traffic",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 100,
            left: 515
          },
          animate: [],
          brickAction: {
            traffic: ["Carousel"]
          }
        },
        {
          type: "car",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 100,
            left: 615
          },
          animate: [],
          brickAction: {
            tires_L: ["rubberBand", "infinite"],
            tires_R: ["rubberBand", "infinite"],
            base: ["bounce", "infinite"]
          }
        },
        {
          type: "girl",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 100,
            left: 715
          },
          animate: [],
          brickAction: {
            hair: ["pulse", "infinite"],
            face: ["pulse", "infinite", "slower"],
            butterfly: ["jello", "infinite"],
            chothe: ["pulse", "infinite", "delay-1s", "slower"]
          }
        },
        {
          type: "boy",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 100,
            left: 815
          },
          animate: [],
          brickAction: {
            hair: ["pulse", "infinite"],
            face: ["pulse", "infinite", "slower"],
            chothe: ["pulse", "infinite", "delay-1s", "slower"]
          }
        },
        {
          type: "drone",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 100,
            left: 915
          },
          animate: [
            {
              targets: ".propeller",
              rotateY: 720,
              easing: "linear",
              loop: true
            }
          ],
          brickAction: {
            drone: ["wobble", "infinite", "slower"]
          }
        },
        {
          type: "streetLight",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 250,
            left: 215
          },
          animate: [],
          brickAction: {
            shin: ["heartBeat", "infinite"]
          }
        },
        {
          type: "refrigerator",
          style: {
            scale: 0.2083,
            colorRotate: 30
          },
          locate: {
            top: 250,
            left: 315
          },
          animate: [
            {
              targets: ".doorUp",
              rotateY: 115,
              easing: "easeInOutBack",
              loop: true,
              duration: 2500,
              direction: "alternate"
            },
            {
              targets: ".doorDown",
              rotateY: 115,
              easing: "easeInOutBack",
              loop: true,
              direction: "alternate"
            }
          ],
          brickAction: {
            food: ["bounce", "infinite"]
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
    traffic: Traffic,
    car: Car,
    girl: Girl,
    boy: Boy,
    drone: Drone,
    streetLight: StreetLight,
    refrigerator: Refrigerator,
    vueJsonEditor
  }
};
</script>