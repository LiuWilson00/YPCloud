<template>
  <div class="List">
    
    <ListComponent />
  </div>
</template>
<script>
import ListComponent from "../components/ListComponent";
export default {
  name: "list",
  props: ["formName"],
  components: {
    ListComponent
  }
};
</script>