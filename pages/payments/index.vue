<template>
  <div class="px-5 py-5 lg:px-28 lg:py-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-16">
      <div
        class="bg-white rounded-xl h-[31rem] w-full px-6 py-6 md:px-8 md:py-7 xl:px-16 xl:py-10 overflow-auto"
      >
        <section class="mb-2 sm:mb-3 md:mb-4 lg:mb-5">
          <h1 class="text-xl font-bold border-gray-400 border-b-[1px]">
            Tus productos
          </h1>
        </section>
        <div
          class="bg-white grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10 h-full"
        >
          <PaymentProductsComponent
            v-for="product in cartProducts"
            :key="product.id"
            :product="product"
            @removeProduct="removeProduct"
          />
        </div>
      </div>
      <PurchaseSummaryComponent
        :products="cartProducts"
        class="h-[31rem]"
        :show="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentView',
  layout: 'SlimLayout',
  middleware({store, redirect}) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
    if (store.state.cartProducts.length === 0) {
      redirect('/products');
    }
  },
  computed: {
    cartProducts() {
      return this.$store.state.cartProducts;
    },
  },
  beforeCreate() {
    this.$store.dispatch('fetchCartProducts', this.$auth.user.id);
  },
  methods: {
    async validate() {
      if (this.$store.state.cartProducts.length === 0) {
        await this.$router.push('/products');
      }
    },
    async removeProduct(product) {
      await this.$axios
        .$delete(
          'api/v1/cart/items/' +
          this.$auth.user.person.id +
          '/product/' +
          product.id
        )
        .then(() => {
          this.$store.dispatch('fetchCartProducts', this.$auth.user.id);
          this.$store.dispatch('cart/getTotal', {
            person_id: this.$auth.user.person_id,
          });
          this.$store.dispatch('cart/getSubtotal', this.$auth.user.person.id);
          this.$store.dispatch('cart/getDiscount', this.$auth.user.id);
        });
    },
  },
};
</script>
