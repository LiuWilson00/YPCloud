<template>
  <div class="userList">
    <v-card class="mx-auto" max-width="500">
      

      <v-container fluid>
        <v-row dense>
          <v-col v-for="user in userData" :key="user.id" >
            <v-card>
             

              <v-card-actions>
                <v-spacer></v-spacer>

                 <v-card-title>{{user.userName}}</v-card-title>
                <v-card-subtitle class="pb-0">{{user.userTel}}</v-card-subtitle>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "userList",
  computed: {
    userData() {
      return this.$store.state.userDatas;
    }
  },
  mounted() {
    this.$store.dispatch("INIT_USER_DATAS");
  }
};
</script>