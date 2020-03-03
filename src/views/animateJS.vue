<template>
  <div class="animateJs">
   <WhereIsJuJue />
  </div>
</template>


<script>
import WhereIsJuJue from "../components/WhereIsJuJue";

export default {
  name: "animateJS",
  data() {
    return {
      load: false,
      compolate:false
    };
  },
  
  mounted() {},
  components:{
    WhereIsJuJue
  }
};
</script>