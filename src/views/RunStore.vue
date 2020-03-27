<template>
  <div class="RunStore">
    <v-row class="titleBar">
      <v-card-title class="ml-10 pt-3 pb-0 title">Search</v-card-title>
      <img :src="userIcon" class="mt-3" alt="userIcon" width="30" height="30" />
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field label="search your apps" filled></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss" scoped>
.titleBar {
  justify-content: space-between;
  .title {
    padding: 0;
  }
  img {
    margin: 5px;
    margin-right: 5%;
  }
}
</style>
<script>
import HeaderBar from "@/components/HeaderBar/HeaderBarComponents.vue";
import UserInfo from "@/components/UserInfo/UserInfoComponents.vue";
import AppList from "@/components/AppList/AppListComponents.vue";
import userIcon from "@/assets/Icon awesome-user-circle.png";
export default {
  name: "RunStore",
  data() {
    return { userIcon };
  }
};

</script>
