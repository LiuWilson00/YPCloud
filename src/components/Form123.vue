<template>
  <div id="form">
    <v-container fluid>
      <form>
        <v-select
          v-model="ANNname"
          :error-messages="ANNnameErrors"
          :items="names"
          label=" ANN Name"
          required
          @input="$v.ANNname.$touch()"
          @blur="$v.ANNname.$touch()"
        ></v-select>
        <v-select
          v-model="calledName"
          :error-messages="calledNameErrors"
          :items="names"
          label=" Called Name"
          required
          @input="$v.calledName.$touch()"
          @blur="$v.calledName.$touch()"
        ></v-select>
        <v-select
          v-model="contactName"
          :error-messages="calledNameErrors"
          :items="names"
          label=" Contact Name"
          required
          @input="$v.calledName.$touch()"
          @blur="$v.calledName.$touch()"
        ></v-select>
        <v-text-field
          v-model="callerName"
          :error-messages="callerNameErrors"
          label="Caller Name"
          required
          @input="$v.callerName.$touch()"
          @blur="$v.callerName.$touch()"
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
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="event"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>

        <v-text-field
          v-model="tel"
          :error-messages="telErrors"
          label="Tel"
          required
          @input="$v.tel.$touch()"
          @blur="$v.tel.$touch()"
        ></v-text-field>
        <v-textarea v-model="lMsg" solo name="input-7-4" label="leave comments"></v-textarea>

        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-container>
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
  name: "Form123",
  mixins: [validationMixin],
  validations: {
    ANNname: { required },
    callerName: { required },
    calledName: { required },
    tel: { required },
    select: { required }
  },
  data(vm) {
    return {
      ANNname: "",
      calledName: "",
      callerName: "",
      contactName: "",
      menu: "",
      tel: "",
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
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
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

    telErrors() {
      const errors = [];
      if (!this.$v.tel.$dirty) return errors;

      !this.$v.tel.required && errors.push("tel is required");
      return errors;
    },
    userData() {
      return this.$store.state.userDatas;
    },
    maxIdOfFormDatas() {
      return this.$store.state.maxIdOfFormDatas;
    },
    names() {
      var listOfName = [];
      this.$store.state.userDatas.forEach(userData => {
        listOfName.push(userData.userName);
      });
      return listOfName;
    },

    computedDateFormatted() {
      return this.formatDate(this.date);
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
      Axios.post(`${config.webConfig.apiUrl}FormData`, {
        id: this.maxIdOfFormDatas + 1,
        time: this.date,
        ANNname: this.getUserIdByName(this.ANNname),
        callerTel: this.tel,
        msg: this.lMsg,
        callerName: this.callerName,
        calledUserId: this.getUserIdByName(this.calledName),
        contactUserId: this.getUserIdByName(this.contactName),
        resultId: 0,
        other: ""
      })
        .then(res => {
          console.table(res.data);
          alert("表單已送出");
        })
        .catch(error => {
          console.error(error);
        });

      this.submitToTG();
      this.clear();
      this.$store.dispatch("INIT_USER_DATAS");
      this.$store.dispatch("INIT_FORM_DATAS");
    },
    submitToTG() {
      (async (sANNName, sCalledName, sLMsg, sCallerName, sTel) => {
        await this.mms.sendMMS({
          topic: config.webConfig.tgTopic,
          DDN: config.webConfig.tgDDN,
          func: "",
          payload: {
            type: "message",
            content: `
            123客服電話表單,內容如下:
            ANN Name:${sANNName},
            Called Name:${sCalledName},
            Caller Name${sCallerName},
            Caller Tel:${sTel},
            Msg:${sLMsg}`
          }
        });
      })(this.ANNname, this.calledName, this.lMsg, this.callerName, this.tel);
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.ANNname = "";
      this.callerName = "";
      this.calledName = "";
      this.tel = "";
      this.lMsg = "";
    },
    getUserIdByName(name) {
      var id = [];
      this.userData.forEach(element => {
        if (element.userName == name) {
          id.push(element.id);
        }
      });
      return id[0];
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
    this.$store.dispatch("INIT_USER_DATAS");
    this.$store.dispatch("INIT_FORM_DATAS");

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
    });
  }
};
</script>
