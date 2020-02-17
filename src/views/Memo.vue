<template>
  <div class="meme">
    <h1>Memo</h1>
    <PageMemo></PageMemo>
  </div>
</template>
<script>
import PageMemo from "../components/Memo";
export default {
  name: "memo",
  components: { PageMemo }
};
</script>