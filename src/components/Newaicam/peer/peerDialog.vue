<template>
  <v-dialog v-model="peerDialog" max-width="290">
    <v-card class="peerDialog" z-index="30">
      <v-card-title class="headline animated infinite tada">{{remotePerrID}}</v-card-title>

      <v-card-text>Hello! {{peerID}}, you have a call...</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="peerDialogClosed(false)">Disagree</v-btn>

        <v-btn color="green darken-1" text @click="peerDialogClosed(true)">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "peer-dialog",
  props: ["peerDialog", "remotePerrID", "peerID"],
  methods: {
    peerDialogClosed(ans) {
      this.$emit("peerDialogClosed", ans);
    }
  }
};
</script>