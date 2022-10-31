<template>
  <div class="lg:px-28 py-5 px-5">
    <LoadingComponent v-if="isLoading" />
    <div v-else class="block mx-auto w-auto">
      <div class="grid grid-cols-1 xl:grid-cols-2 mt-10 mb-20 w-auto">
        <div class="w-full">
          <div
            class="flex flex-wrap -mx-2 overflow-hidden sm:-mx-2 md:-mx-2 lg:-mx-2 xl:-mx-2 h-full"
          >
            <div
              class=" px-2 w-full overflow-hidden  sm:px-2 md:px-2 md:w-1/6 lg:px-2 lg:w-1/6 xl:px-2 xl:w-1/6"
            >
              <div class="flex md:flex-col gap-0.5 h-full justify-between">
                <div
                  v-for="(image, i) in images"
                  :key="i"
                  class="bg-white rounded-lg p-2 h-30 w-30 mx-1 md:mx-0 shadow"
                >
                  <img
                    class="object-contain h-20 w-20 block mx-auto"
                    :src="image.path"
                    :alt="image.path"
                    @click="setCurrentImage(image)"
                  />
                </div>
              </div>
            </div>
            <div
              class="flex p-2 w-full h-full overflow-hidden sm:px-2 md:px-2 md:w-5/6 lg:px-2 lg:w-5/6 xl:px-2 xl:w-5/6 bg-white rounded-lg justify-center shadow"
            >
                <inner-image-zoom
                  ref="currentImage"
                  class="block mx-auto ease-in-out duration-200 transition-all h-full rounded-lg"
                  :src="currentImage.path"
                ></inner-image-zoom>
            </div>
          </div>
        </div>
        <div
          class="xl:px-5 lg:w-full xl:w-2/3 h-full min-w-full xl:min-w-[26rem]"
        >
          <ProductDetailComponent :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InnerImageZoom from 'vue-inner-image-zoom';

export default {
  name: 'ProductView',
  components: {
    'inner-image-zoom': InnerImageZoom,
  },
  layout: 'SlimLayout',
  auth: false,
  data: () => ({
    product: null,
    isLoading: false,
  }),
  computed: {
    images() {
      return this.product?.images;
    },
    currentImage() {
      return this.images[0];
    },
    user() {
      return this.$auth.user;
    },
  },
  beforeCreate() {
    if (this.user) {
      this.$store.dispatch('fetchCartProducts', this.$auth.user.id);
      this.$store.dispatch('fetchLikedProducts', this.$auth.user.id);
    }
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch('fetchProducts');
    this.product = this.$store.state.products.filter(
      (p) => `/products/${p.uuid}` === this.$route.path
    )[0];
    this.isLoading = false;
  },
  methods: {
    setCurrentImage(image) {
      this.$refs.currentImage.src = image.path;
      this.$refs.currentImage.alt = image.path;
    },
  },
};
</script>
<style lang="css">
/* @import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'; */
.iiz div:first-of-type{
  height: 100%;
}
.iiz div picture .iiz__img{
  height: 100%;
}
</style>
