<template>
  <div class="bg-gray-200 rounded-xl w-full h-52">
    <div class="flex flex-col h-full justify-center p-10">
      <h4 class="uppercase">{{ product.name }}</h4>
      <span> Desde {{ price }} </span>
      <button
        class="bg-blue-500 rounded-xl hover:bg-blue-600 ease-in-out duration-200 px-3 py-2 max-w-max text-white font-bold my-3"
      >
        <nuxt-link :to="'/products/' + product.uuid">Ver mas</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedProductComponent',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(this.product.price);
    },
  },
};
</script>

<style scoped></style>
