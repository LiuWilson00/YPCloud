<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="jsonData.closeOnContentClick?true:false"
    :return-value.sync="inputValue"
    :transition="jsonData.transition===undefined?'scale-transition':jsonData.transition"
    :offset-y="jsonData.offsetY?true:false"
    :min-width="jsonData.minWidth===undefined?'290px':jsonData.minWidth"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="inputValue"
        :label="jsonData.label"
        prepend-icon="event"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="inputValue" no-title scrollable @input="inputDate()">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(inputValue)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import basicTemplate from "./vtemplate";

const dateMethods = basicTemplate.methods;

dateMethods.inputDate = function() {
  this.$refs.menu.save(this.inputValue);
  this.menu = false;
};

export default {
  name: "VDP",
  data() {
    return {
      inputValue: this.jsonData.defaultValue
        ? this.jsonData.defaultValue
        : new Date(),
      menu: false
    };
  },
  props:basicTemplate.props,
  computed:basicTemplate.computed,
  mounted:basicTemplate.mounted,
  methods: dateMethods,
  watch: basicTemplate.watch
};
</script>