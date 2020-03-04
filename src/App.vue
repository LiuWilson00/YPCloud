<template>
  <v-app id="app">
    <v-content>
      <v-container class="pa-0" fluid>
        <v-flex xs12>
          <router-view name="nav">
            <router-view></router-view>
          </router-view>
        </v-flex>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: "App",
  created() {}
};
</script>

