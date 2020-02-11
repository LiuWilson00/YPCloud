<template>
  <div id="form">
    <v-container fluid>
      <form>
        <v-select
          v-model="ANNname"
          :error-messages="nameErrors"
          :items="names"
          label=" ANN Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-select>
        <v-select
          v-model="calledName"
          :error-messages="calledNameErrors"
          :items="names"
          label=" Called Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-select>
        <v-text-field
          v-model="callerName"
          :error-messages="callerNameErrors"
          label="Caller Name"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
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
          :error-messages="emailErrors"
          label="Tel"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
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
import Axios from "axios";
import config from "../config";
export default {
  name: "Form123",
  mixins: [validationMixin],
  validations: {
    ANNname: { required },
    callerName: { required },
    calledName: { required },
    tel: { required, email },
    select: { required }
  },
  data(vm) {
    return {
      ANNname: "",
      calledName: "",
      callerName: "",

      tel: "",
      lMsg: "",

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
    nameErrors() {
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

    emailErrors() {
      const errors = [];
      if (!this.$v.tel.$dirty) return errors;

      !this.$v.tel.required && errors.push("E-mail is required");
      return errors;
    },
    userData() {
      return this.$store.state.userDatas;
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
      Axios.post(`${config.webConfig.apiUrl}/FormData`, {
        id: 2,
        time: this.date,
        userId: 1,
        msg: this.lMsg,
        callerName: this.callerName,
        calledUserId: 3,
        contactUserId: 4,
        resultId: 0
      })
        .then(res => {
          console.table(res.data);
        })
        .catch(error => {
          console.error(error);
        });
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
  }
};
</script>
