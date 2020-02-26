<template>
  <v-container fluid>
    <p>{{ jsonData.name || 'null' }}</p>
    <v-radio-group v-model="inputValue" :mandatory="false">
      <v-radio
        v-for="item in jsonData.data"
        :key="item.id"
        :label="item.name"
        :value="item.value===undefined?item.name:item.value"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
import basicTemplate from "./vtemplate";

export default {
  name: "VCB",
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