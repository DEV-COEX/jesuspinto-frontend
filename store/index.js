export const state = () => ({
  products: [],
  categories: [],
  featuredProducts: [],
  latestProducts: [],
  likedProducts: [],
  cartProducts: [],
  email: ''
});

export const mutations = {
  getEmailUser(state, email){
    state.email = email
  },
  setProducts(state, products) {
    state.products = products;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setFeaturedProducts(state, featuredProducts) {
    state.featuredProducts = featuredProducts;
  },
  setLatestProducts(state, latestProducts) {
    state.latestProducts = latestProducts;
  },
  setLikedProducts(state, likedProducts) {
    state.likedProducts = likedProducts;
  },
  setCartProducts(state, cartProducts) {
    state.cartProducts = cartProducts;
  },
  removeLikedProduct(state, product) {
    state.likedProducts = state.likedProducts.filter(
      (p) => p.id !== product.id
    );
  },
  addLikedProduct(state, product) {
    state.likedProducts.push(product);
  },
  removeCartProduct(state, product) {
    state.cartProducts = state.cartProducts.filter((p) => p.id !== product.id);
  },
  addCartProduct(state, payload) {
    const product = {
      ...payload.product,
      currentQuantity: payload.quantity,
    };
    state.cartProducts.push(product);
  },
  setProperty(state, payload) {
    const cartProductsId = state.cartProducts.map((product) => {
      return product.id;
    });
    const index = cartProductsId.indexOf(payload.id);
    let product = state.cartProducts.filter((product) => {
      return product.id === payload.id;
    })[0];
    product = {
      ...product,
      currentQuantity: Number(payload.currentQuantity),
    };
    state.cartProducts.splice(index, 1, product);
  },
};

export const actions = {
  async fetchProducts({ commit }) {
    if (this.state.products.length === 0) {
      const products = await this.$axios.$get('api/v1/product');
      commit('setProducts', products);
    }
  },
  async fetchAllProducts({ commit }) {
    const products = await this.$axios.$get('api/v1/product');
    commit('setProducts', products);
  },
  async fetchCategories({ commit }) {
    if (this.state.categories.length === 0) {
      const categories = await this.$axios.$get('api/v1/category');
      commit('setCategories', categories);
    }
  },
  async fetchFeaturedProducts({ commit }) {
    if (this.state.featuredProducts.length === 0) {
      const { products } = await this.$axios.$get('api/v1/product/featured');
      commit('setFeaturedProducts', products);
    }
  },

  async fetchLatestProducts({ commit }) {
    if (this.state.latestProducts.length === 0) {
      const { products } = await this.$axios.$get('api/v1/product/latest');
      commit('setLatestProducts', products);
    }
  },

  async fetchLikedProducts({ commit }, id) {
    const { wishlistProducts } = await this.$axios.$get(
      `api/v1/wishlist/items/${id}`
    );
    const likedProducts = [];
    wishlistProducts.forEach((product) => {
      likedProducts.push(product.product);
    });
    commit('setLikedProducts', likedProducts);
  },

  async fetchCartProducts({ commit }, id) {
    const { cartProducts } = await this.$axios.$get(`api/v1/cart/items/${id}`);
    const cart = [];
    cartProducts.forEach((product) => {
      cart.push({
        ...product.product,
        currentQuantity: product.current_quantity,
      });
    });
    commit('setCartProducts', cart);
  },
};
