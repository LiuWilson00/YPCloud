<template>
  <div id="pagememo">
    <AccountInfo :MMSMsg="MMSMsg" :isRegistered="MMSRegistered" LoginData="Wilson Liu"></AccountInfo>
    <v-container fluid>
      <form>
        <v-text-field
          v-model="ANNname"
          :error-messages="ANNnameErrors"
          label="(ANN)"
          disabled
          required
          @input="$v.ANNname.$touch()"
          @blur="$v.ANNname.$touch()"
        ></v-text-field>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label=" Time"
              hint="MM/DD/YYYY format"
              disabled
              persistent-hint
              prepend-icon="event"
              :error-messages="dateErrors"
              required
              @input="$v.date.$touch()"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        <v-text-field
          v-model="callerName"
          :error-messages="callerNameErrors"
          label=" Caller No (A)"
          
          @input="$v.callerName.$touch()"
          @blur="$v.callerName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="calledName"
          :error-messages="calledNameErrors"
          label=" Called No (B)"
          
          @input="$v.calledName.$touch()"
          @blur="$v.calledName.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="contactName"
          :error-messages="calledNameErrors"
          label=" Contact (C)"
          
          @input="$v.calledName.$touch()"
          @blur="$v.calledName.$touch()"
        ></v-text-field>
        <v-textarea v-model="lMsg" solo name="input-7-4" label="Question (Q)"></v-textarea>
        <v-text-field
          v-model="res"
          :error-messages="resErrors"
          label="Result (R)"
          
          @input="$v.res.$touch()"
          @blur="$v.res.$touch()"
        ></v-text-field>
        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-container>
  </div>
</template>


<style lang="scss" scoped>
</style>

<script>
import AccountInfo from "./AccountInfo";

import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import webmms from "webmms-client";
import { set as setCookie, get as getCookie } from "es-cookie";
import Axios from "axios";
import config from "../config";
export default {
  name: "Memo",
  mixins: [validationMixin],
  validations: {
    ANNname: { required },
    // callerName: { required },
    // calledName: { required },
    // res: { required },
    date: { required }
  },
  data(vm) {
    return {
      MMSMsg: "", // Return MMS Err Msg to AccountInfo component
      MMSRegistered: false,

      ANNname: "Wilson Liu",
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
      date: new Date().toString().substr(0, 25),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10))
    };
  },
  computed: {
    // 2020 02 17 Steven: not need validation

    // dataValidation() {
    //   for (let i in this.$v) {
    //     if (i.indexOf("$") < 0) {
    //       if (this.$v[i].$invalid == true) return true;
    //     }
    //   }
    //   return false;
    // },
    // dateErrors() {
    //   const errors = [];
    //   if (!this.$v.date.$dirty) return errors;
    //   !this.$v.date.required && errors.push("Time is required");
    //   return errors;
    // },

    // ANNnameErrors() {
    //   const errors = [];
    //   if (!this.$v.ANNname.$dirty) return errors;

    //   !this.$v.ANNname.required && errors.push("Name is required.");
    //   return errors;
    // },
    // calledNameErrors() {
    //   const errors = [];
    //   if (!this.$v.calledName.$dirty) return errors;

    //   !this.$v.calledName.required && errors.push("Called name is required.");
    //   return errors;
    // },
    // callerNameErrors() {
    //   const errors = [];
    //   if (!this.$v.callerName.$dirty) return errors;

    //   !this.$v.callerName.required && errors.push("Caller name is required.");
    //   return errors;
    // },

    // resErrors() {
    //   const errors = [];
    //   if (!this.$v.res.$dirty) return errors;

    //   !this.$v.res.required && errors.push("res is required");
    //   return errors;
    // },

    // validation end
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
        var msg = await this.mms
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
            if (typeof res == "object") {
              if (res.ErrCode != 0) {
                return `Error: ${res.ErrMsg}`;
              }
            } else {
              if (res[0].IN.State.ErrCode != 0) {
                return `Error: ${res[0].IN.State.ErrMsg}`;
              }
            }
          });

        this.MMSMsg = msg;
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

    // create mms

    let tempEiToken = this.webmmsOptions.EiToken;
    let tempSToken = this.webmmsOptions.EiToken;
    let tempWsurl = config.webConfig.wsurl;

    // dev code
    console.log({ tempWsurl, tempEiToken, tempSToken });
    //dev code

    this.mms = webmms({
      wsurl: tempWsurl,
      EiToken: tempEiToken,
      SToken: tempSToken
    });
    this.mms.on("registered", reply => {
      //dev
      console.log(reply);
      //dev

      this.MMSRegistered = true;
      let {
        result: { DDN, EiToken, SToken }
      } = reply;
      let id = 0;
      // document.getElementById('DDN').innerText = `DDN: ${DDN}`
      setCookie("EiToken", EiToken, { expires: 7, path: "" });
      setCookie("SToken", SToken, { expires: 7, path: "" });
    });
  },
  components: {
    AccountInfo
  }
};
</script>
