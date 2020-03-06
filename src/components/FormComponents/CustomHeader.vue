<template>
  <v-toolbar :color="formColor">
    <v-toolbar-title>{{formName}}</v-toolbar-title>
    <v-spacer></v-spacer>

    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <v-toolbar-title class="toolbarMsg" v-if="formMsg!=''">{{formMsg}}</v-toolbar-title>
    </transition>
    <v-spacer></v-spacer>
    <v-toolbar-title class="toolbarTime">{{formatDateTime}}</v-toolbar-title>
  </v-toolbar>
</template>

<style lang="scss" scoped>
@import "../../../node_modules/animate.css/animate.css";
.toolbarTime {
  color: darkgray;
}
.toolbarMsg {
  color: steelblue;
}
</style>
<script>
export default {
  name: "coustomHeader",
  data() {
    return {
      nowDateTime: new Date()
    };
  },
  computed: {
    //form title date time format
    formatDateTime() {
      let year = this.nowDateTime.getFullYear();
      let month = this.zeroStuffing(this.nowDateTime.getMonth() + 1, 2);
      let day = this.zeroStuffing(this.nowDateTime.getDate(), 2);
      let hour = this.zeroStuffing(this.nowDateTime.getHours(), 2);
      let min = this.zeroStuffing(this.nowDateTime.getMinutes(), 2);
      return `${year}-${month}-${day} ${hour}:${min}`;
    }
  },
  methods: {
    zeroStuffing: function(str, strNum) {
      let zero = "0".repeat(strNum);
      let zeroAndStr = zero + str;

      return zeroAndStr.slice(zeroAndStr.length - strNum, zeroAndStr.length);
    }
  },
  watch: {
    // watch computed transfer to panrent components
    formatDateTime: {
      handler: function() {
        this.$emit("setResData", "FDT", this.formatDateTime);
      },
      immediate: true
    }
  },
  props: ["formName", "formColor", "formMsg"]
};
</script>