<template >
  <v-layout justify-cente align-center column class="mt-12">
    <HelloWorld />
  </v-layout>
</template>

<script>
import icon from "@/assets/gitpage_icon.png";
import HelloWorld from "../components/HelloWorld";
import {
  set as setCookie,
  get as getCookie,
  remove as removeCookie
} from "es-cookie";
import webmms from "webmms-client";
import conf from "@/config/config";

export default {
  name: "hello",
  data() {
    return {
      icon,

      params: null,
      error: true,
      errorLoading: false,
      errorMsg: "",
      mmsReady: false,
      mms: null,
      eiInfo: {
        eiName: "",
        eiTag: "",
        ddn: ""
      },
      webmmsOptions: {
        EiToken: "",
        SToken: "",
        UToken: ""
      }
    };
  },
  computed: {},
  async created() {
    this.params = this.$router.query;
    this.startMMS();
  },
  async beforeMount() {
    await this.subscribeMMS();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    checkWebMMSState() {
      if (!this.mmsReady) {
        this.errorMsg = "WebMMS is not connected or registered.";
        this.errorLoading = true;
        return false;
      } else return true;
    },
    startMMS() {
      this.mms = webmms({
        wsurl: conf.wsurl,
        EiToken: getCookie("jj-EiToken") || "",
        SToken: getCookie("jj-SToken") || ""
      });
    },
    async subscribeMMS() {
      this.removeEvent = this.mms.on("registered", async reply => {
        //console.log('reply=%s', JSON.stringify(reply))
        if (reply.ErrMsg == "OK") {
          this.eiInfo.ddn = reply.result.DDN;
          this.webmmsOptions.EiToken = reply.result.EiToken;
          this.webmmsOptions.SToken = reply.result.SToken;
          this.webmmsOptions.UToken = reply.result.UToken;
          if (this.eiInfo.eiName == "") {
            this.eiInfo.eiName = reply.result.EiName
              ? reply.result.EiName
              : "jb" + this.makeId(5);
          }
          if (this.eiInfo.eiTag == "") {
            this.eiInfo.eiTag = reply.result.EiTag ? reply.result.EiTag : "";
          }
          this.mmsReady = true;
          this.error = false;
        } else {
          this.mmsReady = false;
          this.error = false;
        }

        setCookie("jj-EiToken", this.webmmsOptions.EiToken);
        setCookie("jj-SToken", this.webmmsOptions.SToken);

        console.log("regtoCenter: %s", reply.ErrMsg);

        let deviceInfo = {
          DDN: this.eiInfo.ddn,
          EiOwner: "",
          EiName: this.eiInfo.eiName,
          EiType: ".page",
          EiTag: this.eiInfo.eiTag,
          EiLoc: ""
        };
        let result = await this.mms.setDeviceInfo(deviceInfo);

        console.log("SetDevice reply=%s", JSON.stringify(result));
      });

      this.mms.on("message", (method, from, data, body) => {
        this.mmsReady = true;
        this.error = false;
        console.log("rcve: from=%s, data=%s", from, JSON.stringify(data));
        if (typeof data == "object" && !data.from) data.from = from;
        //body.sender = data;
        if (data) {
          //this.eventList.push(data.data);
          //this.setLog({From : from, Data: data}, 'In');
        }
      });

      this.mms.on("state", msg => {
        console.log("WS error: %s", msg);
        this.mmsReady = false;
        this.error = true;
        this.loading = false;
      });

      this.mms.on("disconnect", msg => {
        this.mmsReady = false;
        this.error = true;
        this.loading = false;
      });

      this.mms.on("error", err => {
        this.mmsReady = false;
        this.error = true;
        this.loading = false;
      });

      this.mms.on("connect_error", err => {
        this.mmsReady = false;
        this.error = true;
        this.loading = false;
      });

      this.mms.on("connect_timeout", err => {
        this.mmsReady = false;
        this.error = true;
        this.loading = false;
      });
    }
  },
  components: {
    HelloWorld
  }
};
</script>
