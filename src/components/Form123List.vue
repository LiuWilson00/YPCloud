<template>
  <div id="Form123List">
    <v-card class="mx-auto" max-width="1024">
      <v-container fluid>
        <v-row dense>
          <v-col cols="6" v-for="data in formDatas" :key="data.id">
            <v-card>
              <v-spacer></v-spacer>

              <v-card-title>{{data.callerName}}</v-card-title>
              <v-card-subtitle class="pb-0">{{data.callerTel}}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary" depressed @click="deleteBtnHandle(data.id)">
                  <v-icon left>{{ icons.mdiDelete }}</v-icon>Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mdiAccount, mdiPencil, mdiShareVariant, mdiDelete } from "@mdi/js";
import config from "../config";
import axios from "axios";
export default {
  name: "Form123List",
  data() {
    return {
      icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete
      }
    };
  },
  computed: {
    maxIdOfFormDatas() {
      return this.$store.state.maxIdOfFormDatas;
    },
    formDatas() {
      return this.$store.state.formDatas;
    },
    userData() {
      return this.$store.state.userDatas;
      
    }
  },
  methods: {
    deleteBtnHandle(target) {
      console.log(target, `${config.webConfig.apiUrl}FormData`);
      axios
        .delete(`${config.webConfig.apiUrl}FormData/${target}`)
        .then(function(response) {
          alert("刪除成功");
        })
        .catch(function(response) {
          console.log(response);
        });
      this.updateStore();
    },
    updateStore() {
      this.$store.dispatch("INIT_FORM_DATAS");
      this.$forceUpdate();
    }
  },
  mounted() {
    // this.$store.getters.getUserNameById(1)
    this.$store.dispatch("INIT_FORM_DATAS");
    this.$store.dispatch("INIT_USER_DATAS");
  }
};
</script>