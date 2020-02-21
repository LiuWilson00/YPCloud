<template>
  <div id="CustomForm">
    
  </div>
</template>


<style lang="scss" scoped>
</style>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import webmms from "webmms-client";
import { set as setCookie, get as getCookie } from "es-cookie";
import Axios from "axios";
import config from "../config";
export default {
  name: "TelForm",
  mixins: [validationMixin],
  validations: {
    ANNname: { required },
    callerName: { required },
    calledName: { required },
    res: { required },
    date: { required }
  },
  data(vm) {
    return {
      ANNname: "",
      calledName: "",
      callerName: "",
      contactName: "",
      menu: "",
      res: "",
      lMsg: "",
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
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10))
    };
  },
  computed: {
    dataValidation() {
      for (let i in this.$v) {
        if (i.indexOf("$") < 0) {
          if (this.$v[i].$invalid == true) return true;
        }
      }
      return false;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Time is required");
      return errors;
    },

    ANNnameErrors() {
      const errors = [];
      if (!this.$v.ANNname.$dirty) return errors;

      !this.$v.ANNname.required && errors.push("Name is required.");
      return errors;
    },
    calledNameErrors() {
      const errors = [];
      if (!this.$v.calledName.$dirty) return errors;

      !this.$v.calledName.required && errors.push("Called name is required.");
      return errors;
    },
    callerNameErrors() {
      const errors = [];
      if (!this.$v.callerName.$dirty) return errors;

      !this.$v.callerName.required && errors.push("Caller name is required.");
      return errors;
    },

    resErrors() {
      const errors = [];
      if (!this.$v.res.$dirty) return errors;

      !this.$v.res.required && errors.push("res is required");
      return errors;
    },
    userData() {
      return this.$store.state.userDatas;
    },
    maxIdOfFormDatas() {
      return this.$store.state.maxIdOfFormDatas;
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (!this.dataValidation) {
        this.submitToTG();
        this.clear();
      }

      //
    },
    submitToTG() {
      (async (
        sANNName,
        sDate,
        sCalledName,
        sCallerName,
        sContactName,
        sLMsg,
        sRes
      ) => {
        await this.mms
          .sendMMS({
            topic: config.webConfig.tgTopic,
            DDN: config.webConfig.tgDDN,
            func: "",
            payload: {
              type: "message",
              content: `
            123 Customer Service:
             ANN:${sANNName},
             Time:${sDate},
             Caller No (A):${sCallerName},
             Called No (B):${sCalledName},
             Contact (C):${sContactName},
             Question (Q):${sLMsg},
             Result (R):${sRes}
            `
            }
          })
          .then(function(res) {
            console.log(res[0].IN.State.ErrCode);
            if (res[0].IN.State.ErrCode != 0) {
              console.log(res[0].IN.State.ErrMsg);
              alert(`Error ${res[0].IN.State.ErrMsg}`);
            }
          });
      })(
        this.ANNname,
        this.date,
        this.calledName,
        this.callerName,
        this.contactName,
        this.lMsg,
        this.res
      );
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.ANNname = "";
      this.contactName = "";
      this.callerName = "";
      this.calledName = "";
      this.res = "";
      this.lMsg = "";
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  mounted() {
    this.webmmsOptions.EiToken = getCookie("EiToken") || "";
    this.webmmsOptions.SToken = getCookie("SToken") || "";

    let tempEiToken = this.webmmsOptions.EiToken;
    let tempSToken = this.webmmsOptions.EiToken;
    let tempWsurl = config.webConfig.wsurl;
    console.log({ tempWsurl, tempEiToken, tempSToken });
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
  }
};
</script>
