<template>
  <v-text-field :label="jsonData.name" v-model="inputValue"></v-text-field>
</template>

<script>
export default {
  name: "VTF",
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
      this.$emit(
        "setResData",
        this.jsonData.varName === undefined
          ? this.jsonData.name
          : this.jsonData.name,
        this.inputValue
      );
    }
  }
};
</script>