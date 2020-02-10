<template>
  <div class="mote">
    <div class="location"><Loca /></div>
  </div>
</template>

<script>
import Loca from '../components/Location'
export default{
  components: {
      Loca
    }
}
</script>

<style scoped>
.location
{
  width: 400px;
  text-align: center;
  float: left;
  position: absolute;
  left: 50%;
  margin-left: -200px;
}
</style>
