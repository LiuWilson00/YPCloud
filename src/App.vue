<template>
  <v-app id="app">
    <router-view name="nonnav"></router-view>

    <v-container class="pa-0" fluid>
      <v-flex xs12>
        <router-view name="nav">
          <router-view></router-view>
        </router-view>
      </v-flex>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
</style>
<script>
export default {
  name: "App",
  created() {}
};
</script>

