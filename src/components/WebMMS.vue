<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="text-center" cols="12" sm="12">
        <v-text-field v-model="inputData" label="input"></v-text-field>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col class="text-center" cols="12" sm="12">
        <v-btn depressed large color="primary" @click="btnHandle">submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import webmms from "webmms-client";
import config from "../config";
import { set as setCookie, get as getCookie } from "es-cookie";
export default {
  name: "webMMS",
  data() {
    return {
      inputData: "",
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
  methods: {
    startMMS() {
      this.mms = webmms();
    },
    btnHandle() {
      (async () => {
        await this.mms.sendMMS({
          topic: config.webConfig.tgTopic,
          DDN: config.webConfig.tgDDN,
          func: "",
          payload: {
            type: "message",
            content: `Name:Wilson,Data:${new Date()
              .toISOString()
              .substr(0, 16)},Msg:${this.inputData}`
          }
        });
      })();
    }
  },
  mounted() {
    this.webmmsOptions.EiToken = getCookie("EiToken") || "";
    this.webmmsOptions.SToken = getCookie("SToken") || "";

    let tempEiToken = this.webmmsOptions.EiToken;
    let tempSToken = this.webmmsOptions.EiToken;

    console.log({ tempEiToken, tempSToken });
    this.mms = webmms({ tempEiToken, tempSToken });
    this.mms.on("registered", reply => {
      console.log(reply);
      let {
        result: { DDN, EiToken, SToken }
      } = reply;
      let id = 0;
      // document.getElementById('DDN').innerText = `DDN: ${DDN}`
      setCookie("EiToken", EiToken, { expires: 7, path: "" });
      setCookie("SToken", SToken, { expires: 7, path: "" });

      // setInterval(async () => {
      //   await this.mms.sendMMS({
      //     topic: "tg://-289793659",
      //     DDN: ">>comm",
      //     func: "",
      //     payload: { type: "message", content: "Hello World" }
      //   });
      // }, 3000);

      // // mms.on('message', (method, from, data, ack) => {
      // //     document.getElementById('message').innerText = `
      // //         method: ${method}
      // //         from: ${JSON.stringify(from)}
      // //         data: ${data}
      // //         ack: ${ack}
      // //     `
      // // })

      mms.on("state", state => console.log(state));
    });
  }
};
</script>