<template>
  <div class="qapp">
    <HeaderBar :userName="userName" class="header-bar" />
    <UserInfo class="user-info" />

    <LoadAppView v-if="apps.length==0" />
    <AppList v-else :appList="apps" />
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
      importsList: [],
      userName: "Wilson",
      urtAppList: []
    };
  },
  computed: {
    urlAppList() {
      if (this.importsList.data == undefined) return [];
      return this.importsList.data;
    },
    apps() {
      if (
        this.urtAppList.length == 0 ||
        this.urtAppList == false ||
        this.urtAppList == undefined ||
        this.urtAppList == null
      )
        return this.urlAppList;
      return this.urtAppList;
    }
  },
  async mounted() {
    const vm = this;
    this.importsList = await imports.getDatFromUrl();

    imports.mmsInit(async () => {
      vm.urtData = await imports.getDatFromUrt();
      if (vm.urtData == false) return;
      console.log(this.urtData[0].Reply.Data.Data[0].data);
      if (this.urtData != "" && this.urtData[0].Reply.RstMsg == "OK") {
        this.urtAppList = this.urtData[0].Reply.Data.Data[0].data;
      }
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
