<template>
  <div class="yolo">
    <v-card class="mx-auto yolo-card" max-width="1024">
      <!-- Any setting -->
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                class="mx-2 AItoolBtn"
                color="grey lighten-1"
                small
                dark
                v-on="{ ...tooltip, ...menu }"
                v-model="aiMod"
                fab
              >
                <v-icon dark>dehaze</v-icon>
              </v-btn>
            </template>
            <span>AI tool</span>
          </v-tooltip>
        </template>
        <v-card class="toolMenu">
          <v-select :items="aiModItems" v-model="aiMod" filled label="AI model"></v-select>
          <v-card-subtitle>Hello {{peerID}}! now you can call your friend</v-card-subtitle>
          <v-text-field label="msg" v-model="peerMsg" hide-details="auto"></v-text-field>
          <v-text-field label="target" v-model="peerTarget" hide-details="auto"></v-text-field>
          <v-btn small color="primary" @click="submitHandler">submit</v-btn>
        </v-card>
      </v-menu>
      <!-- Any setting  end-->

      <!-- MMS Error msg-->
      <v-card-subtitle v-if="!isRegistered">{{isRegistered?"":"MMS is not registered"}}</v-card-subtitle>

      <!-- MMS Error end-->

      <!-- local Viedo -->
      <div class="mainArea">
        <div class="videoList">
          <video
            id="local"
            class="mt-3 videmCam"
            :class="[{animated:flash ,flash:flash,faster:flash},videoActive=='local'?'active':'']"
            autoplay
            playsinline
            @click="videoActive='local'"
          ></video>
          <video
            id="remote"
            class="mt-3 videmCam"
            v-show="calling"
            :class="videoActive=='remote'?'active':''"
            @click="videoActive='remote'"
            autoplay
          ></video>
        </div>

        <!-- local Viedo end -->

        <!-- change Lens -->
        <!-- <v-icon @click="cachedHandler">cached</v-icon> -->
        <!-- Take picture -->
        <v-slide-group v-model="actionActive" class="pa-4" show-arrows>
          <v-slide-item
            v-for="action in actionList"
            :key="action.type"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-4"
              height="50"
              width="50"
              @click="toggle"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <v-icon color="white" size="25">{{action.icon}}</v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </div>
      <v-expand-transition>
        <v-sheet
          v-if="actionActive != null"
          class="methodList"
          color="grey lighten-4"
          height="200"
          width="1024"
          tile
        >
          <v-row class="fill-height methodsRow" align="center" justify="center">
            <v-icon
              v-for="method in  actionList[actionActive].methods "
              :key="method.type"
              :class="{animated:flash ,pulse:flash,faster:flash}"
              id="capture"
              @click="actionStart(method.funName)"
            >{{method.icon}}</v-icon>
          </v-row>
        </v-sheet>
      </v-expand-transition>
      <!-- Take picture end -->

      <!-- picture area -->
      <div id="output" class="mb-5" max-width="1024"></div>
      <!-- picture area end -->

      <!--Check peer -->
      <v-dialog v-model="peerDialog" max-width="290">
        <v-card class="peerDialog">
          <v-card-title class="headline animated infinite tada">{{remotePerrID}}</v-card-title>

          <v-card-text>Hello! {{peerID}}, you have a call...</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="peerDialogClosed(false)">Disagree</v-btn>

            <v-btn color="green darken-1" text @click="peerDialogClosed(true)">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--progress bar -->
      <v-dialog v-model="callingDialog" max-width="290">
        <v-card class="peerDialog">
          <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="callPercentage"
            color="blue-grey"
          >{{ callSec }}</v-progress-circular>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
@import "../../node_modules/animate.css/animate.css";
.AItoolBtn {
  align-self: flex-end;
}
.peerDialog {
  overflow: hidden;
}

.toolMenu {
  padding: 5%;
}
.yolo-card {
  max-width: 1024px;
  display: flex;
  flex-flow: column;

  .toolbar {
    flex: auto;
    align-self: flex-end;

    padding-right: 5%;
  }
  .mainArea {
    flex-direction: column;
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
  .videoList {
    display: flex;

    .videmCam {
      flex: 2;
      flex-basis: 0%;
      width: 20%;
      border-radius: 10px;
      transition: all 0.5s;
    }
    .videmCam.active {
      flex: 3;
    }
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

/* md - Medium devices (tablets, 768px and up) */
@media (min-width: 600px) and (max-width: 991.98px) {
  .AItoolBtn {
    align-self: flex-start;
  }
  .toolMenu {
    padding: 5%;
  }
  .mainArea {
    flex-direction: column;
  }
  .menuBtn {
    align-self: self-end;
  }
  .yolo-card {
    flex-flow: row;
    #output {
      border-top-style: none;
      width: 15%;
    }
  }
  .methodList {
    width: auto !important;
    height: 640px !important;
    flex-direction: row;
    .methodsRow {
      flex-direction: column;
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
    const vm = this;
    return {
      aiModItems: ["yolov3", "yolov3-tiny"],
      aiMod: "yolov3-tiny",
      actionList: [
        {
          type: "image",
          icon: "photo",
          actionName: "captureImage",
          methods: [
            { type: "image", icon: "camera_alt", funName: "captureImage" },
            {
              type: "switch_camera",
              icon: "switch_camera",
              funName: "cachedHandler"
            }
          ]
        },
        {
          type: "video",
          icon: "voice_chat",
          actionName: "actionName",
          methods: [
            { type: "image", icon: "camera_alt", funName: "captureImage" },
            {
              type: "switch_camera",
              icon: "switch_camera",
              funName: "cachedHandler"
            },
            {
              type: "movie_creation",
              icon: "movie_creation",
              funName: ""
            }
          ]
        }
      ],
      videoActive: "local",
      actionActive: 0,
      // MMS mod item
      remotePerrID: "",
      peer: null,
      peerRes: "",
      peerMsg: "",
      peerID: "",
      peerTarget: "",
      peerDialog: false,
      callAns: null,
      //peer var
      callingDialog: false,
      callMaxTime: 10000,
      callWaitTime: 0,
      callRemote: {},
      calling: false,
      callInterval: {},
      remoteCaller: {},
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
      remoteVideo: {},
      video: {},
      output: {},
      scale: 0.25,
      formData: new FormData(),
      target: true, // Lens: true : front , false: back.
      isRegistered: false
    };
  },
  computed: {
    base64Img() {
      return this.imgData.replace("data:image/png;base64,", "");
    },
    callPercentage() {
      return this.callWaitTime / 100;
    },
    callSec() {
      return `${parseInt(this.callWaitTime / 1000)}s`;
    }
  },
  methods: {
    actionStart(string) {
      this[string]();
    },
    peerDialogClosed(ans) {
      this.peerDialog = false;
      this.callAns = ans;
    },
    //call peer target
    submitHandler() {
      const conn = this.peer.connect(this.peerTarget);
      const vm = this;
      this.callingDialog = true;
      conn.on("open", () => {
        conn.send(this.peerMsg);
      });
      // console.log(this.video.srcObject);
      this.callRemote = this.peer.call(this.peerTarget, this.video.srcObject);
      this.waitCall();
      this.callRemote.on("stream", remoteStream => {
        vm.callingDialog = false;
        console.log("streaming", remoteStream);
        this.remoteVideo.srcObject = remoteStream;
        vm.calling = true;
      });
      this.callRemote.on("close", err => {
        console.log("close");
      });
    },
    //get file name
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
    waitCall() {
      const vm = this;
      this.callInterval = setInterval(() => {
        vm.callWaitTime = vm.callWaitTime + 1000;
      }, 1000);
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
    },
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
        // document.getElementById('DDN').innerText = `DDN: ${DDN}`
        setCookie("EiToken", EiToken, { expires: 7, path: "" });
        setCookie("SToken", SToken, { expires: 7, path: "" });
      });
    },
    //change to front Lens
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
    //change Lens Function
    cachedHandler() {
      if (this.target) {
        this.initDeviceChange();
      } else {
        this.backDeviceChange();
      }
      this.target = !this.target;
    },

    async waitUserInput() {
      const timeout = async ms => new Promise(res => setTimeout(res, ms));
      var waitTime = 0;
      const maxTime = this.callMaxTime;
      while (this.peerDialog != false) {
        waitTime = waitTime + 50;
        await timeout(50);
        if (maxTime < waitTime) {
          this.peerDialog = false;
        }
      }
    },
    peerInit() {
      const vm = this;

      this.$store.dispatch("INIT_PEER");

      this.peer = new Peer(vm.$store.state.peerId, {
        host: "webrtc.git.page",
        path: "/myapp"
        // debug: 3
      });
      // console.log(peer, query);
      this.peer.on("open", function(id) {
        vm.peerID = vm.$store.state.peerId;
        console.log("My peer ID is: " + id);
      });
      this.peer.on("connection", conn => {
        conn.on("open", () => {
          // 有任何人加入這個會話時，就會觸發
          console.log(`${conn.peer} is connected with me`);
        });
        conn.on("data", function(data) {
          // 當收到訊息時會執行
          console.log(`${conn.peer} : ` + data);
          vm.remotePerrID = `${conn.peer} : ` + data;
          vm.peerRes = `${conn.peer} : ` + data;
          conn.send("HI I am A");
        });
      });
      this.peer.on("call", call => {
        const startChat = async () => {
          vm.peerDialog = true;

          // vm.remotePerrID = call.peer;
          await vm.waitUserInput();

          if (vm.callAns) {
            call.answer(vm.video.srcObject);
            call.on("stream", stream => {
              vm.calling = true;
              vm.remoteVideo.srcObject = stream;
            });
          } else {
            call.close();
          }
        };
        vm.remoteCaller = call;
        startChat();
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
    },
    callWaitTime: {
      handler() {
        if (this.callWaitTime > this.callMaxTime) {
          clearInterval(this.callInterval);

          this.callWaitTime = 0;
          this.callingDialog = false;
          this.callRemote.close();
        }
      }
    },
    calling: {
      handler() {
        if (this.calling) {
          clearInterval(this.callInterval);
          this.callWaitTime = 0;
        } else {
          if (this.callRemote != {}) {
            this.callRemote.close();
            this.remoteCaller.close();
          }
        }
      }
    }
    // target: {
    //   handler() {
    //     if (this.calling) {
    //     }
    //   }
    // }
  },
  mounted() {
    this.peerInit();
    this.video = document.querySelector("#local");
    this.remoteVideo = document.querySelector("#remote");
    this.output = document.querySelector("#output");
    this.mmsInit();
    this.backDeviceChange();
  }
};
</script>