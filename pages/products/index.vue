<template>
  <div>
    <LoadingComponent v-if="isLoading === true" />
    <Transition name="fade">
      <div
        v-if="isLoading === false"
        class="px-5 lg:px-14 xl:px-28 py-5 flex relative pt-10 w-full h-full"
      >
        <button
          class="absolute top-0 right-0 bg-blue-500 rounded-lg px-5 py-2 text-white font-bold flex m-2 md:hidden"
          @click="toggleFilter"
        >
          Filtros
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-filter ml-3"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div
          class="hidden md:block md:w-56 lg:w-64 xl:pr-5 md:h-[380px] mt-5 mb-10 content-center"
        >
          <div
            class="lg:block h-full flex flex-col items-start bg-white rounded-lg shadow px-5 lg:py-10 md:py-6 py-8 overflow-y-auto overflow-x-hidden"
          >
            <button
              type="button"
              class="text-[#9B9E0B] my-0.5 flex items-center justify-between w-full"
              @click="allProducts()"
            >
              <p
                class="break-all font-bold ease-in-out duration-200 p-2 hover:bg-blue-200 rounded-lg"
              >
                All products
              </p>
            </button>
            <div
              v-for="category in categories"
              :key="category.id"
              class="w-full my-2"
            >
              <button
                type="button"
                class="text-[#9B9E0B] my-0.5 flex items-center justify-between w-full hover:font-semibold ease-in-out duration-100"
                @click="fetchProductsByCategory(category.id)"
              >
                <span class="break-all">{{ category.name }}</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    class="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </button>
              <div
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
                class="ml-5 flex flex-col items-start break-all"
              >
                <button
                  class="hover:font-semibold ease-in-out duration-100"
                  @click="fetchProductsBySubcategory(subcategory.id)"
                >
                  {{ subcategory.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Transition name="slide">
          <div
            v-show="togglefill"
            class="md:hidden lg:hidden fixed sm:w-1/2 w-64 top-0 left-0 h-full mt-20 z-50"
          >
            <div
              class="h-full flex flex-col items-start bg-white rounded-lg shadow px-5 py-10 overflow-y-auto overflow-x-hidden"
            >
              <div
                v-for="category in categories"
                :key="category.id"
                class="w-full my-2"
              >
                <button
                  type="button"
                  class="text-[#9B9E0B] my-0.5 flex items-center justify-between w-full"
                  @click="fetchProductsByCategory(category.id)"
                >
                  <span class="break-all">{{ category.name }}</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      class="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  v-for="subcategory in category.subcategories"
                  :key="subcategory.id"
                  class="ml-5 flex flex-col items-start break-all"
                >
                  <button>
                    {{ subcategory.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <div
          class="mt-5 md:mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 h-full w-full content-center mb-5"
        >
          <div v-for="product in products" :key="product.id" class="min-w-full ">
            <ProductCardComponent :product="product" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  layout: 'SlimLayout',
  auth: false,
  data: () => ({
    togglefill: false,
    isLoading: true,
  }),
  computed: {
    products() {
      return this.$store.state.products;
    },
    categories() {
      return this.$store.state.categories;
    },
    user() {
      return this.$auth.user;
    },
  },
  mounted() {
    if (this.user !== null) {
      this.$store.dispatch('fetchCartProducts', this.$auth.user.person_id);
      this.$store.dispatch('fetchLikedProducts', this.$auth.user.person_id);
    }
    document.addEventListener('click', this.closeFilter);
    this.$store.dispatch('fetchProducts');
    this.$store.dispatch('fetchCategories');
    this.isLoading = false;
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeFilter);
  },
  methods: {
    toggleFilter() {
      this.togglefill = !this.togglefill;
    },
    closeFilter(e) {
      if (!this.$el.contains(e.target)) {
        this.togglefill = false;
      }
    },
    async fetchProductsByCategory(categoryId) {
      const { data } = await this.$axios.get(
        `/api/v1/product/category/${categoryId}`
      );
      await this.$store.commit('setProducts', data.products);
    },
    async fetchProductsBySubcategory(subcategoryId) {
      try {
        const { data } = await this.$axios.get(
          `/api/v1/product/subcategory/${subcategoryId}`
        );
        await this.$store.commit('setProducts', data.products);
      } catch (error) {
        this.$store.commit('setProducts', []);
      }
    },
    allProducts() {
      this.$store.dispatch('fetchAllProducts');
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}
</style>
