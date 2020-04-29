<template>
  <div class="status" ref="sender">
    <v-row class="fill-height" align-content="center" justify="center" width="400">
      <v-col class="subtitle-1 text-center" cols="12">{{msg}}</v-col>
      <v-col cols="12">
        <v-progress-linear color="grey lighten-5" indeterminate rounded height="6"></v-progress-linear>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.status {
  --font-len: 95px;
  position: relative;
  left: calc(50% - 125px);
  .text-center {
    width: 150px;
    color: white;
  }
}
</style>
<script>
export default {
  name: "sender",
  props: {
    msg: {
      type: String,
      default: "send to remote"
    }
  },
  mounted() {
    console.log(this.$refs.sender);
    this.$refs.sender.style.setProperty(
      "--font-len",
      `${this.msg.length * 7}px`
    );
  }
};
</script>