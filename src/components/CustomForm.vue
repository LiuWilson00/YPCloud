<template>
  <div id="CustomForm">
    <v-card class="mx-auto" :max-width="this.json.setting.maxWidth" outlined>
      <coustomHeader :formName="json.name" :formColor="json.header.color"></coustomHeader>
      <component
        v-for="component in componentList"
        :key="component.name"
        :is="component.type"
        :jsonData="component"
        @setResData="setResData"
      ></component>
    </v-card>
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
import rules from "./FormComponents/rules";
import jsonData from '../form';



import coustomHeader from "./FormComponents/CustomHeader";
import vTextField from "./FormComponents/vTextField";
import vTreeView from "./FormComponents/vTreeView";

export default {
  name: "CustomForm",
  mixins: [validationMixin],
  validations: {},
  data() {
    return {
      com: "",
      views: [],
    
      json:jsonData,
      resData: {}
    };
  },
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
    changeView(viewName) {
      this.view = viewName;
    },
    creatVuetifyComponentTemplate(jsonDataItem) {
      return `<v-${jsonDataItem.type} label=${jsonDataItem.name}>`;
    },
    getComponentNameByTypeName(TypeName) {
      let lowCaseTypeName = TypeName.toLowerCase();
      return Object.keys(rules).find(key => {
        let lowCaseKey = key.toLowerCase();
        return rules[key].indexOf(lowCaseTypeName) >= 0;
      });
    },
    setResData(name,value) {
      console.log(name,value)
      this.$set(this.resData, name, value);
    }
  },
  mounted() {
    this.com = this.creatVuetifyComponentTemplate(this.json.data[0]);
    // console.log(rules,this.getComponentNameByTypeName("text"))
    this.json.data.forEach(item => {
      this.views.push(this.getComponentNameByTypeName(item.type));
    });
    console.log(jsonData)
  },
  components: {
    coustomHeader,
    vTextField,
    vTreeView
  }
};
</script>
