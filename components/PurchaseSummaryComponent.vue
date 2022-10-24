<template>
  <div
    class="flex flex-col bg-white rounded-xl px-6 py-6 md:px-8 md:py-7 xl:px-16 xl:py-10"
  >
    <div>
      <h2 class="font-bold text-xl py-2">Resumen de compra</h2>
      <hr class="bg-gray-400 border-gray-400 rounded-full" />
    </div>
    <div
      v-if="
        (products.length > 0 && route === '/payments/delivery') ||
        (products.length > 0 && route === '/payments/order-info')
      "
    >
      <carousel :per-page="4">
        <slide v-for="product in products" :key="product.id" class="p-2">
          <div class="bg-gray-400 rounded-lg">
            <img
              class="p-5 rounded-lg w-32 h-32"
              :src="product.images[0].path"
              :alt="product.images[0].path"
            />
          </div>
        </slide>
      </carousel>
    </div>
    <div class="mt-5 mb-5">
      <h3>Codigo de descuento</h3>
      <div class="flex justify-between items-center">
        <input
          v-model="discountCode"
          type="text"
          placeholder="Codigo descuento"
          class="border-2 w-44 xl:w-1/2 border-gray-300 rounded-xl focus:outline-none pl-2"
        />
        <button-component title="Aplicar" @click="onDiscount"></button-component>
        <button
          class="xl:w-1/5 ease-in-out duration-200 w-auto focus:outline-none border-2 border-blue-300 bg-opacity-25 text-blue-700 bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5"
          @click="onDiscount"
        >
          Aplicar
        </button>
      </div>
    </div>
    <div class="flex justify-between">
      <label for="shipping" class="font-medium">Envio</label>
      <span id="shipping" class="font-medium text-blue-700">{{ 0 }}</span>
    </div>
    <div class="flex justify-between">
      <label for="discount" class="font-medium">Descuento</label>
      <span id="discount" class="font-medium text-blue-700"
        >% {{ discount }}</span
      >
    </div>
    <div class="flex justify-between">
      <label for="subtotal" class="font-medium">Subtotal</label>
      <span
        id="subtotal"
        :class="isLoading === true ? 'animate-pulse text-gray-600' : ''"
        class="font-medium text-blue-700"
        >{{ formatMoney(subtotal) }}</span
      >
    </div>
    <hr class="bg-gray-400 border-gray-400 rounded-full mt-5" />
    <div class="flex justify-between font-bold text-2xl mt-5 mb-5">
      <label for="total">Total</label>
      <span
        id="total"
        :class="isLoading === true ? 'animate-pulse text-gray-600' : ''"
        class="text-blue-700"
        >{{ formatMoney(total) }}</span
      >
    </div>
    <div class="flex items-center w-full">
      <nuxt-link
        v-if="route === '/payments/' || route === '/payments'"
        to="/payments/delivery"
        class="w-full focus:outline-none text-white bg-blue-700 ease-in-out duration-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2 text-center"
      >
        Datos de entrega
      </nuxt-link>
      <template v-if="xd && route === '/payments/delivery'">
        <nuxt-link
          v-if="route === '/payments/delivery'"
          to="/payments/order-info"
          type="submit"
          class="w-full focus:outline-none text-white bg-blue-700 ease-in-out duration-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2 text-center"
        >
          Ir a Pagar
        </nuxt-link>
      </template>
      <template v-else-if="xd === false && route === '/payments/delivery'">
        <span
          class="w-full bg-blue-600 text-white font-bold text-center rounded-lg py-4"
        >
          Seleccione una direccion para poder continuar
        </span>
      </template>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { SANDBOX_PUBLIC_API_KEY } from '@/plugins/BASE_CONFIG';

export default {
  name: 'PurchaseSummaryComponent',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showCards: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: null,
    },
    addresselected: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    wompi: {},
    purchase: {},
  }),
  computed: {
    route() {
      return this.$route.path;
    },
    discount() {
      return this.$store.state.cart.discount;
    },
    shipping() {
      return this.$store.state.cart.shipping;
    },
    subtotal() {
      return this.$store.state.cart.subtotal;
    },
    total() {
      return this.$store.state.cart.total;
    },
    tax() {
      return this.$store.state.cart.tax;
    },
    isLoading() {
      return this.$store.state.cart.isLoading;
    },
    currentAddress() {
      return this.$store.state.cart.currentAddress;
    },
    xd() {
      return this.$store.state.cart.selectedAddress;
    },
    discountCode: {
      get() {
        return this.$store.state.cart.discountCode;
      },
      set(value) {
        this.$store.commit('cart/setDiscountCode', value);
      },
    },
  },
  mounted() {
    this.$axios
      .get(`https://sandbox.wompi.co/v1/merchants/${SANDBOX_PUBLIC_API_KEY}`)
      .then((response) => {
        this.wompi = response.data.data;
      });
    if (this.discount > 0) {
      this.$store.dispatch('cart/getTotal', {
        person_id: this.$auth.user.person_id,
        code: this.discountCode,
      });
    } else {
      this.$store.dispatch('cart/getTotal', {
        person_id: this.$auth.user.person_id,
      });
    }
    this.$store.dispatch('cart/getSubtotal', this.$auth.user.person_id);
  },
  methods: {
    formatMoney(cash) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(cash);
    },
    onDiscount() {
      this.$store.dispatch('cart/getDiscount', this.discountCode);
      this.$store.dispatch('cart/getTotal', {
        person_id: this.$auth.user.person.id,
        code: this.discountCode,
      });
    },
    clean() {
      this.$store.commit('cart/setDiscountCode', '');
      this.$store.commit('cart/setDiscount', 0);
      this.$store.commit('cart/setSubtotal', 0);
      this.$store.commit('cart/setTotal', 0);
      this.$store.commit('cart/setTax', 0);
      this.$store.commit('cart/setCurrentAddress', null);
      this.$store.commit('cart/setShipping', 0);
    },
  },
};
</script>

<style scoped></style>
