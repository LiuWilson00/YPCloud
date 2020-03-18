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
      appList: [
        {
          appId: 1,
          name: "Flow Builder",
          order: 0,
          iconName: "Flow_Builder",
          iconUrl: "https://i.imgur.com/3SswLvz.jpg"
        },
        {
          appId: 2,
          name: "YOLO",
          order: 10,
          iconName: "YOLO",
          iconUrl: "https://i.imgur.com/fIR80RQ.png"
        },
        {
          appId: 3,
          name: "YOLO",
          order: 10,
          iconName: "YOLO",
          iconUrl: "https://i.imgur.com/fIR80RQ.png"
        },
        {
          appId: 4,
          name: "YOLO_Wilson",
          order: 10,
          iconName: "YOLO",
          iconUrl: "https://i.imgur.com/fIR80RQ.png"
        },
        {
          appId: 5,
          name: "YOLO",
          order: 10,
          iconName: "YOLO",
          iconUrl: "https://i.imgur.com/fIR80RQ.png"
        },
        {
          appId: 6,
          name: "YOLO",
          order: 10,
          iconName: "YOLO",
          iconUrl: "https://i.imgur.com/fIR80RQ.png"
        },
        {
          appId: 7,
          name: "YOLO",
          order: 10,
          iconName: "YOLO",
          iconUrl: "https://i.imgur.com/fIR80RQ.png"
        }
      ]
    };
  },
  components: {
    AppItem
  }
};
</script>