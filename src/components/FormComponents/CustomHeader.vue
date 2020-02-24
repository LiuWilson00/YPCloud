<template>
  <v-toolbar :color="formColor" >
    <v-toolbar-title>{{formName}}</v-toolbar-title>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  name: "coustomHeader",
  props: ["formName","formColor"]
};
</script>