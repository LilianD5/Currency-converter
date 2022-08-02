<template>
  <option v-bind:value="acronym">{{ acronym }}</option>
</template>

<script>
export default {
  name: "AllCurrencies",
  props: ["acronym", "name"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
