export const state = () => ({
  total: 0,
  totalCents: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  discountCode: '',
  currentAddress: null,
  isLoading: false,
  selectedAddress: false,
  cards: [],
});

export const mutations = {
  setTotal(state, total) {
    state.total = total;
  },
  setTotalCents(state) {
    state.totalCents = state.total * 100;
  },
  setSubtotal(state, subtotal) {
    state.subtotal = subtotal;
  },
  setTax(state, tax) {
    state.tax = tax;
  },
  setShipping(state, shipping) {
    state.shipping = shipping;
  },
  setDiscount(state, discount) {
    state.discount = discount;
  },
  setCurrentAddress(state, address) {
    state.currentAddress = address;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setDiscountCode(state, discountCode) {
    state.discountCode = discountCode;
  },
  setCards(state, cards) {
    state.cards = cards;
  },
  setSelectedAddress(state, selectedAddress) {
    state.selectedAddress = selectedAddress;
  }
};

export const actions = {
  async getTotal({ commit }, payload) {
    const { total } = await this.$axios.$post('/api/v1/cart/total', payload);
    commit('setTotal', total);
    commit('setTotalCents');
  },
  async getSubtotal({ commit }, payload) {
    const { subtotal } = await this.$axios.$get(
      '/api/v1/cart/subtotal/' + payload
    );
    commit('setSubtotal', subtotal);
  },
  async getDiscount({ commit }, payload) {
    const { promCode } = await this.$axios.$get(
      '/api/v1/admin/prom-code/' + payload
    );
    commit('setDiscount', promCode.discount);
  },
  async getPaymentsCards({ commit }, payload) {
    const { cards } = await this.$axios.$get('/api/v1/cards/' + payload);
    commit('setCards', cards);
  },
};
