<template>
  <div class="CustomForm">
    
    <CustomForm :formName="formName"></CustomForm>
  </div>
</template>
<script>
import CustomForm from "../components/CustomForm";
export default {
  name: "tel",
  props:['formName'],
  components: {
    CustomForm
  }
};
</script>