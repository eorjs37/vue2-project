<template>
  <div class="container example">
    <h1>Example.vue</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    const { params } = this.$route;
    const { id } = params;
    console.log('id : ', id);
  },
};
</script>

<style>
.example {
  background-color: cadetblue;
}
</style>
