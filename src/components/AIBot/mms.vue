<script>
import webmms from "webmms-client";
import config from "@/config";
import { set as setCookie, get as getCookie } from "es-cookie";
export default {
  name: "web-mms",
  data() {
    return {
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
  methods: {
    //INIT MMS service
    mmsInit() {
      this.webmmsOptions.EiToken = getCookie("EiToken") || "";
      this.webmmsOptions.SToken = getCookie("SToken") || "";
      let tempEiToken = this.webmmsOptions.EiToken;
      let tempSToken = this.webmmsOptions.EiToken;
      let tempWsurl = config.webConfig.wsurl;
      const vm = this;
      this.mms = webmms({
        wsurl: tempWsurl,
        EiToken: tempEiToken,
        SToken: tempSToken
      });
      this.mms.on("registered", async reply => {
        console.log(reply);
        let {
          result: { DDN, EiToken, SToken }
        } = reply;
        let id = 0;
        vm.isRegistered = true;
        vm.resizeScreen();
        // document.getElementById('DDN').innerText = `DDN: ${DDN}`
        setCookie("EiToken", EiToken, { expires: 7, path: "" });
        setCookie("SToken", SToken, { expires: 7, path: "" });
      });
    },
    //send MMS
    sendToPiAI(url) {
      const vm = this;
      return new Promise((resolve, reject) => {
        // console.log("sending", this.mms);
        this.mms
          .sendMMS({
            topic: "ml://aibot",
            DDN: ">>aibot",
            payload: {
              chatid: "-347773088",
              img_path: "",
              img_url: url,
              method: "url",
              model: this.aiMod
            }
          })
          .then(res => {
            // console.log(res, urt)

            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //MMS Buket
    setImgToBuket() {
      return new Promise((resolve, reject) => {
        // console.log("sending", this.mms);
        this.mms
          .callMMS({
            topic: "xs://config",
            DDN: ">>sys",
            func: "set",
            payload: {
              catalog: "wt2",
              idname: "wt2",
              data: { base64: this.base64Img }
            }
          })
          .then(res => {
            // console.log(res, urt)
            // console.log("res", res);
            resolve(res);
          })
          .catch(err => {
            // console.log("err", err);
            reject(err);
          });
      });
    }
  }
};
</script>