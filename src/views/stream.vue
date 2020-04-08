<template>
  <div class="stream">
    <v-card-title>stream</v-card-title>
    <v-card-subtitle>{{clientId}}</v-card-subtitle>
    <p>cline video</p>
    <video width="300px" autoplay playsinline></video>
    <p>target stream video</p>

    <v-select v-model="wsconfig" :items="items" label="ws config"></v-select>

    <img :src="imgFrame" alt />
    <v-text-field v-model="targetId" label="targetId"></v-text-field>
    <v-text-field v-model="msg" label="msg"></v-text-field>
    <p>test</p>
    <v-btn @click="send">send1</v-btn>
    <v-btn @click="send2">send2</v-btn>
    <v-btn @click="wstream">re connect</v-btn>
    <p>stream</p>
    <v-btn color="blue" @click="startStream">startStream</v-btn>
    <v-btn color="blue" @click="sendOne">send one</v-btn>
    <v-btn color="red" @click="stopStream">stoptream</v-btn>
    <p>get data</p>
    <v-btn color="green" @click="getTargetImg">getTargetImg</v-btn>
  </div>
</template>
<script>
// import rtmp from '../RtmpStreamer.swf'
export default {
  name: "stream",
  data() {
    return {
      streamer: {},
      streamerid: "wilson",
      rtmp: {
        base: "rtmp://127.0.0.1:1935/live",
        code: "123"
      },
      clientId: "",
      targetId: "",
      msg: "",
      video: {},
      ws: {},
      imgFrame: "",
      interval: {},
      items: ["ws://localhost:3000", "wss://webapi.git.page/"],
      wsconfig: "ws://localhost:3000"
    };
  },
  mounted: function() {
    this.video = document.querySelector("video");
    this.wstream();
    this.initDeviceChange();
  },
  methods: {
    conn: function() {
      if (!this.rtmp.base) {
        return;
      }
    },
    IsJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    wstream: function() {
      this.ws = new WebSocket("ws://localhost:3000/");

      //開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
      this.ws.onopen = () => {
        console.log("open connection");
      };

      //關閉後執行的動作，指定一個 function 會在連結中斷後執行
      this.ws.onclose = () => {
        console.log("close connection");
      };
      this.ws.onmessage = event => {
        if (this.IsJsonString(event.data)) {
          console.log(JSON.parse(event.data));
          if (JSON.parse(event.data).connectId != undefined) {
            this.clientId = JSON.parse(event.data).connectId;
          }
        } else {
          console.log(event.data);
        }
      };
    },
    send() {
      this.ws.send(JSON.stringify({ msg: this.msg }));
    },
    send2() {
      this.ws.send(
        JSON.stringify({
          type: "getData",
          clientId: this.clientId,
          targetId: this.targetId,
          msg: this.msg
        })
      );
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
      }

      function handleError(error) {
        console.log("getUserMedia error: ", error);
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
    },
    stopStream() {
      clearInterval(this.interval);
    },
    sendOne() {
      let img = this.getImg();
      this.ws.send(JSON.stringify({ imgFrame: img }));
      console.log("send done");
    },
    startStream() {
      this.interval = setInterval(() => {
        let img = this.getImg();
        this.ws.send(JSON.stringify({ imgFrame: img }));
        console.log("send done");
      }, 1000);
    },
    getImg() {
      const vm = this;
      var canvas = document.createElement("canvas");
      var scale = 1;
      canvas.width = vm.video.videoWidth * scale;
      canvas.height = vm.video.videoHeight * scale;
      canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png");
    },
    getTargetImg() {
      const vm = this;
      this.ws.send(
        JSON.stringify({
          type: "getData",
          clientId: this.clientId,
          targetId: this.targetId,
          msg: this.msg
        })
      );
      this.ws.onmessage = event => {
        console.log(event);
        if (vm.IsJsonString(event.data)) {
          if (JSON.parse(event.data).imgFrame != undefined) {
            this.imgFrame = JSON.parse(event.data).imgFrame;
          }
        }
      };
    }
  }
};
</script>