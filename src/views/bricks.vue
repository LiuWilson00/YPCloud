<template>
  <div class="bricks">
    <v-card class="mx-auto fixed" width="300">
      <v-list>
        <v-list-item @click="brickList.push(fanTemplate)">
          <v-list-item-icon>
            <v-icon>toys</v-icon>
          </v-list-item-icon>

          <v-list-item-title>fan</v-list-item-title>
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
import vueJsonEditor from "vue-json-editor";
export default {
  name: "bricks",
  data() {
    return {
      isActive: false,
      activeNum: -1,
      activeModel: {},
      fanTemplate: {
        type: "fan",
        style: { width: 100 },
        locate: { top: 100, left: 100 },
        animate: [
          {
            targets: ".leaf",
            // rotateZ: 250,
            rotate: {
              value: 0,
              duration: 1800,
              easing: "linear"
            },
            loop: true
          }
        ]
      },
      brickList: [
        {
          type: "fan",
          style: { width: 100 , colorRotate: 30 },
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
          ]
        },
        {
          type: "fan",
          style: { width: 100 },
          locate: { top: 100, left: 200 },
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
          ]
        }
      ]
    };
  },
  computed: {
    jsonEditorLocate() {
      return this.activeNum == -1
        ? ""
        : `top:${this.brickList[this.activeNum].locate.top +
            this.brickList[this.activeNum].style.width * 1.5}px;left:${this
            .brickList[this.activeNum].locate.left +
            this.brickList[this.activeNum].style.width}px`;
    }
  },
  methods: {
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
    vueJsonEditor
  }
};
</script>