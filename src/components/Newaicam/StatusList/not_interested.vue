<template>
  <div class="offline">
    <v-icon class="offline-icon animated flash infinite">not_interested</v-icon>
  </div>
</template>
<style lang="scss" scoped>
@import "../../../../node_modules/animate.css/animate.css";
.offline {
  .offline-icon {
    color: white;
    font-size: 3rem;
  }
}
</style>
<script>
export default {
  name: "offline"
};
</script>