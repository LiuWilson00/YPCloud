<template>
  <div class="List">
    <h1>Hello it is List View</h1>
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