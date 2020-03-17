<template>
  <div class="qapp">
    <HeaderBar />
  </div>
</template>

<script>
// @ is an alias to /src

import HeaderBar from "@/components/HeaderBar/HeaderBarComponents.vue";
export default {
  name: "qapp",
  components: {
    HeaderBar
  }
};
</script>
