<template>
  <v-toolbar :color="formColor">
    <v-toolbar-title>{{formName}}</v-toolbar-title>

    <v-spacer></v-spacer>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <v-toolbar-title v-if="formMsg!=''">{{formMsg}}</v-toolbar-title>
    </transition>
  </v-toolbar>
</template>

<style lang="scss" scoped>
@import "../../../node_modules/animate.css/animate.css";
</style>
<script>
export default {
  name: "coustomHeader",
  props: ["formName", "formColor", "formMsg"]
};
</script>