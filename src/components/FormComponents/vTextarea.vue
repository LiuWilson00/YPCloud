<template>
  <v-textarea
    :label="jsonData.name"
    :disabled="jsonData.disabled===undefined?false:jsonData.disabled"
    v-model="inputValue"
  ></v-textarea>
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
  mixins:[basicTemplate]
  // methods: basicTemplate.methods,
  // computed: basicTemplate.computed,
  // props: basicTemplate.props,
  // mounted: basicTemplate.mounted,
  // watch: basicTemplate.watch
};
</script>