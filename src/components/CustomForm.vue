<template>
  <div id="CustomForm">
    <v-card class="mx-auto" :max-width="json.setting.maxWidth" outlined>
      <v-row>
        <v-col col="12">
          <coustomHeader :formName="json.name" :formColor="json.header.color" :formMsg="formMsg"></coustomHeader>
        </v-col>

        <v-col
          v-for="component in componentList"
          :key="component.name"
          :cols="component.col===undefined?12:component.col"
        >
          <component
            :is="component.type"
            :jsonData="component"
            @setResData="setResData"
            :ref="component.name"
          ></component>
        </v-col>
        <v-row>
          <v-col col="1" align-self="end">
            <v-btn class="SubmitBtn ml-4" text @click="submitHandler">Submit</v-btn>

            <v-btn class="CancelBtn mr-4" text @click="cancelHandler">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-card>
  </div>
</template>


<style lang="scss" scoped>
.v-card {
  padding: 0 20px;
}
.v-application .align-self-end {
  text-align: end;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import webmms from "webmms-client";
import { set as setCookie, get as getCookie } from "es-cookie";
import Axios from "axios";
import config from "../config";
import rules from "./FormComponents/rules";
import jsonData from "../form";

import coustomHeader from "./FormComponents/CustomHeader";
import jvTextField from "./FormComponents/vTextField";
import jvTreeView from "./FormComponents/vTreeView";
import jvTextarea from "./FormComponents/vTextarea";
import jvSilder from "./FormComponents/vSlider";
import jvCheckBox from "./FormComponents/vCheckBox";
import jvDatePicker from "./FormComponents/vDatePicker";
import jvTimePicker from "./FormComponents/vTimePicker";

export default {
  name: "CustomForm",
  mixins: [validationMixin],
  validations: {},
  data() {
    return {
      notifyConfig: [],
      formMsg: "",
      json: { data: [], setting: { maxWidth: 1024 }, header: { color: "" } },
      resData: {},
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
  props: ["formName"],
  computed: {
    componentList() {
      let newDataLiat = this.json.data;
      const vm = this;
      newDataLiat.forEach(function(element) {
        element.type = vm.getComponentNameByTypeName(element.type);
      });
      return newDataLiat;
    }
  },
  watch: {},
  methods: {
    submitCallback: function() {},
    changeView(viewName) {
      //not using
      this.view = viewName;
    },
    getComponentNameByTypeName(TypeName) {
      //read rule js to mapping right type name
      let lowCaseTypeName = TypeName.toLowerCase();
      return Object.keys(rules).find(key => {
        let lowCaseKey = key.toLowerCase();
        return rules[key].indexOf(lowCaseTypeName) >= 0;
      });
    },
    setResData(name, value) {
      //to set data from childrean component
      this.$set(this.resData, name, value);
    },
    cancelHandler() {
      // console.log(this.$refs, Object.keys(this.$refs), this.$refs["name"][0]);
      //DEV console
      Object.keys(this.$refs).forEach(key => {
        if (typeof this.$refs[key][0].resetData != "function") {
          // console.log('False',key,this.$refs[key][0].resetData);
          return;
        } else {
          //  console.log('OK',key,this.$refs[key][0].resetData);
          this.$refs[key][0].resetData();
        }
      });
    },
    submitHandler() {
      this.submitToTG();
      this.submitCallback();
    },
    setMsg(msg) {
      this.formMsg = msg;
    },
    async submitToTG() {
      const vm = this;

      await this.notifyConfig.forEach(config => {
        console.log(config);
        vm.mms.sendMMS({
          topic: config.Topic,
          DDN: config.DDN,
          func: config.func,
          payload: {
            //type:"photo" "audio" "document" content:"url"
            type:
              config.Payload.type === undefined
                ? "message"
                : config.Payload.type,
            content: JSON.stringify(vm.resData)
          }
        });
      });
      await this.setMsg("Form is submit");
      await this.cancelHandler();
    },
    initOfForm() {
      //init form view
      Axios.get(`/wei/FormData/${this.formName}.json`)
        .then(res => {
          this.json = res.data;
          this.setResData("FormName", this.json.name);
        })
        .catch(err => {
          console.log(err);
        });

      //init notifu conifg
      Axios.get(`/wei/FormConfig/${this.formName}NotifyConfig.json`)
        .then(res => {
          this.notifyConfig = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.initOfForm();
    //de but//
    // console.log(rules,this.getComponentNameByTypeName("text"))
    //de but//
    // this.json.data.forEach(item => {
    //   this.views.push(this.getComponentNameByTypeName(item.type));
    // });
    this.webmmsOptions.EiToken = getCookie("EiToken") || "";
    this.webmmsOptions.SToken = getCookie("SToken") || "";

    // create mms

    let tempEiToken = this.webmmsOptions.EiToken;
    let tempSToken = this.webmmsOptions.EiToken;
    let tempWsurl = config.webConfig.wsurl;

    // dev code
    // console.log({ tempWsurl, tempEiToken, tempSToken });
    //dev code

    this.mms = webmms({
      wsurl: tempWsurl,
      EiToken: tempEiToken,
      SToken: tempSToken
    });

    this.mms.on("registered", reply => {
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
  created() {},
  beforeCreate() {},
  components: {
    coustomHeader,
    jvTextField,
    jvTreeView,
    jvTextarea,
    jvSilder,
    jvCheckBox,
    jvDatePicker,
    jvTimePicker
  }
};
</script>
