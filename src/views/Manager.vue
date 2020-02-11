<template>
  <div id="Manager">
    <UserList />
    <Form123List />
  </div>
</template>

<script>
import UserList from "../components/UserList";
import Form123List from "../components/Form123List";
export default {
  name: "Manager",
  components: {
    UserList,
    Form123List
  }
};
</script>