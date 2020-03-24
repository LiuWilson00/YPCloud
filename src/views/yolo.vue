<template>
  <div class="yolo">
    <v-card class="mx-auto yolo-card" max-width="1024">
      <img :src="logo" alt="logo" width="50" />
      <video autoplay playsinline></video>

      <v-icon id="capture">camera_alt</v-icon>
      <div id="output" class="mb-5" max-width="1024"></div>
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
export default {
  name: "yolo",
  data() {
    return { logo };
  },
  mounted() {
    var scale = 0.25;
    var constraints = {
      video: true
    };
    var video = document.querySelector("video");
    var output = document.querySelector("#output");
    document.querySelector("#capture").addEventListener("click", captureImage);

    function handleSuccess(stream) {
      window.stream = stream; // only to make stream available to console
      video.srcObject = stream;
      console.log(stream);
    }

    function handleError(error) {
      console.log("getUserMedia error: ", error);
    }
    function captureImage() {
      var canvas = document.createElement("canvas");
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      var img = document.createElement("img");

      img.style.margin = "5px";
      img.style.display = "flex";
      img.style.borderRadius = "3px";
      img.src = canvas.toDataURL();
      output.prepend(img);
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
    video.addEventListener("play", e => {
      console.log(e);
    });
  }
};
</script>