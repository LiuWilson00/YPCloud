<script>
import axios from "axios";
import config from "../../config";
export default {
  name: "camMethods",
  methods: {
    initDeviceChange() {
      const vm = this;
      var constraints = {
        video: true
      };
      function handleSuccess(stream) {
        // console.log(stream, typeof stream);
        window.stream = stream; // only to make stream available to console
        vm.camStream = stream;
      }

      function handleError(error) {
        console.log("getUserMedia error: ", error);
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
    },
    backDeviceChange() {
      const vm = this;

      function handleSuccess(stream) {
        window.stream = stream; // only to make stream available to console
        vm.camStream = stream;
        // setTimeout(vm.resizeScreen(), 1000);
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

    captureImage(target, ajaxCallback, mmsCallback, errorCallback) {
      const vm = this;
      var canvas = document.createElement("canvas");
      var scale = 1;
      canvas.width = vm.videoDom == undefined ? 1024 : vm.videoDom.clientWidth;
      canvas.height = vm.videoDom == undefined ? 1024 : vm.videoDom.clientHeight;
      canvas
        .getContext("2d")
        .drawImage(target, 0, 0, canvas.width, canvas.height);

      this.imgList.push(canvas.toDataURL("image/png"));
      canvas.toBlob(b => {
        var fileName = vm.getNowDateTimeString();
        this.formData.append("yoloImg", b, `${fileName}.png`);
        console.log(fileName);
        axios
          .post(`${config.webConfig.webAPI}upload-yolo`, this.formData)
          .then(res => {
            console.log(res);
            if (ajaxCallback != undefined) ajaxCallback(res);
            vm.formData = new FormData();
            vm.sendToPiAI(
              `https://webapi.git.page/images/yolo/${fileName}.png`,
              mmsCallback,
              errorCallback
            );
          })
          .catch(err => {
            if (errorCallback != undefined) errorCallback(err);
            console.log(err);
          });
      }, "image/png");
      // output.prepend(img);
    },
    getNowDateTimeString() {
      let d = new Date();
      function zeroed(time) {
        let len = time.toString().length;
        return `00${time.toString()}`.slice(len, len + 2);
      }

      return `${d.getFullYear()}${zeroed(d.getMonth() + 1)}${zeroed(
        d.getDate()
      )}${zeroed(d.getHours())}${zeroed(d.getSeconds())}`;
    }
  }
};
</script>