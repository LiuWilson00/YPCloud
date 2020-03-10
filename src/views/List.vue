<template>
  <div class="List">
    <ListComponent />
  </div>
</template>
<script>
import ListComponent from "../components/ListComponent";
import parse from "url-parse"
export default {
  name: "list",
  props: ["formName"],
  components: {
    ListComponent
  },
  mounted(){
    var url= document.location.href
    var parseUrl=parse(url,true)
    console.log(url,parseUrl)
  }
};
</script>