<template>
  <div>
    <LoadingComponent v-if="isLoading === true" />
    <Transition name="fade">
      <div
        v-if="isLoading === false"
        class="flex flex-col items-center lg:px-28 lg:py-10"
      >
        <section id="masonry" class="grid grid-cols-1 md:grid-cols-2 h-full">
          <div
            class="m-5 p-5 lg:bg-white rounded-2xl flex items-center justify-center"
          >
            <img
              src="@/static/example/image-2.png"
              alt="Example 1"
              class="item w-4/6"
            />
          </div>
          <div
            class="m-5 p-5 lg:bg-white rounded-2xl flex items-center justify-center"
          >
            <img
              src="@/static/example/image-3.png"
              alt="Example 1"
              class="item w-full"
            />
          </div>
        </section>
        <div class="w-full px-5">
          <section id="header-section" class="my-5 rounded">
            <carousel
              :pagination-enabled="false"
              :navigation-enabled="false"
              :autoplay="true"
              :autoplay-hover-pause="true"
              :per-page="1"
              class="h-96 rounded"
            >
              <slide>
                <img class="w-full object-cover rounded" src="@/static/example/banner.png" alt="Portada">
              </slide>
              <slide>
                <img class="w-full object-cover rounded" src="@/static/example/banner2.png" alt="Portada">
              </slide>
            </carousel>
          </section>
          <Transition name="fade">
            <section
              v-if="latestProducts.length > 0"
              id="latest-section"
              class="my-10"
            >
              <h1 class="font-bold text-lg">
                Lo último
                <nuxt-link
                  class="font-light text-blue-500 text-xs ml-2"
                  to="/products"
                  >Ver más
                </nuxt-link>
              </h1>
              <hr class="w-full my-2 border-gray-400 rounded-full" />
              <CarouselComponent
                :navigation-enabled="true"
                :per-page-custom="[
                  [1600, 4],
                  [1200, 3],
                  [800, 2],
                  [400, 1],
                ]"
                :pagination-enabled="false"
                :data="latestProducts"
              >
              </CarouselComponent>
            </section>
          </Transition>
          <Transition name="fade">
            <section
              v-if="featuredProducts.length === 2"
              id="featured-section"
              class="my-10"
            >
              <h1 class="font-bold text-lg">Destacados</h1>
              <hr class="w-full my-2 border-gray-500" />
              <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="lg:mr-1 lg:ml-2 m-1">
                  <FeaturedProductComponent :product="featuredProducts[0]" />
                </div>
                <div class="lg:ml-1 lg:mr-2 m-1">
                  <FeaturedProductComponent :product="featuredProducts[1]" />
                </div>
              </div>
            </section>
          </Transition>
          <Transition name="fade">
            <section
              v-if="likedProducts.length > 0"
              id="liked-section"
              class="my-10"
            >
              <h1 class="font-bold text-lg">Tus recomendados</h1>
              <button
                type="button"
                class="font-light text-blue-500 text-xs ml-2"
              >
                Ver más
              </button>
              <hr class="w-full my-2 border-gray-500" />
              <CarouselComponent
                :navigation-enabled="true"
                :per-page-custom="[
                  [1600, 4],
                  [1200, 3],
                  [800, 2],
                  [400, 1],
                ]"
                :pagination-enabled="false"
                :data="likedProducts"
              >
              </CarouselComponent>
            </section>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  auth: false,
  layout: 'SlimLayout',
  middleware({ store, redirect }) {
    const user = store.$auth.user;
    if (user && user.verified === 1) {
      return null;
    } else if (user && user.verified === 0) {
      return redirect('/not-verified');
    } else if (!user) {
      return null;
    }
  },
  data: () => ({
    isLoading: true,
  }),
  computed: {
    latestProducts() {
      return this.$store.state.latestProducts;
    },
    featuredProducts() {
      return this.$store.state.featuredProducts;
    },
    likedProducts() {
      return this.$store.state.likedProducts;
    },
    user() {
      return this.$auth.user;
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchLatestProducts');
    await this.$store.dispatch('fetchFeaturedProducts');
    this.isLoading = false;
    await this.$store.dispatch('fetchProducts');
    await this.$store.dispatch('fetchCategories');
    if (this.user) {
      await this.$store.dispatch('fetchLikedProducts', this.user.id);
      await this.$store.dispatch('fetchCartProducts', this.user.id);
    }
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  10% {
    transform: scale(1);
  }
}
</style>
