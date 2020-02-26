<template>
  <v-textarea :label="jsonData.name" v-model="inputValue"></v-textarea>
</template>

<script>
import basicTemplate from "./vtemplate";
export default {
  name: "VTA",
  data() {
    return {
      inputValue: ""
    };
  },
  methods: basicTemplate.methods,
  props: basicTemplate.props,
  mounted: basicTemplate.mounted,
  watch: basicTemplate.watch
};
</script>