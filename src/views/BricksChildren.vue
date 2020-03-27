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
    phone
  }
};
</script>