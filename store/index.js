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
  },
  setTag(state, value){ // Mutación para añadir un tag nuevo
    state.product?.tags.push(value)
  }
}

export const actions = {
  async fetchProducts({commit},path) {
    const products = await this.$axios.$get('api/v1/product')
    commit('setProducts', products)
    // const product = products.filter(
    //   (p) => `/ecommerce/products/${p.uuid}` === payload
    // )[0]
    // const id = parseInt(path.split("products/")[1])
    // console.log({id:id})
    const product = await this.$axios.$get(`api/v1/product/${parseInt(path.split("products/")[1])}`)
    // console.log({pro: product})
    commit('setProduct', product)
  },
}
