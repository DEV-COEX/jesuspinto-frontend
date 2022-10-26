<template>
  <div class="relative bg-gray-200 rounded-t-2xl h-36 rounded w-full">
    <div class="h-5/6">
      <nuxt-link class="h-full" :to="'/products/' + product.uuid">
        <img
          v-if="product.images.length > 0"
          class="object-cover h-full block mx-auto py-2"
          :src="product.images[0].path"
          :alt="product.images[0].path"
        />
      </nuxt-link>
    </div>
    <div class="flex justify-center items-center w-full py-2 bg-gray-200">
      <form class="flex" @submit.prevent>
        <button
          class="flex justify-center items-center text-center rounded-lg border border-gray-500 w-5 h-5 p"
          type="button"
          @click="subtract"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
            />
          </svg>
        </button>
        <input
          v-model="getCurrentQuantity"
          type="number"
          class="w-10 h-4 text-center text-xs mx-3 rounded-lg text-black"
          min="1"
          :max="product.quantity"
          oninput="this.value = Math.abs(this.value)"
          required
          @keyup.enter="updateValuesKey"
          @keydown.enter="updateValuesKey"
        />
        <button
          class="flex justify-center items-center w-5 rounded-lg h-5 border border-gray-500"
          type="button"
          @click="add()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
      </form>
    </div>
    <div
      class="bg-red-100 w-5 h-5 absolute top-2 right-2 text-red-600 rounded hover:bg-red-600 hover:text-white duration-200 ease-in-out"
    >
      <button type="button" @click="removeProduct">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
    <div
      class="w-full flex flex-col items-start justify-center h-16 bg-blue-50 hover:bg-[#9B9E0B] hover:text-white ease-in-out duration-300 absolute left-0 rounded-b-2xl p-2"
    >
      <p class="text-xs uppercase font-semibold">
        {{ product.name }}
      </p>
      <p class="text-xs font-semibold">
        {{ price }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentProductsComponent',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getCurrentQuantity: {
      get() {
        if (this.product.currentQuantity > this.product.quantity) {
          return this.product.quantity;
        } else {
          return this.product.currentQuantity;
        }
      },
      set(value) {
        this.$store.commit('setProperty', {
          currentQuantity: value,
          id: this.product.id,
        });
      },
    },
    cartProducts() {
      return this.$store.state.cartProducts;
    },
    cart() {
      return this.$store.state.cart;
    },
    price() {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(this.product.price);
    },
  },
  methods: {
    removeProduct() {
      this.$emit('removeProduct', this.product);
    },
    updateValuesKey() {
      this.$axios.put('/api/v1/cart/' + this.$auth.user.person.id, {
        person_id: this.$auth.user.person.id,
        product_id: this.product.id,
        current_quantity: this.getCurrentQuantity,
      });
      this.$store.dispatch('cart/getSubtotal', this.$auth.user.person.id);
      this.$store.dispatch('cart/getTotal', {
        person_id: this.$auth.user.person.id,
      });
    },
    async add() {
      if (this.getCurrentQuantity > this.product.quantity - 1) {
        this.getCurrentQuantity = this.product.quantity;
      } else {
        this.getCurrentQuantity++;
      }
      this.$store.commit('cart/setIsLoading', true);
      await this.$axios.put('/api/v1/cart/' + this.$auth.user.person.id, {
        person_id: this.$auth.user.person.id,
        product_id: this.product.id,
        current_quantity: this.getCurrentQuantity + 1,
      });
      this.$store.dispatch('cart/getSubtotal', this.$auth.user.person.id);
      this.$store.dispatch('cart/getTotal', {
        person_id: this.$auth.user.person.id,
      });
      this.$store.commit('cart/setIsLoading', false);
    },
    async subtract() {
      if (this.getCurrentQuantity < 2) {
        this.getCurrentQuantity = 1;
      } else {
        this.getCurrentQuantity--;
      }
      this.$store.commit('cart/setIsLoading', true);
      await this.$axios.put('/api/v1/cart/' + this.$auth.user.person.id, {
        person_id: this.$auth.user.person.id,
        product_id: this.product.id,
        current_quantity: this.getCurrentQuantity - 1,
      });
      this.$store.dispatch('cart/getSubtotal', this.$auth.user.person.id);
      this.$store.dispatch('cart/getTotal', {
        person_id: this.$auth.user.person.id,
      });
      this.$store.commit('cart/setIsLoading', false);
    },
  },
};
</script>

<style scoped></style>
