<template>
  <div
    class="flex flex-col w-full sm:py-15 py-10 sm:pl-20 pl-5 sm:pr-20 pr-5 items-center"
  >
    <div class="flex flex-col w-full">
      <h1 class="text-black font-bold text-xl mb-4">Mis tarjetas</h1>
      <hr class="border bg-gray-400 border-gray-400 rounded-full" />
    </div>

    <div
      v-if="cards.length > 0"
      :class="isLoading === true ? 'animate-pulse' : ''"
      class="w-full flex flex-col items-center justify-center"
    >
      <div
        v-for="card in cards"
        :key="card.id"
        class="flex flex-col bg-white rounded-xl w-full md:w-1/2 justify-center p-6 sm:p-10 m-10"
      >
        <div class="flex flex-col">
          <div class="block w-full sm:flex">
            <div
              class="flex sm:mr-5 sm:items-center mb-6 justify-center sm:mb-2"
            >
              <div class="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-credit-card-2-front-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
                  />
                </svg>
              </div>
            </div>
            <div class="block w-full justify-between sm:flex">
              <div
                class="sm:justify-center sm:flex sm:flex-col block text-center sm:text-left"
              >
                <div>
                  <label class="font-light text-sm text-blue-700"
                    >Terminada en
                    <span class="font-semibold">{{
                      card.name.slice(5)
                    }}</span></label
                  >
                </div>
                <div>
                  <label class="font-light text-sm">{{ card.name }}</label>
                </div>
              </div>
              <div class="flex items-center justify-center mt-9">
                <button
                  class="font-light text-blue-700 cursor-pointer"
                  @click="removeCard(card.id)"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <hr class="mt-5 mb-5 bg-gray-400" />
        </div>
      </div>
    </div>
    <div v-else :class="isLoading === true ? 'animate-pulse' : ''">
      <div v-if="isAdd === false">
        <div class="my-5">
          <div class="bg-white rounded-xl p-5">
            <h1 class="text-xl">No tienes tarjetas de pago registradas</h1>
            <button
              class="text-blue-400 hover:text-blue-500 ease-in-out duration-200 font-semibold bg-blue-100 rounded-xl p-2 mt-5 border-2 border-blue-300 block mx-auto"
              type="button"
              @click="adding"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isAdd === true"
      :class="isLoading === true ? 'animate-pulse' : ''"
      class="mt-16"
    >
      <div class="card-form">
        <div class="card-list">
          <div class="card-item" :class="{ '-active': isCardFlipped }">
            <div class="card-item__side -front">
              <div
                ref="focusElement"
                class="card-item__focus"
                :class="{ '-active': focusElementStyle }"
                :style="focusElementStyle"
              ></div>
              <div class="card-item__cover">
                <img
                  :src="
                    'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                    currentCardBackground +
                    '.jpeg'
                  "
                  class="card-item__bg"
                />
              </div>

              <div class="card-item__wrapper">
                <div class="card-item__top">
                  <img
                    src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                    class="card-item__chip"
                  />
                </div>
                <label
                  ref="cardNumber"
                  for="cardNumber"
                  class="card-item__number"
                >
                  <template v-if="getCardType === 'amex'">
                    <span v-for="(n, $index) in amexCardMask" :key="$index">
                      <transition name="slide-fade-up">
                        <div
                          v-if="
                            $index > 4 &&
                            $index < 14 &&
                            cardNumber.length > $index &&
                            n.trim() !== ''
                          "
                          class="card-item__numberItem"
                        >
                          *
                        </div>
                        <div
                          v-else-if="cardNumber.length > $index"
                          :key="$index"
                          class="card-item__numberItem"
                          :class="{ '-active': n.trim() === '' }"
                        >
                          {{ cardNumber[$index] }}
                        </div>
                        <div
                          v-else
                          :key="$index + 1"
                          class="card-item__numberItem"
                          :class="{ '-active': n.trim() === '' }"
                        >
                          {{ n }}
                        </div>
                      </transition>
                    </span>
                  </template>

                  <template v-else>
                    <span v-for="(n, $index) in otherCardMask" :key="$index">
                      <transition name="slide-fade-up">
                        <div
                          v-if="
                            $index > 4 &&
                            $index < 15 &&
                            cardNumber.length > $index &&
                            n.trim() !== ''
                          "
                          class="card-item__numberItem"
                        >
                          *
                        </div>
                        <div
                          v-else-if="cardNumber.length > $index"
                          :key="$index"
                          class="card-item__numberItem"
                          :class="{ '-active': n.trim() === '' }"
                        >
                          {{ cardNumber[$index] }}
                        </div>
                        <div
                          v-else
                          :key="$index + 1"
                          class="card-item__numberItem"
                          :class="{ '-active': n.trim() === '' }"
                        >
                          {{ n }}
                        </div>
                      </transition>
                    </span>
                  </template>
                </label>
                <div class="card-item__content">
                  <label ref="cardName" for="cardName" class="card-item__info">
                    <div class="card-item__holder">Nombre en la tarjeta</div>
                    <transition name="slide-fade-up">
                      <div
                        v-if="cardName.length"
                        key="1"
                        class="card-item__name flex"
                      >
                        <transition-group name="slide-fade-right">
                          <div
                            v-for="(n, $index) in cardName.replace(
                              /\s\s+/g,
                              ' '
                            )"
                            :key="$index + 1"
                            class="flex"
                          >
                            <span
                              v-if="$index === $index"
                              class="card-item__nameItem flex"
                              >{{ n }}</span
                            >
                          </div>
                        </transition-group>
                      </div>
                      <div v-else key="2" class="card-item__name">
                        Nombre Completo
                      </div>
                    </transition>
                  </label>
                  <div ref="cardDate" class="card-item__date">
                    <label for="cardMonth" class="card-item__dateTitle"
                      >Expira en</label
                    >
                    <label for="cardMonth" class="card-item__dateItem">
                      <transition name="slide-fade-up">
                        <span v-if="cardMonth" :key="cardMonth">{{
                          cardMonth
                        }}</span>
                        <span v-else key="2" class="text-sm">MM</span>
                      </transition>
                    </label>
                    <span class="mx-1"> / </span>
                    <label for="cardYear" class="card-item__dateItem">
                      <transition name="slide-fade-up">
                        <span v-if="cardYear" :key="cardYear">{{
                          String(cardYear).slice(2, 4)
                        }}</span>
                        <span v-else key="2" class="text-sm">YY</span>
                      </transition>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-item__side -back">
              <div class="card-item__cover">
                <img
                  :src="
                    'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                    currentCardBackground +
                    '.jpeg'
                  "
                  class="card-item__bg"
                />
              </div>
              <div class="card-item__band"></div>
              <div class="card-item__cvv">
                <div class="card-item__cvvTitle">CVV</div>
                <div class="card-item__cvvBand">
                  <span v-for="(n, $index) in cardCvv" :key="$index"> * </span>
                </div>
                <div class="card-item__type">
                  <img
                    v-if="getCardType"
                    :src="
                      'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                      getCardType +
                      '.png'
                    "
                    class="card-item__typeImg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-form__inner">
          <div class="card-input">
            <label for="cardNumber" class="card-input__label"
              >Numero de la tarjeta</label
            >
            <input
              id="cardNumber"
              v-model="cardNumber"
              type="text"
              class="card-input__input"
              data-ref="cardNumber"
              autocomplete="off"
              @focus="focusInput"
              @blur="blurInput"
            />
          </div>
          <div class="card-input">
            <label for="cardName" class="card-input__label"
              >Nombres y Apellidos</label
            >
            <input
              id="cardName"
              v-model="cardName"
              type="text"
              class="card-input__input"
              data-ref="cardName"
              autocomplete="off"
              @focus="focusInput"
              @blur="blurInput"
            />
          </div>
          <div class="card-form__row">
            <div class="card-form__col">
              <div class="card-form__group">
                <label for="cardMonth" class="card-input__label"
                  >Fecha de expiracion</label
                >
                <select
                  id="cardMonth"
                  v-model="cardMonth"
                  class="card-input__input -select"
                  data-ref="cardDate"
                  @focus="focusInput"
                  @blur="blurInput"
                >
                  <option value="" disabled selected>Mes</option>
                  <option
                    v-for="n in 12"
                    :key="n"
                    :value="n < 10 ? '0' + n : n"
                    :disabled="n < minCardMonth"
                  >
                    {{ n < 10 ? '0' + n : n }}
                  </option>
                </select>
                <select
                  id="cardYear"
                  v-model="cardYear"
                  class="card-input__input -select"
                  data-ref="cardDate"
                  @focus="focusInput"
                  @blur="blurInput"
                >
                  <option value="" disabled selected>Año</option>
                  <option
                    v-for="(n, $index) in 12"
                    :key="n"
                    :value="$index + minCardYear"
                  >
                    {{ $index + minCardYear }}
                  </option>
                </select>
              </div>
            </div>
            <div class="card-form__col -cvv">
              <div class="card-input">
                <label for="cardCvv" class="card-input__label">CVC</label>
                <input
                  id="cardCvv"
                  v-model="cardCvv"
                  type="text"
                  class="card-input__input"
                  maxlength="4"
                  autocomplete="off"
                  @focus="flipCard(true)"
                  @blur="flipCard(false)"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            class="bg-blue-100 text-blue-500 font-semibold hover:text-blue-600 ease-in-out duration-200 rounded-xl w-full border-2 border-blue-300 px-5 py-3"
            @click="addPaymentCard"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { SANDBOX_PUBLIC_API_KEY } from '~/plugins/BASE_CONFIG';

export default {
  name: 'PaymentCardsView',
  layout: 'SlimLayout',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
  },
  data: () => ({
    isAdd: false,
    isLoading: false,
    wompi: {},
    paymentCard: {},
    currentCardBackground: Math.floor(Math.random() * 25 + 1),
    cardName: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    minCardYear: new Date().getFullYear(),
    amexCardMask: '#### ###### #####',
    otherCardMask: '#### #### #### ####',
    cardNumberTemp: '',
    isCardFlipped: false,
    focusElementStyle: null,
    isInputFocused: false,
  }),
  computed: {
    cards() {
      return this.$store.state.cart.cards;
    },
    getCardType() {
      const number = this.cardNumber;
      let re = /^4/;
      if (number.match(re) != null) return 'visa';

      re = /^(34|37)/;
      if (number.match(re) != null) return 'amex';

      re = /^5[1-5]/;
      if (number.match(re) != null) return 'mastercard';

      re = /^6011/;
      if (number.match(re) != null) return 'discover';

      re = /^9792/;
      if (number.match(re) != null) return 'troy';

      return 'visa'; // default type
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = '';
      }
    },
  },
  mounted() {
    axios
      .get(`https://sandbox.wompi.co/v1/merchants/${SANDBOX_PUBLIC_API_KEY}`)
      .then((response) => {
        this.wompi = response.data.data;
      });
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById('cardNumber');
  },
  beforeCreate() {
    this.$store.dispatch('cart/getPaymentsCards', this.$auth.user.person_id);
  },
  methods: {
    async removeCard(id) {
      this.isLoading = true;
      await this.$axios.delete('/api/v1/cards/' + id);
      await this.$store.dispatch(
        'cart/getPaymentsCards',
        this.$auth.user.person_id
      );
      this.isLoading = false;
    },
    async addPaymentCard() {
      this.isLoading = true;
      await axios
        .post(
          'https://sandbox.wompi.co/v1/tokens/cards',
          {
            number: this.cardNumber.replace(/\D/g, ''),
            cvc: this.cardCvv,
            exp_month: this.cardMonth.toString(),
            exp_year: this.cardYear.toString().slice(2, 4),
            card_holder: this.cardName,
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
              'https://sandbox.wompi.co/v1/payment_sources',
              {
                type: 'CARD',
                token: response.data.data.id,
                customer_email: this.$auth.user.email,
                acceptance_token:
                  this.wompi.presigned_acceptance.acceptance_token,
              },
              {
                headers: {
                  authorization: `Bearer prv_test_Y0huCJ11D5nqDb1fiCHKPO1hjePYTFDv`,
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
              this.isLoading = false;
            });
        });
    },
    adding() {
      this.isAdd = !this.isAdd;
    },
    flipCard(status) {
      this.isCardFlipped = status;
    },
    focusInput(e) {
      this.isInputFocused = true;
      const targetRef = e.target.dataset.ref;
      const target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
      };
    },
    blurInput() {
      const vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  min-height: 100vh;
  display: flex;
  padding: 50px 15px;
  @media screen and (max-width: 700px), (max-height: 500px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
}

.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;

  @media screen and (max-width: 576px) {
    margin: 0 auto;
  }

  &__inner {
    background: #fff;
    border-radius: 10px;
    padding: 35px;
    padding-top: 180px;

    @media screen and (max-width: 480px) {
      padding: 25px;
      padding-top: 165px;
    }
    @media screen and (max-width: 360px) {
      padding: 15px;
      padding-top: 165px;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    @media screen and (max-width: 480px) {
      flex-wrap: wrap;
    }
  }

  &__col {
    flex: auto;
    margin-right: 35px;

    &:last-child {
      margin-right: 0;
    }

    @media screen and (max-width: 480px) {
      margin-right: 0;
      flex: unset;
      width: 100%;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &.-cvv {
      max-width: 150px;
      @media screen and (max-width: 480px) {
        max-width: initial;
      }
    }
  }

  &__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .card-input__input {
      flex: 1;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__button {
    width: 100%;
    height: 55px;
    background: #2364d2;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 500;
    font-family: 'Source Sans Pro', sans-serif;
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
    color: #fff;
    margin-top: 20px;
    cursor: pointer;

    @media screen and (max-width: 480px) {
      margin-top: 10px;
    }
  }
}

.card-item {
  max-width: 430px;
  height: 270px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  width: 100%;

  @media screen and (max-width: 480px) {
    max-width: 310px;
    height: 220px;
    width: 90%;
  }

  @media screen and (max-width: 360px) {
    height: 180px;
  }

  &.-active {
    .card-item__side {
      &.-front {
        transform: perspective(1000px) rotateY(180deg) rotateX(0deg)
          rotateZ(0deg);
      }

      &.-back {
        transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
        // box-shadow: 0 20px 50px 0 rgba(81, 88, 206, 0.65);
      }
    }
  }

  &__focus {
    position: absolute;
    z-index: 3;
    border-radius: 5px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.65);

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: rgb(8, 20, 47);
      height: 100%;
      border-radius: 5px;
      filter: blur(25px);
      opacity: 0.5;
    }

    &.-active {
      opacity: 1;
    }
  }

  &__side {
    border-radius: 15px;
    overflow: hidden;
    // box-shadow: 3px 13px 30px 0px rgba(11, 19, 41, 0.5);
    // box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    backface-visibility: hidden;
    height: 100%;

    &.-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
      z-index: 2;
      padding: 0;
      // background-color: #2364d2;
      // background-image: linear-gradient(
      //   43deg,
      //   #4158d0 0%,
      //   #8555c7 46%,
      //   #2364d2 100%
      // );
      height: 100%;

      .card-item__cover {
        transform: rotateY(-180deg);
      }
    }
  }

  &__bg {
    max-width: 100%;
    display: block;
    max-height: 100%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__cover {
    height: 100%;
    background-color: #1c1d27;
    position: absolute;
    height: 100%;
    background-color: #1c1d27;
    left: 0;
    top: 0;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(6, 2, 29, 0.45);
    }
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 0 10px;

    @media screen and (max-width: 480px) {
      margin-bottom: 25px;
    }
    @media screen and (max-width: 360px) {
      margin-bottom: 15px;
    }
  }

  &__chip {
    width: 60px;
    @media screen and (max-width: 480px) {
      width: 50px;
    }
    @media screen and (max-width: 360px) {
      width: 40px;
    }
  }

  &__type {
    height: 45px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    max-width: 100px;
    margin-left: auto;
    width: 100%;

    @media screen and (max-width: 480px) {
      height: 40px;
      max-width: 90px;
    }
    @media screen and (max-width: 360px) {
      height: 30px;
    }
  }

  &__typeImg {
    max-width: 100%;
    object-fit: contain;
    max-height: 100%;
    object-position: top right;
  }

  &__info {
    color: #fff;
    width: 100%;
    max-width: calc(100% - 85px);
    padding: 10px 15px;
    font-weight: 500;
    display: block;

    cursor: pointer;

    @media screen and (max-width: 480px) {
      padding: 10px;
    }
  }

  &__holder {
    opacity: 0.7;
    font-size: 13px;
    margin-bottom: 6px;
    @media screen and (max-width: 480px) {
      font-size: 12px;
      margin-bottom: 5px;
    }
  }

  &__wrapper {
    font-family: 'Source Code Pro', monospace;
    padding: 25px 15px;
    position: relative;
    z-index: 4;
    height: 100%;
    text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
    user-select: none;
    @media screen and (max-width: 480px) {
      padding: 20px 10px;
    }
  }

  &__name {
    font-size: 18px;
    line-height: 1;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  &__nameItem {
    display: inline-block;
    min-width: 8px;
    position: relative;
  }

  &__number {
    font-weight: 500;
    line-height: 1;
    color: #fff;
    font-size: 27px;
    margin-bottom: 35px;
    display: inline-block;
    padding: 10px 15px;
    cursor: pointer;

    @media screen and (max-width: 480px) {
      font-size: 21px;
      margin-bottom: 15px;
      padding: 10px 10px;
    }

    @media screen and (max-width: 360px) {
      font-size: 19px;
      margin-bottom: 10px;
      padding: 10px 10px;
    }
  }

  &__numberItem {
    width: 16px;
    display: inline-block;

    &.-active {
      width: 30px;
    }

    @media screen and (max-width: 480px) {
      width: 13px;

      &.-active {
        width: 16px;
      }
    }

    @media screen and (max-width: 360px) {
      width: 12px;

      &.-active {
        width: 8px;
      }
    }
  }

  &__content {
    color: #fff;
    display: flex;
    align-items: flex-start;
  }

  &__date {
    flex-wrap: wrap;
    font-size: 18px;
    margin-left: auto;
    padding: 10px;
    display: inline-flex;
    width: 80px;
    white-space: nowrap;
    flex-shrink: 0;
    cursor: pointer;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }

  &__dateItem {
    position: relative;

    span {
      width: 22px;
      display: inline-block;
    }
  }

  &__dateTitle {
    opacity: 0.7;
    font-size: 13px;
    padding-bottom: 6px;
    width: 100%;

    @media screen and (max-width: 480px) {
      font-size: 12px;
      padding-bottom: 5px;
    }
  }

  &__band {
    background: rgba(0, 0, 19, 0.8);
    width: 100%;
    height: 50px;
    margin-top: 30px;
    position: relative;
    z-index: 2;
    @media screen and (max-width: 480px) {
      margin-top: 20px;
    }
    @media screen and (max-width: 360px) {
      height: 40px;
      margin-top: 10px;
    }
  }

  &__cvv {
    text-align: right;
    position: relative;
    z-index: 2;
    padding: 15px;

    .card-item__type {
      opacity: 0.7;
    }

    @media screen and (max-width: 360px) {
      padding: 10px 15px;
    }
  }

  &__cvvTitle {
    padding-right: 10px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 5px;
  }

  &__cvvBand {
    height: 45px;
    background: #fff;
    margin-bottom: 30px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
    color: #1a3b5d;
    font-size: 18px;
    border-radius: 4px;
    box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35);

    @media screen and (max-width: 480px) {
      height: 40px;
      margin-bottom: 20px;
    }

    @media screen and (max-width: 360px) {
      margin-bottom: 15px;
    }
  }
}

.card-list {
  margin-bottom: -130px;

  @media screen and (max-width: 480px) {
    margin-bottom: -120px;
  }
}

.card-input {
  margin-bottom: 20px;

  &__label {
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 500;
    color: #1a3b5d;
    width: 100%;
    display: block;
    user-select: none;
  }

  &__input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    box-shadow: none;
    border: 1px solid #ced6e0;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 5px 15px;
    background: none;
    color: #1a3b5d;
    font-family: 'Source Sans Pro', sans-serif;

    &:hover,
    &:focus {
      border-color: #3d9cff;
    }

    &:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }

    &.-select {
      -webkit-appearance: none;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC');
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }
  }
}

.slide-fade-up-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}

.slide-fade-up-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}

.slide-fade-up-enter {
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
}

.slide-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  pointer-events: none;
}

.slide-fade-right-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}

.slide-fade-right-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}

.slide-fade-right-enter {
  opacity: 0;
  transform: translateX(10px) rotate(45deg);
  pointer-events: none;
}

.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateX(-10px) rotate(45deg);
  pointer-events: none;
}

.card-item__name > span {
  display: flex !important;
}
</style>
