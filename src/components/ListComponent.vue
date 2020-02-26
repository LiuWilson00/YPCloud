<template>
  <v-data-table :headers="headers" :items="data" :items-per-page="5" class="elevation-1">
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
    </template>
    <template v-slot:item.url="{ item }">
      <a :href="item.url">{{ item.url }}</a>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      headers: [],
      data: []
    };
  },
  mounted() {
    axios
      .get("/wei/ListData/PageData.json")
      .then(res => {
        this.data = res.data;
      })
      .catch(err => {
        console(err);
      });

    axios
      .get("/wei/ListHeaders/PageHeader.json")
      .then(res => {
        this.headers = res.data;
      })
      .catch(err => {
        console(err);
      });
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