<template>
  <v-text-field
    :label="jsonData.name"
    v-model="inputValue"
    :disabled="jsonData.disabled===undefined?false:jsonData.disabled"
  ></v-text-field>
</template>

<script>
import basicTemplate from "./vtemplate";
export default {
  name: "VTF",
  data() {
    return {
      inputValue: ""
    };
  },
  methods: basicTemplate.methods,
  computed: basicTemplate.computed,
  props: basicTemplate.props,
  mounted: basicTemplate.mounted,
  watch: basicTemplate.watch
};
</script>