<template>
  <v-text-field :label="jsonData.name" v-model="inputValue"></v-text-field>
</template>

<script>
import basicTemplate from "./vtemplate"
export default {
  name: "VTF",
  data() {
    return {
      inputValue: ""
    };
  },
  methods:basicTemplate.methods,
  props: basicTemplate.props,
  mounted:basicTemplate.mounted,
  watch:basicTemplate.watch
};
</script>