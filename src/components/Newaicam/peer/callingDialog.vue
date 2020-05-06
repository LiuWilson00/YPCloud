<template>
  <v-dialog v-model="callingDialog" max-width="290">
    <v-card class="peerDialog" z-index="30">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="callPercentage"
        color="blue-grey"
      >{{ callSec }}</v-progress-circular>
    </v-card>
  </v-dialog>
</template>



<script>
export default {
  name: "calling-dialog",
  props: ["callSec", "callingDialog", "callPercentage"]
};
</script>