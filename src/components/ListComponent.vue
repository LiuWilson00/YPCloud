<template>
  <v-data-table
    hide-default-footer
    hide-default-header
    :headers="headers"
    :items="data"
    :items-per-page="999"
    class="elevation-1"
  >
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:item.name="{ item }">
      <a
        :href="item.url"
        style="    margin: 0 auto;
    width: 200px;
    display: block;"
      >{{ item.name }}</a>
    </template>
  </v-data-table>
</template>
<style scoped>
tr td {
  border-bottom: none !important;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // headers:[],data:[]
    };
  },
  props: ["headers", "data"],

  mounted() {
    // axios
    //   .get("/wei/ListDataSet/PageData.json")
    //   .then(res => {
    //     this.data = res.data;
    //   })
    //   .catch(err => {
    //     console(err);
    //   });
    // axios
    //   .get("/wei/ListHeaders/PageHeader2.json")
    //   .then(res => {
    //     this.headers = res.data;
    //   })
    //   .catch(err => {
    //     console(err);
    //   });
  },
  methods: {
    getColor(status) {
      if (status == "complete") return "green";
      else if (status == "Develop") return "blue";
      else return "orange";
    }
  }
};
</script>