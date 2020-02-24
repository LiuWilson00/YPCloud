<template>
  <v-treeview selectable selected-color="red" :items="jsonData.data" v-model="inputValue"></v-treeview>
</template>

<script>
export default {
  name: "VTV",
  data: () => ({
    inputValue:[]
  }),
  props: ["jsonData"],
  watch: {
    inputValue: function() {
      this.$emit("setResData", this.jsonData.name, this.inputValue);
    }
  }
};
</script>