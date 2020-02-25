<template>

    <v-textarea :label="jsonData.name" v-model="inputValue"></v-textarea>

</template>

<script>
export default {
  name: "VTA",
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