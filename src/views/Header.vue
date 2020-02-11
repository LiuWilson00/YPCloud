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
        <v-list-item-group  active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="(item) in itemList" :key="item.routeName">
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
    
      itemList: [
        { routeName: "Create Form", routeLink: "/form" },
        { routeName: "Maneger", routeLink: "/manager" },
        { routeName: "Tel", routeLink: "/tel" },
        { routeName: "Memo", routeLink: "/memo" }

      ]
    };
  },
  computed: {
  
  },
  methods: {
    group() {
      this.drawer = false;
    }
  },
  mounted() {

  }
};
</script>