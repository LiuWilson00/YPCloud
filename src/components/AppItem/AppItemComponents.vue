<template>
  <div class="app-item d-flex align-center flex-column ">
    <v-card height="75" width="75" class="d-flex align-center">
      <v-img  :src="app.iconUrl" :alt="app.iconName"></v-img>
    </v-card>
    <v-card-subtitle>{{app.name}}</v-card-subtitle>
  </div>
</template>

<style lang="scss" src="./style.scss" scoped>
</style>
<script>
export default {
  name: "appItem",
  data() {
    return {};
  },
  props: ["app"]
};
</script>