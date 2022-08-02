<template>
  <li class="list-unstyled col-12 col-sm-6 col-xl-4 col-xxl-3"><p class="d-flex justify-content-end my-1"><span class="text-start col-5 text-uppercase fw-bold">{{ name }} :</span><span class="text-start col-5">{{ Math.round((1/value)*10000)/10000 }}</span></p></li>
</template>

<script>
export default {
  name: "CurrenciesValueOneFor",
  props: ["name", "value"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
