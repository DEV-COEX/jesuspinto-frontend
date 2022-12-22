<template>
  <div v-if="product" class="relative w-full p-5 my-2 md:my-0 rounded-lg ">
    <div class="absolute top-5 right-5 flex items-center m-5 z-40">
      <Transition name="bounce">
        <button v-if="onCart" class="text-red-500 hover:text-red-600 mr-1 ease-in-out duration-200" type="button"
          @click="toCartProducts">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-fill"
            viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </button>
        <button v-else class="text-[#9B9E0B] hover:text-red-600 mr-1 ease-in-out duration-200" type="button"
          @click="toCartProducts">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-fill"
            viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </button>
      </Transition>
      <Transition name="bounce">
        <button v-if="onLiked" class="text-red-500 hover:text-red-600 ml-1 ease-in-out duration-200" type="button"
          @click="toLikedProducts">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
        </button>
        <button v-else class="text-[#9B9E0B] hover:text-red-600 ml-1 ease-in-out duration-200" type="button"
          @click="toLikedProducts">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart-fill"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
        </button>
      </Transition>
    </div>
    <div class="bg-white rounded-lg w-full h-full relative overflow-hidden shadow-xl border-t-2 border-inherit">
      <div class="w-full">
        <div :style="styles(product.images)"
          class="h-48 w-48 rounded-t-lg relative cursor-pointer block mx-auto hover:transform hover:scale-105 duration-200 ease-in-out"
          @click="$router.push('/products/' + product.uuid)"></div>
      </div>
      <div class="bg-white w-full h-20 flex rounded-b-lg items-center px-5">
        <div class="flex justify-between w-full">
          <h1 class="font-bold uppercase">
            {{ product.name }}
          </h1>
          <span class="ml-4">
            {{ price }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    product: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  computed: {
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
    styles(images) {
      return {
        backgroundColor: '#ffffff',
        backgroundImage: `url(${this.getImage(images)})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        height: '300px',
      };
    },
    getImage(images) {
      return images[0]?.path;
    },
    toCartProducts() {
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
          quantity: 1,
        });
        this.$axios.post('/api/v1/cart/', {
          person_id: this.$auth.user.person.id,
          product_id: this.product.id,
          current_quantity: 1,
        });
      }
    },
    toLikedProducts() {
      if (!this.$auth.user) {
        this.$notify({
          title: 'Advertencia',
          type: 'warn',
          text: 'Has descubierto una funciónn que requiere iniciar sesión',
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
  },
};
</script>
