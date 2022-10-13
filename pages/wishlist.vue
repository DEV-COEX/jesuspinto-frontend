<template>
  <div
    class="flex flex-col h-full w-full sm:pt-15 pt-10 sm:pl-20 pl-5 sm:pr-20 py-10 pr-5 items-center"
  >
    <section class="flex flex-col w-full">
      <h1 class="text-xl font-semibold mb-4">Lista de deseos</h1>
      <hr class="border bg-gray-400 border-gray-400 rounded-full" />
    </section>
    <div
      class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ProductCardComponent
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishListView',
  layout: 'SlimLayout',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
    if (store.state.likedProducts.length === 0) {
      redirect('/products');
    }
  },
  computed: {
    products() {
      return this.$store.state.likedProducts;
    },
    user() {
      return this.$auth.user;
    },
  },
  beforeMount() {
    this.$store.dispatch('fetchLikedProducts', this.user.id);
  },
};
</script>

<style scoped></style>
