<template>
  <div class="yolo">
    <v-card class="mx-auto yolo-card" max-width="1024">
      <img :src="logo" alt="logo" width="50" />
      <video autoplay playsinline></video>

      <v-icon id="capture" @click="captureImage">camera_alt</v-icon>

      <div id="output" class="mb-5" max-width="1024"></div>
      <v-card-subtitle>System Status | Pivacy Policy | Terms & Conditions | Copyright © 2020 YP Cloud. All rights reserved</v-card-subtitle>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.yolo-card {
  max-width: 1024px;
  display: flex;
  flex-flow: column;

  align-items: center;
  * {
    display: flex;
  }
  img {
    margin: 1.5rem;
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
</style>
<script>
import Instascan from "instascan";
import logo from "@/assets/pet.svg";
import imports from "@/import.js";
import webmms from "webmms-client";
import config from "@/config";
import axios from "axios";
// import google from "googleapis";

// const { google } = require("googleapis");
import { set as setCookie, get as getCookie } from "es-cookie";
export default {
  name: "yolo",
  data() {
    return {
      logo,
      imgData: "",
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
      blob: "",
      scale: 0.25,
      formData: new FormData()
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
      return new Promise((resolve, reject) => {
        // console.log("sending", this.mms);
        this.mms
          .sendMMS({
            topic: "ml://tiny-yolo-v3(pytorch)/image_url",
            DDN: ">>py-ai",
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
            console.log("res", res);
            resolve(res);
          })
          .catch(err => {
            console.log("err", err);
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
        // document.getElementById('DDN').innerText = `DDN: ${DDN}`
        setCookie("EiToken", EiToken, { expires: 7, path: "" });
        setCookie("SToken", SToken, { expires: 7, path: "" });
      });
    },
    initWebRTC() {
      const vm = this;
      this.video = document.querySelector("video");
      this.output = document.querySelector("#output");
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
      canvas.width = 640;
      canvas.height = 480;
      canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, canvas.width, canvas.height);
      var img = document.createElement("img");

      img.style.margin = "5px";
      img.style.display = "flex";
      img.style.borderRadius = "3px";
      img.src = canvas.toDataURL();
      this.imgData = canvas.toDataURL("image/png");
      this.blob = canvas.toBlob(b => {
        var fileName = vm.getNowDateTimeString();
        this.formData.append("yoloImg", b, `${fileName}.png`);
        console.log(fileName);
        axios
          .post(`${config.webConfig.webAPI}upload-yolo`, this.formData)
          .then(() => {
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
    }
  },
  mounted() {
    this.initWebRTC();
    this.mmsInit();
    console.log(this.getNowDateTimeString());
  }
};
</script>