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
export default {
  name: "VCB",
  data() {
    return {
      inputValue: ""
    };
  },
  props: ["jsonData"],
  mounted() {
    this.inputValue = this.jsonData.defaultValue;
  },
  watch: {
    inputValue: function() {
      this.$emit("setResData", this.jsonData.name, this.inputValue);
    }
  }
};
</script>