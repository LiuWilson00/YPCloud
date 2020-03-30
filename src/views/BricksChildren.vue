<template>
  <div class="brick">
    <component
      :is="brickName"
      :animate="brick.animate"
      :class="`${brick.type+'0'}`"
      :brick_style="brick.style"
      :bIndex="brick.type+'0'"
      :brickAction="brick.brickAction"
    ></component>
  </div>
</template>

<style lang="scss" scoped>
.brick {
  width: 1024px;
  height: 768px;
}
</style>
<script>
import fan from "@/components/Bricks/Fan.vue";
import light from "@/components/Bricks/Light.vue";
import phone from "@/components/Bricks/Phone.vue";
import traffic from "@/components/Bricks/Traffic.vue";
import car from "@/components/Bricks/Car.vue";
import girl from "@/components/Bricks/Girl.vue";
import boy from "@/components/Bricks/Boy.vue";
import drone from "@/components/Bricks/Drone.vue";
import streetLight from "@/components/Bricks/StreetLight.vue";
import refrigerator from "@/components/Bricks/Refrigerator.vue";
import brickJson from "@/brick.json";
export default {
  name: "brick",
  props: ["brickName"],
  data() {
    return {};
  },
  computed: {
    brick() {
      return brickJson[this.brickName];
    }
  },
  methods: {},
  mounted() {},
  components: {
    fan,
    light,
    phone,
    traffic,
    car,
    girl,
    boy,
    drone,
    streetLight,
    refrigerator
  }
};
</script>