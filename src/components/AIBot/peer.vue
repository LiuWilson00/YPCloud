


<script>
import axios from "axios";
import Peer from "peerjs";
import parse from "url-parse";
import config from "./peerConfig";
export default {
  name: "peer",
  data() {
    return {
      peer: null, //new peer object
      peerRes: "", //remote send msg
      peerMsg: "", //send to remote msg
      peerID: "wers", //user peer ID
      remotePerrID: "", //remote target peer ID
      peerTarget: "",
      peerDialog: false,

      callingDialog: false,
      callMaxTime: 10000,
      callWaitTime: 0,
      callRemote: {},
      calling: false,
      callInterval: {},
      remoteCaller: {}
    };
  },
  methods: {
    peerInit() {
      const vm = this;

      this.$store.dispatch("INIT_PEER");

      this.peer = new Peer(vm.$store.state.peerId, {
        host: config.peerConfig.peerURL,
        path: config.peerConfig.host
        // debug: 3
      });
      //STEP1 Peer
      this.peerOnOpoen();
      this.peerOnConnection();
      this.peerOnCall();
    },
    peerOnOpoen() {
      const vm = this;
      this.peer.on("open", function(id) {
        vm.peerID = vm.$store.state.peerId;
        console.log("My peer ID is: " + id);
      });
    },
    peerOnConnection() {
      const vm = this;
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
        });
      });
    },
    peerOnCall() {
      //STEP1 some one call
      const vm = this;
      this.peer.on("call", call => {
        const startChat = async () => {
          //STEP2 open peer dialog
          vm.peerDialog = true;

          //STEP3 wait user check agree
          await vm.waitUserInput();

          //STEP4.1 if user agree,then
          if (vm.callAns) {
            call.answer(vm.video.srcObject);
            call.on("stream", stream => {
              vm.calling = true;
              vm.remoteVideo.srcObject = stream;
            });
            //STEP4.2 if user not agree,then cloce call
          } else {
            call.close();
          }
        };
        vm.remoteCaller = call;
        startChat();
      });
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
    //call peer target
    peerSubmitHandler() {
      //STEP1 connect remote clinet
      const conn = this.peer.connect(this.peerTarget);
      const vm = this;
      this.callingDialog = true;

      //STEP2 remote connected, send msg
      conn.on("open", () => {
        conn.send(this.peerMsg);
      });

      //STEP3 call remote clinet,and send video stream
      this.callRemote = this.peer.call(this.peerTarget, this.video.srcObject);

      //STEP4 wait remote answer
      this.waitCall();

      //STEP5 get stream,and put on remoteVideo
      this.callRemote.on("stream", remoteStream => {
        vm.callingDialog = false;
        vm.remoteVideo.srcObject = remoteStream;
        vm.calling = true;
      });
      //STEP5.1 if remote close call some function
      this.callRemote.on("close", err => {
        console.log("close");
      });
    },
    peerDialogClosed(ans) {
      this.peerDialog = false;
      this.callAns = ans;
    },

    //wait remote, use watch to stop.
    waitCall() {
      const vm = this;
      this.callInterval = setInterval(() => {
        vm.callWaitTime = vm.callWaitTime + 1000;
      }, 1000);
    }
  },
  watch: {
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
          }
        }
      }
    }
  }
};
</script>