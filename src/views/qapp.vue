<template>
  <div class="qapp">
    <HeaderBar class="header-bar" />
    <UserInfo class="user-info" />
    <LoadAppView v-if="appList.length==0" />
    <AppList v-else :appList="appList" />
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
import imports from "../import";
import LoadAppView from "@/components/LoadAppView/LoadAppViewComponents.vue";
export default {
  name: "qapp",
  data() {
    return {
      urtData: "",
      importsList: []
    };
  },
  computed: {
    appList() {
      if (this.importsList.data == undefined) return [];
      return this.importsList.data;
    }
  },
  async mounted() {
    const vm = this;
    this.importsList = await imports.getDatFromUrl();
    imports.mmsInit(async () => {
      vm.urtData = await imports.getDatFromUrt();
    });
  },
  components: {
    HeaderBar,
    UserInfo,
    AppList,
    LoadAppView
  }
};
</script>
