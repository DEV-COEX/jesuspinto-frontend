<template>
  <div class="flex flex-col bg-white  shadow rounded-xl w-full h-full">
    <div class="flex justify-between px-4 pt-4 w-full">
      <span class="font-bold text-2xl uppercase">{{ product.name }}</span>
      <Transition name="bounce">
        <button
          v-if="onLiked"
          class="text-red-500 hover:text-red-600 ease-in-out duration-200 ml-5"
          type="button"
          @click="toLikedProducts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </button>
        <button
          v-else
          class="text-[#9B9E0B] hover:text-red-600 ease-in-out duration-200 ml-5"
          type="button"
          @click="toLikedProducts"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </button>
      </Transition>
    </div>
    <span class="font-semibold text-gray-500 px-5">
      Stock: {{ product.quantity }}
    </span>
    <div class="flex-col px-4">
      <h4 class="pt-4 text-gray-500 font-bold text-base">Descripción</h4>
      <p
        class="w-full text-gray-400 text-justify"
        :class="{ 'line-clamp-4': isActive }"
      >
        {{ product.description }}
      </p>
      <label
        v-if="isActive"
        class="cursor-pointer underline text-[#9B9E0B] "
        @click="verMas"
        >Ver más
      </label>
      <label
        v-if="!isActive"
        class="cursor-pointer underline text-[#9B9E0B] "
        @click="verMas"
        >Ver menos
      </label>
      <h2 class="font-bold text-xl text-[#15803d] mt-2">{{ price }}</h2>
    </div>
    <div
      class="flex flex-col md:flex-row justify-center items-center px-4 w-full"
    >
      <div
        class="flex flex-col md:flex-row justify-center items-center max-w-max"
      >
        <span class=" font-semibold mr-2">Cantidad:</span>
      </div>
      <div class="flex justify-center items-center w-full py-2">
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
            v-model="quantity"
            type="number"
            oninput="this.value = Math.abs(this.value)"
            class="w-10 h-4 text-center text-xs mx-3 rounded-lg text-black"
            min="1"
            :max="product.quantity"
            required
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
    </div>
    <div
      class="flex flex-col w-full justify-center content-center items-center p-5"
    >
      <ButtonComponent
       
        :title="'Comprar ahora'"
        :show="true"
        :type="'button'"
        @accionBoton="buyNow()"
      />
      <ButtonComponent
        class="w-full ease-in-out duration-200 hover:text-black font-semibold focus:outline-none border-2 border-red-600  bg-opacity-25 text-red-600 bg-red-200 hover:bg-red-600 rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
        :title="'Añadir al carrito'"
        :show="true"
        :type="'button'"
        @accionBoton="addToCart()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailComponent',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isActive: true,
      currentQuantity: 1,
    };
  },
  computed: {
    quantity: {
      get() {
        if (this.currentQuantity > this.product.quantity) {
          return this.product.quantity;
        } else {
          return this.currentQuantity;
        }
      },
      set(value) {
        this.currentQuantity = Number(value);
      },
    },
    price() {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(this.product.price);
    },
    onLiked() {
      return this.$store.state.likedProducts
        .map((product) => product.id)
        .includes(this.product.id);
    },
    onCart() {
      return this.$store.state.cartProducts
        .map((product) => product.id)
        .includes(this.product.id);
    },
  },
  methods: {
    async buyNow() {
      if (!this.$auth.user) {
        this.$notify({
          title: 'Advertencia',
          type: 'warn',
          text: 'Has desubierto una funcion que requiere iniciar sesion',
        });
      } else if (this.onCart) {
        this.$store.commit('removeCartProduct', this.product);
        this.$axios.delete(
          `/api/v1/cart/items/${this.$auth.user.id}/product/${this.product.id}`
        );
      } else {
        this.$store.commit('addCartProduct', {
          product: this.product,
          quantity: this.quantity,
        });
        await this.$axios
          .post('/api/v1/cart/', {
            person_id: this.$auth.user.person.id,
            product_id: this.product.id,
            current_quantity: this.quantity,
          })
          .then(() => {
            this.$router.push('/payments');
          });
      }
    },
    addToCart() {
      if (!this.$auth.user) {
        this.$notify({
          title: 'Advertencia',
          type: 'warn',
          text: 'Has desubierto una funcion que requiere iniciar sesion',
        });
      } else if (this.onCart) {
        this.$store.commit('removeCartProduct', this.product);
        this.$axios.delete(
          `/api/v1/cart/items/${this.$auth.user.id}/product/${this.product.id}`
        );
      } else {
        this.$store.commit('addCartProduct', {
          product: this.product,
          quantity: this.quantity,
        });
        this.$axios.post('/api/v1/cart/', {
          person_id: this.$auth.user.person.id,
          product_id: this.product.id,
          current_quantity: this.quantity,
        });
      }
    },
    toLikedProducts() {
      if (!this.$auth.user) {
        this.$notify({
          type: 'warn',
          title: 'Atención',
          text: 'Debes iniciar sesión para poder agregar productos a tu lista de deseos',
        });
      } else if (this.onLiked) {
        this.$store.commit('removeLikedProduct', this.product);
        this.$axios.delete(
          `/api/v1/wishlist/items/${this.$auth.user.id}/product/${this.product.id}`
        );
      } else {
        this.$store.commit('addLikedProduct', this.product);
        this.$axios.post('/api/v1/wishlist/', {
          person_id: this.$auth.user.person.id,
          product_id: this.product.id,
        });
      }
    },
    verMas() {
      this.isActive = !this.isActive;
    },
    add() {
      if (this.quantity > this.product.quantity - 1) {
        this.quantity = this.product.quantity;
      } else {
        this.quantity++;
      }
    },
    subtract() {
      this.quantity--;
      if (this.quantity < 1) {
        this.quantity = 1;
      }
    },
  },
};
</script>
