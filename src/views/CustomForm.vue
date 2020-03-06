<template>
  <div class="CustomForm">
    <my-component :formName="formName"></my-component>
  </div>
</template>
<script>
import CustomForm from "../components/CustomForm";
import loading from "../components/loadComponent";
export default {
  name: "CustomFormView",
  props: ["formName"],
  components: {
    "my-component": () => ({
      component: new Promise((resolve, reject) => {
        resolve(CustomForm);
      }),
      loading: loading,
      delay: 200,
      timeout: 2000
    })
  }
};
</script>