<template>
  <div class="qapp">
    <HeaderBar class="header-bar" />
    <UserInfo class="user-info" />
    <AppList />
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
  components: {
    HeaderBar,
    UserInfo,
    AppList
  }
};
</script>
