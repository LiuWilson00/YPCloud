<template>
  <div class="yolo">
    <v-card class="mx-auto yolo-card" max-width="1024">
      <div class="toolbar">
        <img :src="logo" alt="logo" class="logo mt-3" width="50" />
      </div>
      <v-card-subtitle v-if="!isRegistered">{{isRegistered?"":"MMS is not registered"}}</v-card-subtitle>
      <video :class="{animated:flash ,flash:flash,faster:flash}" autoplay playsinline></video>
      <v-icon @click="cachedHandler">cached</v-icon>
      <v-icon id="capture" @click="captureImage">camera_alt</v-icon>

      <div id="output" class="mb-5" max-width="1024"></div>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
@import "../../node_modules/animate.css/animate.css";
.yolo-card {
  max-width: 1024px;
  display: flex;
  flex-flow: column;
  .toolbar {
    flex: auto;
    align-self: flex-end;

    padding-right: 5%;
  }
  .logo {
    margin: 15px;
  }
  .title {
    padding: 0;
  }
  align-items: center;
  * {
    display: flex;
  }
  video {
    border-radius: 10px;
  }
  #capture {
    font-size: 3rem;
    margin: 3rem;
  }
  #output {
    border-top-style: outset;
    width: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    .captureImg {
      display: flex;
      margin: 5px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .yolo-card {
    video {
      width: 350px;
    }
    #output {
      width: 350px;
    }
  }
}
</style>
<script>
import Instascan from "instascan";
import logo from "@/assets/aibot.png";
import imports from "@/import.js";
import webmms from "webmms-client";
import config from "@/config";
import axios from "axios";
import Peer from "peerjs";
import parse from "url-parse";
// import google from "googleapis";

// const { google } = require("googleapis");
import { set as setCookie, get as getCookie } from "es-cookie";
export default {
  name: "yolo",
  data() {
    return {
      logo,
      imgData: "",
      flash: false,
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
      },
      video: {},
      output: {},
      scale: 0.25,
      formData: new FormData(),
      target: false, // true : front , false: back.
      isRegistered: false
    };
  },
  computed: {
    base64Img() {
      return this.imgData.replace("data:image/png;base64,", "");
    }
  },
  methods: {
    getNowDateTimeString() {
      let d = new Date();
      function zeroed(time) {
        let len = time.toString().length;
        return `00${time.toString()}`.slice(len, len + 2);
      }

      return `${d.getFullYear()}${zeroed(d.getMonth() + 1)}${zeroed(
        d.getDate()
      )}${zeroed(d.getHours())}${zeroed(d.getSeconds())}`;
    },
    sendToPiAI(url) {
      const vm = this;
      return new Promise((resolve, reject) => {
        // console.log("sending", this.mms);
        this.mms
          .sendMMS({
            topic: "ml://tiny-yolo-v3(pytorch)/image_url",
            DDN: ">>aibot",
            payload: {
              chatid: "-347773088",
              img_url: url
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
    },
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
        // document.getElementById('DDN').innerText = `DDN: ${DDN}`
        setCookie("EiToken", EiToken, { expires: 7, path: "" });
        setCookie("SToken", SToken, { expires: 7, path: "" });
      });
    },
    initDeviceChange() {
      const vm = this;
      // this.video = document.querySelector("video");
      // this.output = document.querySelector("#output");
      var constraints = {
        video: true
      };
      function handleSuccess(stream) {
        window.stream = stream; // only to make stream available to console
        vm.video.srcObject = stream;
        console.log(stream);
      }

      function handleError(error) {
        console.log("getUserMedia error: ", error);
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
    },
    captureImage() {
      const vm = this;
      var canvas = document.createElement("canvas");
      var scale = 1;
      canvas.width = vm.video.videoWidth * scale;
      canvas.height = vm.video.videoHeight * scale;
      vm.flash = true;
      canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, canvas.width, canvas.height);
      var img = document.createElement("img");

      img.style.margin = "5px";
      img.style.display = "flex";
      img.style.borderRadius = "3px";
      img.style.width = "100px";
      img.src = canvas.toDataURL();
      this.imgData = canvas.toDataURL("image/png");
      canvas.toBlob(b => {
        var fileName = vm.getNowDateTimeString();
        this.formData.append("yoloImg", b, `${fileName}.png`);
        console.log(fileName);
        axios
          .post(`${config.webConfig.webAPI}upload-yolo`, this.formData)
          .then(() => {
            vm.formData = new FormData();
            vm.sendToPiAI(
              `https://webapi.git.page/images/yolo/${fileName}.png`
            );
          });
      }, "image/png");
      output.prepend(img);
      // this.sendScreenshot(img);
      // this.sendToPiAI().then(res => {
      //   console.log(res);
      // });
    },

    sendScreenshot(img) {
      this.formData.append("yoloImg", img);

      axios.post("http://localhost:3000/upload-yolo", this.formData);
    },
    backDeviceChange() {
      const vm = this;

      function handleSuccess(stream) {
        window.stream = stream; // only to make stream available to console
        vm.video.srcObject = stream;
      }

      //STEP1 列出所有可用裝置
      navigator.mediaDevices.enumerateDevices().then(devices => {
        //STEP2 將影片輸出的裝置塞選出
        devices = devices.filter(function(devices) {
          return devices.kind === "videoinput";
        });
        var videoinput_id = ""; //暫存device的id
        //STEP3 找到有back字串的鏡頭
        devices.forEach(function(device) {
          if (device.label.toLowerCase().search("back") != -1) {
            videoinput_id = device.deviceId;
          }
        });
        //STEP4 如果找不到就用第一個找到的鏡頭
        if (videoinput_id != "") {
          navigator.mediaDevices
            .getUserMedia({
              video: {
                deviceId: { exact: videoinput_id },
                facingMode: "environment"
              }
            })
            .then(handleSuccess);
        } else {
          navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then(handleSuccess);
        }
      });
    },
    cachedHandler() {
      if (this.target) {
        this.initDeviceChange();
      } else {
        this.backDeviceChange();
      }
      this.target = !this.target;
    },
    peerInit() {
      let localUrl = window.location.href;
      let parseUrl = parse(localUrl, true);
      let query = parseUrl.query;
      const peer = new Peer(query.id, {
        host: "localhost",
        port: 9000,
        path: "/peer"
      });
      // console.log(peer, query);
      peer.on("open", function(id) {
        console.log("My peer ID is: " + id);
      });
      peer.on("connection", conn => {
        conn.on("open", () => {
          // 有任何人加入這個會話時，就會觸發
          console.log(`${conn.peer} is connected with me`);
        });
        conn.on("data", function(data) {
          // 當收到訊息時會執行
          console.log(`${conn.peer} : ` + data);
          conn.send("HI I am A");
        });
      });
    }
  },
  watch: {
    flash: {
      handler() {
        const vm = this;
        setTimeout(() => {
          vm.flash = false;
        }, 1000);
      }
    }
  },
  mounted() {
    // this.peerInit();
    this.video = document.querySelector("video");
    this.output = document.querySelector("#output");
    this.mmsInit();
    this.backDeviceChange();
  }
};
</script>