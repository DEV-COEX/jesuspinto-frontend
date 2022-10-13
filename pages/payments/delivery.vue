<template>
  <div class="py-10 px-5 lg:px-28">
    <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-16">
      <DeliveryDataComponent />
      <PurchaseSummaryComponent
        :products="cartProducts"
        class="h-[31rem] overflow-y-scroll"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentDeliveryView',
  layout: 'SlimLayout',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
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
};
</script>
