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
  methods: basicTemplate.methods,
  computed: basicTemplate.computed,
  props: basicTemplate.props,
  mounted: basicTemplate.mounted,
  watch: basicTemplate.watch
};
</script>