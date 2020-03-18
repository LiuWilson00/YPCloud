<template>
  <div class="app-list">
    <v-row>
      <v-col v-for="app in appList" :key="app.appId" cols="2">
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
      
    };
  },
  props:["appList"],
  components: {
    AppItem
  }
};
</script>