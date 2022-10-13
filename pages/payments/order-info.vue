<template>
  <div
    class="flex lg:flex-row flex-col lg:m-10 md:m-8 sm:m-7 lg:p-10 md:p-8 sm:p-7 p-4"
  >
    <OrderInfoComponent
      class="w-full lg:w-1/2 mr-20"
      :financial-institutions="financial_institutions"
      :with-new-card="withNewCard"
      @onPayment="onPayment"
      @saveCard="saveCard"
      @withNewCard="changeNewCard"
      @token="setTokenCard"
      @close="withNewCard = false"
    />
    <PurchaseSummaryComponent
      :products="cartProducts"
      class="w-full lg:w-1/2 mt-8 lg:mt-0"
    />
    <LoadingComponent v-if="isLoading"></LoadingComponent>
  </div>
</template>

<script>
import axios from 'axios';
import {
  PRODUCTION_URL, PRODUCTION_PRIVATE_API_KEY, PRODUCTION_PUBLIC_API_KEY,
} from '@/plugins/BASE_CONFIG';

export default {
  name: 'OrderInfoView',
  layout: 'SlimLayout',
  middleware({store, redirect}) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
    if (store.state.cart.currentAddress === null) {
      redirect('/payments/delivery');
    }
  },
  data: () => ({
    wompi: {},
    cardToken: '',
    withNewCard: false,
    storeCard: false,
    purchase: {},
    financial_institutions: [],
  }),
  computed: {
    cartProducts() {
      return this.$store.state.cartProducts;
    },
    route() {
      return this.$route.path;
    },
    discount() {
      return this.$store.state.cart.discount;
    },
    shipping() {
      return this.$store.state.cart.shipping;
    },
    subtotal() {
      return this.$store.state.cart.subtotal;
    },
    total() {
      return this.$store.state.cart.total;
    },
    tax() {
      return this.$store.state.cart.tax;
    },
    isLoading() {
      return this.$store.state.cart.isLoading;
    },
    currentAddress() {
      return this.$store.state.cart.currentAddress;
    },
    totalCents() {
      return this.$store.state.cart.totalCents;
    },
    discountCode: {
      get() {
        return this.$store.state.cart.discountCode;
      },
      set(value) {
        this.$store.commit('cart/setDiscountCode', value);
      },
    },
  },
  beforeCreate() {
    this.$store.dispatch('fetchCartProducts', this.$auth.user.id);
  },
  mounted() {
    this.merchant();
    axios
      .get(PRODUCTION_URL + '/pse/financial_institutions', {
        headers: {
          authorization: 'Bearer ' + PRODUCTION_PUBLIC_API_KEY,
        },
      })
      .then((response) => {
        this.financial_institutions = response.data.data;
      });
  },
  methods: {
    async merchant() {
      this.$store.commit('cart/setIsLoading', true);
      await this.$axios
        .get(`${PRODUCTION_URL}/merchants/${PRODUCTION_PUBLIC_API_KEY}`)
        .then((response) => {
          this.wompi = response.data.data;
        });
      this.$store.commit('cart/setIsLoading', false);
    },
    changeNewCard(value) {
      this.withNewCard = value;
    },
    setTokenCard(token) {
      this.cardToken = token;
    },
    clean() {
      this.$store.commit('cart/setDiscountCode', '');
      this.$store.commit('cart/setDiscount', 0);
      this.$store.commit('cart/setSubtotal', 0);
      this.$store.commit('cart/setTotal', 0);
      this.$store.commit('cart/setTax', 0);
      this.$store.commit('cart/setCurrentAddress', null);
      this.$store.commit('cart/setShipping', 0);
    },
    async onPayment(payload) {
      this.$store.commit('cart/setIsLoading', true);
      switch (payload.method) {
        case 'pse':
          await this.$axios
            .post('/api/v1/purchases/purchase-reference', {
              total_value: this.total,
              sending_address_id: parseInt(this.currentAddress),
              seller_id: 1,
              purchaser_id: this.$auth.user.person_id,
            })
            .then((response) => {
              this.purchase = response.data;
            })
            .then(async () => {
              await axios
                .post(
                  `${PRODUCTION_URL}/transactions`,
                  {
                    acceptance_token:
                    this.wompi.presigned_acceptance.acceptance_token,
                    amount_in_cents: this.totalCents,
                    currency: 'COP',
                    customer_email: this.$auth.user.email,
                    reference: this.purchase.reference,
                    customer_data: {
                      phone_number: this.$auth.user.person.phone,
                      full_name:
                        this.$auth.user.person.name +
                        ' ' +
                        this.$auth.user.person.lastname,
                    },
                    shipping_address: {
                      address_line_1: this.purchase.sending_address.address,
                      city: this.purchase.sending_address.city.name,
                      region:
                      this.purchase.sending_address.city.department.name,
                      country: 'CO',
                      phone_number: this.$auth.user.person.phone,
                    },
                    payment_method: {
                      type: 'PSE',
                      user_type: payload.userType,
                      user_legal_id_type: payload.documentType,
                      user_legal_id: payload.documentNumber,
                      financial_institution_code: payload.financialCode,
                      payment_description:
                        'Compra de productos con referencia ' +
                        this.purchase.reference,
                    },
                  },
                  {
                    headers: {
                      authorization: `Basic  ${PRODUCTION_PRIVATE_API_KEY}`,
                    },
                  }
                )
                .then(() => {
                  let temp = 0;
                  const longPolling = setInterval(() => {
                    axios
                      .get(
                        PRODUCTION_URL +
                        '/transactions?reference=' +
                        this.purchase.reference,
                        {
                          headers: {
                            authorization: 'Bearer ' + PRODUCTION_PRIVATE_API_KEY,
                          },
                        }
                      )
                      .then((response) => {
                        const data = response.data.data[0];
                        if (data.payment_method.extra) {
                          if (temp === 0) {
                            window.open(data.payment_method.extra.async_payment_url, '_blank');
                            temp = 1;
                          }
                          if (data.status === 'APPROVED') {
                            clearInterval(longPolling);
                            this.$axios.post(
                              `/api/v1/purchases/confirm-purchase/${this.purchase.reference}`,
                              {
                                total_value: this.total,
                                sendding_address_id: Number(this.currentAddress),
                                seller_id: 1,
                                purchaser_id: this.$auth.user.person_id,
                                reference: this.purchase.reference,
                              }
                            ).then(async () => {
                              await this.$axios.get(
                                '/api/v1/purchases/pdf/' + this.purchase.purchaser_id
                              );
                            }).then(() => {
                              this.$router.push('/');
                              this.$store.dispatch('fetchAllProducts');
                            })
                            window.open(
                              '/payments/orders/' + this.purchase.reference,
                              '_blank'
                            );
                          } else if (data.status === "DECLINED") {
                            clearInterval(longPolling);
                            return new Promise((resolve, reject) => {
                              resolve(window.open(
                                '/payments/orders/' + this.purchase.reference,
                                '_blank'
                              ))
                            }).then(() => {
                              this.$router.push('/');
                              this.$store.dispatch('fetchAllProducts');
                            })
                          } else if (data.status === "ERROR") {
                            clearInterval(longPolling);
                            return new Promise((resolve, reject) => {
                              resolve(window.open(
                                '/payments/orders/' + this.purchase.reference,
                                '_blank'
                              ))
                            }).then(() => {
                              this.$router.push('/');
                              this.$store.dispatch('fetchAllProducts');
                            })
                          }
                        }
                      });
                  }, 1000);
                });
            })
          break;
        case 'card':
          if (this.withNewCard === true) {
            const {data} = await axios.post(
              `${PRODUCTION_URL}/tokens/cards`,
              {
                number: payload.cardNumber,
                cvc: payload.cvc,
                exp_month: payload.month,
                exp_year: payload.year,
                card_holder: payload.name + ' ' + payload.lastname,
              },
              {
                headers: {
                  Authorization: `Bearer ${PRODUCTION_PUBLIC_API_KEY}`,
                },
              }
            );
            await this.$axios
              .post('/api/v1/purchases/purchase-reference', {
                total_value: this.total,
                sending_address_id: parseInt(this.currentAddress),
                seller_id: 1,
                purchaser_id: this.$auth.user.person_id,
              })
              .then((response) => {
                this.purchase = response.data;
              })
              .then(async () => {
                await axios
                  .post(
                    `${PRODUCTION_URL}/transactions`,
                    {
                      acceptance_token:
                      this.wompi.presigned_acceptance.acceptance_token,
                      amount_in_cents: this.totalCents,
                      currency: 'COP',
                      customer_email: this.$auth.user.email,
                      reference: this.purchase.reference,
                      customer_data: {
                        phone_number: this.$auth.user.person.phone,
                        full_name:
                          this.$auth.user.person.name +
                          ' ' +
                          this.$auth.user.person.lastname,
                      },
                      shipping_address: {
                        address_line_1: this.purchase.sending_address.address,
                        city: this.purchase.sending_address.city.name,
                        region:
                        this.purchase.sending_address.city.department.name,
                        country: 'CO',
                        phone_number: this.$auth.user.person.phone,
                      },
                      payment_method: {
                        type: 'CARD',
                        token: data.data.id,
                        installments: 1,
                      },
                    },
                    {
                      headers: {
                        authorization: `Basic  ${PRODUCTION_PRIVATE_API_KEY}`,
                      },
                    }
                  )
                  .then(async () => {
                    await this.$axios.post(
                      `/api/v1/purchases/confirm-purchase/${this.purchase.reference}`,
                      {
                        total_value: this.total,
                        sendding_address_id: Number(this.currentAddress),
                        seller_id: 1,
                        purchaser_id: this.$auth.user.person_id,
                        reference: this.purchase.reference,
                      }
                    );
                  })
                  .then(async () => {
                    await this.$axios.get(
                      '/api/v1/purchases/pdf/' + this.purchase.purchaser_id
                    );
                  })
                  .then(() => {
                    this.$store.dispatch('fetchAllProducts');
                  }).then(() => {
                    window.open(
                      '/payments/orders/' + this.purchase.reference,
                      '_blank'
                    );
                  });
              })
              .then(() => {
                this.$router.push('/');
              })
            if (this.storeCard === true) {
              await this.merchant();
              await axios
                .post(
                  PRODUCTION_URL + '/tokens/cards',
                  {
                    number: payload.cardNumber,
                    cvc: payload.cvc,
                    exp_month: payload.month,
                    exp_year: payload.year,
                    card_holder: payload.name + ' ' + payload.lastname,
                  },
                  {
                    headers: {
                      authorization: `Bearer ${this.wompi.public_key}`,
                    },
                  }
                )
                .then(async (response) => {
                  this.paymentCard = response.data.data;
                  await axios
                    .post(
                      PRODUCTION_URL + '/payment_sources',
                      {
                        type: 'CARD',
                        token: response.data.data.id,
                        customer_email: this.$auth.user.email,
                        acceptance_token:
                        this.wompi.presigned_acceptance.acceptance_token,
                      },
                      {
                        headers: {
                          authorization: `Bearer ${PRODUCTION_PRIVATE_API_KEY}`,
                        },
                      }
                    )
                    .then(async (response) => {
                      const token = response.data.data.id;
                      await this.$axios.post('/api/v1/cards', {
                        name: this.paymentCard.name,
                        token: token.toString(),
                        person_id: this.$auth.user.person_id,
                      });
                    })
                    .then(() => {
                      this.$store.dispatch(
                        'cart/getPaymentsCards',
                        this.$auth.user.person_id
                      );
                      this.isAdd = false;
                    });
                })
            }
          } else {
            await this.$axios
              .post('/api/v1/purchases/purchase-reference', {
                total_value: this.total,
                sending_address_id: parseInt(this.currentAddress),
                seller_id: 1,
                purchaser_id: this.$auth.user.person_id,
              })
              .then((response) => {
                this.purchase = response.data;
              })
              .then(async () => {
                await axios.post(
                  `${PRODUCTION_URL}/transactions`,
                  {
                    acceptance_token:
                    this.wompi.presigned_acceptance.acceptance_token,
                    amount_in_cents: this.totalCents,
                    currency: 'COP',
                    customer_email: this.$auth.user.email,
                    payment_source_id: parseInt(this.cardToken),
                    reference: this.purchase.reference,
                    customer_data: {
                      phone_number: this.$auth.user.person.phone,
                      full_name:
                        this.$auth.user.person.name +
                        ' ' +
                        this.$auth.user.person.lastname,
                    },
                    shipping_address: {
                      address_line_1: this.purchase.sending_address.address,
                      city: this.purchase.sending_address.city.name,
                      region:
                      this.purchase.sending_address.city.department.name,
                      country: 'CO',
                      phone_number: this.$auth.user.person.phone,
                    },
                    payment_method: {
                      installments: 1,
                    },
                  },
                  {
                    headers: {
                      authorization: `Basic  ${PRODUCTION_PRIVATE_API_KEY}`,
                    },
                  }
                );
              })
              .then(async () => {
                await this.$axios.post(
                  `/api/v1/purchases/confirm-purchase/${this.purchase.reference}`,
                  {
                    total_value: this.total,
                    sendding_address_id: Number(this.currentAddress),
                    seller_id: 1,
                    purchaser_id: this.$auth.user.person_id,
                    reference: this.purchase.reference,
                  }
                );
              })
              .then(async () => {
                await this.$axios.get(
                  '/api/v1/purchases/pdf/' + this.purchase.purchaser_id
                );
              })
              .then(() => {
                this.$store.dispatch('fetchAllProducts');
              })
              .then(() => {
                window.open(
                  '/payments/orders/' + this.purchase.reference,
                  '_blank'
                );
              });
          }
          break;
      }
      await this.clean();
    },
    saveCard(value) {
      this.storeCard = value;
    },
  },
};
</script>
