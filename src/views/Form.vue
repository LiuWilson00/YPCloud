<template>

      <div id="Form123">
        <Form123 /> 


      </div>
</template>

<script>
import Form123 from "../components/From123JustSubmit"
export default{
  methods: {
    hello(){
      this.$router.push({name: 'HelloWorld'})
    },
    about(){
      this.$router.push({name: 'About'})  
    },

    
  },
   components:{
      Form123
    }
}
</script>

<style scoped>
.home
{
  width: 400px;
  text-align: center;
  float: left;
  position: absolute;
  left: 50%;
  margin-left: -200px;
}
.home h3
{
  color:#603A2E;
}
.home h3:hover
{
  color:#F0A118;
}
</style>
