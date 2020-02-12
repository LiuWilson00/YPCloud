<template>
  <div id="home">
    <img class="icon" :src="icon" alt="icon" />
    <webMMSComponent></webMMSComponent>
  </div>
</template>

<style lang="scss" scoped>
#home {
  text-align: center;
}
</style>


<script>
import webMMSComponent from "../components/WebMMS";
import icon from "@/assets/gitpage_icon.png";
export default {
  name: "home",
  data() {
    return {
      icon
      
    };
  },
  components:{
    webMMSComponent
  }
};
</script>