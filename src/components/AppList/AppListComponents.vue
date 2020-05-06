<template>
  <div class="app-list">
    <v-row style="max-width:700px">
      <v-col v-for="app in appList" :key="app.appId"  :cols="colNumber">
        <AppItem :app="app"></AppItem>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" src="./style.scss" scoped>
</style>
<script>
import AppItem from "../AppItem/AppItemComponents";
export default {
  name: "appList",
  data() {
    return {
      colNumber: 2
    };
  },
  methods: {
    getColNumber() {
      console.log(window.outerWidth);
      if (window.outerWidth < 450) {
        this.colNumber = 4;
        return 4;
      }
      this.colNumber = 2;
      return 2;
    }
  },
  mounted() {
    window.addEventListener("resize", this.getColNumber);
    this.getColNumber();
  },
  props: ["appList"],
  components: {
    AppItem
  }
};
</script>