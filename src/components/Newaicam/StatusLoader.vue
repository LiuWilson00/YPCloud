<template>
  <div class="status" :class="{noting:isNoting}">
    <component :is="statusComponent"></component>
  </div>
</template>
<style lang="scss">
.status {
  position: absolute;
  display: flex;
  top: 50%;
  left: calc(50% - 20px);
}
.status.noting {
  display: none;
}
</style>
<script>
import load from "./StatusList/load";
import noting from "./StatusList/noting";
import offline from "./StatusList/offline";
export default {
  name: "status",
  data() {
    return {
      statusList: {
        loading: load,
        noting: noting,
        offline: offline
      }
    };
  },
  props: {
    status: {
      type: String,
      default: "noting"
    }
  },
  computed: {
    statusComponent() {
      return this.statusList[this.status];
    },
    isNoting() {
      return this.status == "noting";
    }
  },
  components: { load, noting, offline }
};
</script>