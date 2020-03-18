<template>
  <div class="qapp">
    <HeaderBar class="header-bar" />
    <UserInfo class="user-info" />
    <AppList :appList="appList" />
    <v-card-subtitle>System Status | Pivacy Policy | Terms & Conditions | Copyright © 2020 YP Cloud. All rights reserved</v-card-subtitle>
  </div>
</template>
<style  scoped>
.qapp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-info {
  margin: 10rem;
}
.header-bar {
  width: 100%;
}
</style>
<script>
// @ is an alias to /src

import HeaderBar from "@/components/HeaderBar/HeaderBarComponents.vue";
import UserInfo from "@/components/UserInfo/UserInfoComponents.vue";
import AppList from "@/components/AppList/AppListComponents.vue";
export default {
  name: "qapp",
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
    HeaderBar,
    UserInfo,
    AppList
  }
};
</script>
