<template>
  <div class="List">
    <ListComponent :headers="header" :data="listData" />
  </div>
</template>
<script>
import ListComponent from "../components/ListComponent";
import parse from "url-parse";
import axios from "axios";
import test from "../import";

export default {
  name: "list",
  data() {
    return {
      cors: "https://cors-anywhere.herokuapp.com/",
      header: [],
      listData: []
    };
  },

  props: ["formName"],
  components: {
    ListComponent
  },
  methods: {
    getQuery() {
      var url = document.location.href;
      var parseUrl = parse(url, true);
      var { query } = parseUrl;

      if (query.url != undefined && query.url != "") {
        this.getJsonFromUrl(query.url);
        return;
      } else if (query.json != undefined && query.json != "") {
        this.getJsonFromParams(JSON.parse(query.json));
      } else {
        this.getJsonDefaul();
      }
    },
    getUrl(url) {
      var localUrl = document.location.href;
      var parseUrl = parse(localUrl, true);
      return parseUrl.origin == "https://git.page" ? url : this.cors + url;
    },
    getJsonFromUrl: async function(url) {
      var json = {};

      await axios.get(this.getUrl(url)).then(res => {
        json = res.data;
      });
      this.header = await this.axiosGetter(json.headerUrl);
      this.listData = await this.axiosGetter(json.dataUrl);
    },
    getJsonFromParams: async function(json) {
      switch (json.type) {
        case "cloud": {
          this.header = await this.axiosGetter(json.headerUrl);
          this.listData = await this.axiosGetter(json.dataUrl);
          break;
        }

        case "object": {
          this.header = json.header;
          this.listData = json.listData;
          break;
        }

        default: {
          this.getJsonDefaul();
          break;
        }
      }
    },
    axiosGetter: async function(url) {
      let data = null;

      await axios.get(this.getUrl(url)).then(res => {
        data = res.data;
      });

      return data;
    },
    getJsonDefaul: async function() {
      const vm = this;
      await axios.get("/wei/ListHeaders/PageHeader2.json").then(res => {
        vm.header = res.data;
      });
      await axios.get("/wei/ListDataSet/PageData.json").then(res => {
        vm.listData = res.data;
      });
      await console.log(vm.header, vm.listData);
    }
  },
  async mounted() {
    const vm = this;

    // await console.log(
    //   this.getUrl("https://git.page/wei/ListJson/weiPage.json"),
    //   parse(document.location.href, true)
    // );
    test();
    await this.getQuery();
  }
};
</script>