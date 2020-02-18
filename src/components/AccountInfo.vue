<template>
  <div id="accountInfo">
    <v-card class="mx-auto" color="#26c6da" dark :class="'d-flex justify-end mb-1'">
      <v-col cols="7" class="flex-grow-0 flex-shrink-0">
        <p class="regMsg mb-1" v-if="!isRegistered">MMS is not Registered...</p>
        <p class="mb-1">{{MMSMsg}}</p>
      </v-col>
      <v-card-actions cols="5">
        <v-list-item class="grow flex-grow-1 flex-shrink-0">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{LoginData}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
p.regMsg {
  color: #c9c9c9;
}
</style>

<script>
export default {
  name: "AccountInfo",
  props: ["LoginData", "MMSMsg", "isRegistered"]
};
</script>