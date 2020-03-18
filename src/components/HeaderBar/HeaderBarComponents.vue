<template>
  <div class="HeaderBar">
    <v-app-bar color="grey darken-3" dense dark>
      <img :src="qIcon" class="qIcon" />
      <v-spacer></v-spacer>
      Wilson
    </v-app-bar>
  </div>
</template>

<style lang="scss" src="./style.scss" scoped>
</style>
<script>
import qIcon from "@/assets/icon_Q.png";
import icon from "@/assets/gitpage_icon.png";
import crow from "@/assets/crow.png";
export default {
  name: "HeaderBar",
  data() {
    return { qIcon, abc: "123" };
  },
  mounted() {
    console.log(this.qIcon);
  }
};
</script>