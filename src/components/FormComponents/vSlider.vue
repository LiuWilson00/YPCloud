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
export default {
  name: "VSL",
  template:'',
  data() {
    return {
      inputValue: 0
    };
  },
  props: ["jsonData"],
  mounted() {
    this.inputValue = this.jsonData.defaultValue;
    console.log( this.$options);
  },
  beforeCreate() {
    console.log(this.$el);
  },
  created() {
    
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