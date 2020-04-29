<template>
  <div class="status" :class="{noting:isNoting}">
    <component :msg="displayMsg" :is="statusComponent"></component>
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
import not_interested from "./StatusList/not_interested";
import sender from "./StatusList/sender";
import work_down from "./StatusList/work_down";

export default {
  name: "status",
  data() {
    return {
      statusList: {
        loading: load,
        noting: noting,
        offline: offline,
        cloudError: offline,
        not_interested: not_interested,
        send_mms: sender,
        send_ajax: sender,
        mms_ok: work_down
      },
      msgMenu: {
        mms: "Send to mms",
        ajax: "Send to webAPI"
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
    },
    displayMsg() {
      // console.log(this.status.replace("send_", ""), this.msgMenu["mms"]);
      return this.status.indexOf("send") >= 0
        ? this.msgMenu[this.status.replace("send_", "")]
        : "";
    }
  },
  components: { load, noting, offline, not_interested, sender, work_down }
};
</script>