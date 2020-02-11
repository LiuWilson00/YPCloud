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
                <v-btn color="primary" depressed>
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
    }
  },

  mounted() {
    this.$store.dispatch("INIT_FORM_DATAS");
  }
};
</script>