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
          <v-btn small color="primary" @click="peerSubmitHandler">submit</v-btn>
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
            class="mt-3 videoCam"
            :class="[{animated:flash ,flash:flash,faster:flash},videoActive=='local'?'active':'']"
            autoplay
            playsinline
            @click="videoActive='local'"
          ></video>
          <video
            id="remote"
            class="mt-3 videoCam"
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
<style lang="scss" src="../styles/AIBotStyle.scss" scoped>
</style>
<script>
import imports from "@/import.js";

import axios from "axios";
import parse from "url-parse";
import peerComponent from "@/components/AIBot/peer.vue";
import mmsComponent from "@/components/AIBot/mms.vue";
// import google from "googleapis";

// const { google } = require("googleapis");

export default {
  name: "yolo",
  data() {
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
      imgData: "",
      flash: false,
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
  mixins: [peerComponent, mmsComponent],
  methods: {
    actionStart(string) {
      this[string]();
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
    this.peerInit();
    this.video = document.querySelector("#local");
    this.remoteVideo = document.querySelector("#remote");
    this.output = document.querySelector("#output");
    this.mmsInit();
    this.backDeviceChange();
  }
};
</script>