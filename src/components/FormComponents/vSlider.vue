<template>
  <div class="vsl">
    <v-slider
      v-model="inputValue"
      :rules="jsonData.rules==undefined?[]:jsonData.color"
      :color="jsonData.color==undefined?'orange':jsonData.color"
      :label="jsonData.name"
      :hint="jsonData.hint==undefined?'':jsonData.hint"
      :min="jsonData.min==undefined?0:jsonData.min"
      :max="jsonData.max==undefined?100:jsonData.max"
      :thumb-label="jsonData.thumbLabel==false?false:true"
    ></v-slider>
  </div>
</template>


<script>
import basicTemplate from "./vtemplate";
export default {
  name: "VSL",
  template: "",
  data() {
    return {
      inputValue: 0
    };
  },
  mixins:[basicTemplate]
};
</script>