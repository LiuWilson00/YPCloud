<template>
  <div class="userinfo">
    <img :src="userIcon" alt="userIcon" />
     <v-card-title class="display-1 mb-2">Good morning,Wilson.</v-card-title>
     <v-card-subtitle class="blue--text">Account Settings ></v-card-subtitle>
  </div>
</template>
<style lang="scss" src="./style.scss" scoped>
</style>
<script>
import userIcon from "@/assets/Icon awesome-user-circle.png";
export default {
  name: "userInfo",
  data() {
    return {
      userIcon
    };
  }
};
</script>