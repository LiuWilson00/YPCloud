<template>
  <div id="home">
    
      <img class="icon" :src="icon" alt="icon" />
   
  </div>
</template>

<style lang="scss" scoped>

.home{
  text-align: center;
}


</style>


<script>
import icon from "@/assets/gitpage_icon.png";
export default {
  name: "home",
  data() {
    return {
      icon
    };
  }
};
</script>