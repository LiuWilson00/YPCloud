<template>
  <v-treeview selectable selected-color="red" :items="jsonData.data" v-model="inputValue"></v-treeview>
</template>

<script>
import basicTemplate from "./vtemplate";

export default {
  name: "VTV",
  data: () => ({
    inputValue: []
  }),
  mixins: [basicTemplate]
};
</script>