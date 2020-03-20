<template>
  <div class="HeaderBar">
    <v-app-bar color="grey darken-3" dense dark>
      <img :src="runApp" class="qIcon" />
      <v-spacer></v-spacer>
      <v-card-subtitle class="white--text">Wilson</v-card-subtitle>

      <v-menu bottom left offset-y min-width="300">
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon class="arrow-down">keyboard_arrow_down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="itemHandler">
            <v-list-item-title>{{ item.title }}   </v-list-item-title>
            <v-spacer></v-spacer>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<style lang="scss" src="./style.scss" scoped>
</style>
<script>
import runApp from "@/assets/runApp.png";
import icon from "@/assets/gitpage_icon.png";
import crow from "@/assets/crow.png";
export default {
  name: "HeaderBar",
  data() {
    return {
      runApp,
      abc: "123",
      items: [
        { title: "Account Settings", icon: "settings" },
        { title: "Help", icon: "help_outline" },
        { title: "Sign Out", icon: "subdirectory_arrow_right" }
      ]
    };
  },
  methods: {
    itemHandler() {
      return;
    }
  },
  mounted() {
    console.log(this.runApp);
  }
};
</script>