<template>
  <carousel
    :pagination-enabled="paginationEnabled"
    :navigation-enabled="false"
    :autoplay="autoPlay"
    :autoplay-hover-pause="autoPlay"
    :per-page="perPage"
    :per-page-custom="perPageCustom"
  >
    <slide v-for="product in data" :key="product.id">
      <ProductCardComponent :product="product" />
    </slide>
  </carousel>
</template>

<script>
export default {
  name: 'CarouselComponent',
  props: {
    perPage: {
      type: Number,
      default: 1,
    },
    perPageCustom: {
      type: Array,
      default: () => [],
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    navigationEnabled: {
      type: Boolean,
      default: true,
    },
    paginationEnabled: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
