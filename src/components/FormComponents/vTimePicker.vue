<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="inputValue"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="inputValue"
        :label="jsonData.label"
        prepend-icon="access_time"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker v-if="menu" v-model="inputValue" full-width @click:minute="$refs.menu.save(inputValue)"></v-time-picker>
  </v-menu>
</template>

<script>

import basicTemplate from "./vtemplate"



export default {
  name: "VTP",
  data() {
    return {
      inputValue: "",
      menu:false
      
    };
  },
  methods:basicTemplate.methods,
  computed:basicTemplate.computed,
  props: basicTemplate.props,
  mounted:basicTemplate.mounted,
  watch:basicTemplate.watch
};
</script>