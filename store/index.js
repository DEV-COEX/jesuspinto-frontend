export const state = () => ({
  products: [],
  product: {},
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setProduct(state, product) {
    state.product = product
  },
  setProperty(state, {property, value}) {
    state.product = {
      ...state.product,
      [property]: value
    }
  }
}

export const actions = {
  async fetchProducts({commit}, payload) {
    const products = await this.$axios.$get('api/v1/product')
    commit('setProducts', products)
    const product = products.filter(
      (p) => `/ecommerce/products/${p.uuid}` === payload
    )[0]
    commit('setProduct', product)
  },
}
