<template>
  <div id="form">
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dense collapse>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{modName}}</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
      <slot></slot>
    </v-card>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="(item) in itemList" :key="item">
            <router-link :to="item.routeLink">{{item.routeName}}</router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Headers",
  data() {
    return {
      modName: "Form123",
      drawer: null,
      group: false,
      itemList: [
        { routeName: "Create Form", routeLink: "/form123" },
        { routeName: "Maneger", routeLink: "/manager" }
      ]
    };
  },
  computed: {
    userData() {
      return this.$store.state.userDatas;
    }
  },
  methods: {
    group() {
      this.drawer = false;
    }
  },
  mounted() {
    this.$store.dispatch("INIT_USER_DATAS");
  }
};
</script>