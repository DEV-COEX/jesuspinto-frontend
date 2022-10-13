<template>
  <div
    class="flex flex-col bg-white px-6 py-6 md:px-8 md:py-7 xl:px-16 xl:py-10 justify-center rounded-xl"
  >
    <div>
      <h1 class="font-bold text-xl py-2">Información de pago</h1>
      <hr class="border border-black" />
    </div>
    <div class="flex flex-col items-center h-full">
      <div class="pt-5">
        <ButtonComponent
          :class="
            card === true && activeCard === true
              ? 'bg-blue-700 hover:bg-blue-800 text-white'
              : 'border-blue-300 bg-opacity-25 text-blue-700 bg-blue-200 hover:bg-blue-300'
          "
          class="focus:outline-none border-2 focus:ring-4 focus:ring-blue-300 ease-in-out font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
          :title="'Tarjeta Débito/Crédito'"
          :show="true"
          @accionBoton="changePse"
        />
        <ButtonComponent
          :class="
            pse === true && activePse === true
              ? 'bg-blue-700 hover:bg-blue-800 text-white'
              : 'border-blue-300 bg-opacity-25 text-blue-700 bg-blue-200 hover:bg-blue-300'
          "
          class="focus:outline-none border-2 focus:ring-4 focus:ring-blue-300 ease-in-out font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
          :title="'PSE'"
          :show="true"
          @accionBoton="changeCard"
        />
      </div>
      <form class="w-full" @submit.prevent="onPayment">
        <div v-if="pse" class="w-full">
          <div class="flex flex-col w-full mb-2">
            <label for="financial">Entidad Bancaria</label>
            <select
              id="financial"
              v-model="financialCode"
              required
              class="rounded-lg w-full"
            >
              <option value="">Seleccione una opción</option>
              <option
                v-for="financial in financialInstitutions"
                :key="financial.financial_institution_code"
                :value="financial.financial_institution_code"
              >
                {{ financial.financial_institution_name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col w-full mb-2">
            <label for="user_type">Seleccione el tipo de persona</label>
            <select v-model="userType" required class="w-full rounded-lg">
              <option value="">Seleccione una opción</option>
              <option value="1">Persona Juridica</option>
              <option value="0">Persona Natural</option>
            </select>
          </div>
          <div class="flex flex-col w-full mb-2">
            <label for="document_type"> Seleccione el tipo de documento </label>
            <select v-model="documentType" required class="w-full rounded-lg">
              <option value="">Seleccione una opción</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="NIT">NIT</option>
            </select>
          </div>
          <div class="flex flex-col w-full mb-2">
            <label for="document">Número de documento</label>
            <input
              v-model="documentNumber"
              type="text"
              class="w-full rounded-lg"
              placeholder="Ingrese el número de documento"
              required
            />
          </div>
        </div>
        <div v-if="card" class="w-full">
          <div v-if="withNewCard === false">
            <div v-for="(creditCard, i) in cards" :key="i">
              <input
                id="card"
                class="checked:bg-blue-800 rounded-sm"
                type="checkbox"
                :value="creditCard.token"
                required
                @input="$emit('token', $event.target.value)"
              />
              <label for="card">{{ creditCard.name }}</label>
            </div>
            <button
              class="italic block mx-auto px-5 py-2 rounded-lg border my-5 ease-in-out duration-200"
              @click="$emit('withNewCard', true)"
            >
              Agregar una tarjeta
            </button>
          </div>
        </div>
        <div
          v-if="withNewCard === true"
          class="flex flex-col items-start w-full"
        >
          <div
            class="flex md:flex-row flex-col lg:flex-col xl:flex-row items-start w-full"
          >
            <div class="flex flex-col p-2 md:mb-2 lg:mb-0 xl:mb-2 w-full">
              <label for="name">Nombre</label>
              <input
                id="name"
                v-model="name"
                type="text"
                class="border outline-none border-gray-400 rounded-lg px-2"
                placeholder="Nombre"
              />
            </div>
            <div class="flex flex-col p-2 md:mb-2 lg:mb-0 xl:mb-2 w-full">
              <label for="lastname">Apellido</label>
              <input
                id="lastname"
                v-model="lastname"
                type="text"
                class="border outline-none border-gray-400 rounded-lg px-2"
                placeholder="Apellido"
              />
            </div>
          </div>
          <div
            class="flex md:flex-row flex-col lg:flex-col xl:flex-row items-start w-full"
          >
            <div class="flex flex-col p-2 md:mb-2 lg:mb-0 xl:mb-2 w-full">
              <label for="nit">Nit/CC</label>
              <input
                id="nit"
                v-model="nit"
                type="text"
                class="border outline-none border-gray-400 rounded-lg px-2"
                placeholder="Identificación"
              />
            </div>
            <div class="flex flex-col p-2 w-full">
              <label for="card-number">Número de la tarjeta</label>
              <input
                id="card-number"
                v-model="cardNumber"
                oninput="this.value = this.value.slice(0, this.maxLength)"
                type="number"
                maxlength="16"
                class="border outline-none border-gray-400 rounded-lg px-2"
                placeholder="Número de la tarjeta"
                @input="$emit('card-number', $event.target.value)"
              />
            </div>
          </div>
          <div class="w-full flex">
            <div class="flex flex-col p-2 md:mb-2 lg:mb-0 xl:mb-2 w-1/3">
              <label for="cvc">C.V.C</label>
              <input
                id="cvc"
                v-model="cvc"
                type="number"
                oninput="this.value = this.value.slice(0, 3)"
                class="w-[70px] sm:w-24 md:w-32 lg:w-full xl:w-full border outline-none border-gray-400 rounded-lg px-2 w-full"
                placeholder="C.V.C"
              />
            </div>
            <div class="flex flex-col p-2 w-1/3">
              <label for="month">Mes</label>
              <select id="month" v-model="monthValue" class="rounded-lg">
                <option v-for="i in 12" :key="i">
                  {{ month(i) }}
                </option>
              </select>
            </div>
            <div class="flex flex-col p-2 w-1/3">
              <label for="year">Año</label>
              <input
                id="year"
                v-model="year"
                type="number"
                oninput="this.value = this.value.slice(0, 2)"
                class="w-[70px] sm:w-24 md:w-32 lg:w-full xl:w-full border outline-none border-gray-400 rounded-lg px-2"
                placeholder="Año"
              />
            </div>
          </div>
          <div class="flex mb-4">
            <input
              id="saveCard"
              v-model="saveCard"
              type="checkbox"
              class="checked:bg-blue-700 checked:border-transparent mr-2 focus:bg-blue-800 rounded-md"
              @input="$emit('saveCard', !saveCard)"
            />
            <label for="saveCard">Guardar información de tarjeta</label>
          </div>
        </div>
        <div class="w-full flex flex-col md:flex-row">
          <ButtonComponent
            :class="withNewCard === true ? 'w-full md:w-1/2' : 'w-full'"
            class="w-full focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2 md:mb-0"
            :title="'Pagar'"
            :show="true"
            :type="'submit'"
          />
          <button
            v-if="withNewCard === true"
            type="button"
            class="text-white z-30 py-2 bg-red-600 rounded-xl hover:bg-red-700 hover:font-bold ease-in-out duration-200 w-full md:w-1/2 md:ml-1 mt-2 md:mt-0"
            @click="$emit('close')"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderInfoComponent',
  props: {
    withNewCard: {
      type: Boolean,
      default: false,
    },
    financialInstitutions: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    card: true,
    pse: false,
    activeCard: true,
    activePse: false,
    saveCard: false,
    maxLength: 16,
    cardNumber: '',
    nit: '',
    name: '',
    lastname: '',
    cvcValue: '',
    monthValue: '',
    yearValue: '',
    financialCode: '',
    userType: '',
    documentNumber: '',
    documentType: '',
  }),
  computed: {
    cvc: {
      get() {
        return this.cvcValue;
      },
      set(val) {
        this.cvcValue = val;
      },
    },
    year: {
      get() {
        return this.yearValue;
      },
      set(val) {
        this.yearValue = val;
      },
    },
    cards() {
      return this.$store.state.cart.cards;
    },
  },
  beforeCreate() {
    this.$store.dispatch('cart/getPaymentsCards', this.$auth.user.person_id);
  },
  methods: {
    month(value) {
      if (value < 10) {
        return `0${value}`;
      } else {
        return value;
      }
    },
    changeCard() {
      this.pse = true;
      this.card = false;
      this.activePse = true;
      this.activeCard = false;
      this.$emit('withNewCard', false);
    },
    changePse() {
      this.pse = false;
      this.card = true;
      this.activePse = false;
      this.activeCard = true;
      this.$emit('withNewCard', false);
    },
    onPayment() {
      if (this.card === true) {
        this.$emit('onPayment', {
          method: 'card',
          saveCard: this.saveCard,
          cvc: this.cvc,
          month: this.monthValue,
          year: this.yearValue,
          cardNumber: this.cardNumber,
          nit: this.nit,
          name: this.name,
          lastname: this.lastname,
        });
      } else if (this.pse === true) {
        this.$emit('onPayment', {
          method: 'pse',
          saveCard: false,
          cvc: null,
          month: null,
          year: null,
          documentNumber: this.documentNumber,
          documentType: this.documentType,
          financialCode: this.financialCode,
          userType: parseInt(this.userType),
        });
      } else {
        this.$emit('onPayment', {
          method: 'card',
          saveCard: this.saveCard,
          cvc: this.cvc,
          month: this.monthValue,
          year: this.yearValue,
          cardNumber: this.cardNumber,
          nit: this.nit,
          name: this.name,
          lastname: this.lastname,
        });
      }
    },
  },
};
</script>
