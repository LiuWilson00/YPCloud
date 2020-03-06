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
  mixins: [basicTemplate]
};
</script>