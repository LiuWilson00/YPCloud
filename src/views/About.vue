<template>
  <div class="about">
    <h1>Hello Wilson! Here is the about page!</h1><p></p>
    <label class="switch" >
      <input type="checkbox" @click="toggle">
      <span class="slider round"></span>
    </label><p></p>
    <p v-if="ifelse" class="blue_color">ABOUT PAGE</p>
    <p v-else class="org_color">ABOUT PAGE</p>
  </div>
</template>

<script>
export default{
  data() {
    return{
      ifelse: false
    }
  },
  methods: {
    toggle: function() {
      this.ifelse = !this.ifelse;
    }
  }
}
</script>


<style scoped>
.about
{
  width: 400px;
  text-align: center;
  float: left;
  position: absolute;
  left: 50%;
  margin-left: -200px;
}
.org_color{
  text-decoration: underline;
  -webkit-text-decoration-color: rgb(245, 184, 123);
  text-decoration-color: rgb(245, 184, 123);
 }
.blue_color{
  text-decoration: underline;
  -webkit-text-decoration-color: #2196F3;
  text-decoration-color: #2196F3;
 }
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #FFCC99;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #FFFFCC	;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #99CCFF;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
</style>
