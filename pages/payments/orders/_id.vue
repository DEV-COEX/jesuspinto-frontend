<template>
  <div v-if="order" class="w-screen md:h-auto md:my-10 xl:m-0 xl:h-screen change">
    <div
      class="flex flex-col md:justify-center md:items-center w-full h-full gap-6 my-10 md:my-0"
    >
      <div
        v-if="order.purchase"
        class="flex flex-col items-center w-full gap-6"
      >
        <div class="bg-white rounded-xl p-10 w-[90vw] md:w-4/6 lg:w-2/6 shadow-md">
          <label for="" class="justify-start font-bold underline"
            >Detalle de pago</label
          >
          <div
            class="flex flex-col md:flex-wrap justify-between items-center bg-blue-200 p-2 rounded-md mt-3"
          >
            <label for="" class="text-lg text-xl font-bold mr-5"
              >{{ transaction.currency }} - {{ price }}</label
            >
            <label for="" class="text-sm"
              >de {{ transaction.customer_email }}</label
            >
          </div>

          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-lg font-bold mr-5">Estado</label>
            <label
              for=""
              :class="[
                status
                  ? ['bg-green-200', 'text-green-500']
                  : ['bg-red-200', 'text-red-500'],
              ]"
              class="font-semibold p-2 rounded-md"
              >{{ status ? 'Aprovado' : 'Negado' }}</label
            >
          </div>
          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-sm md:text-lg font-bold mr-5"
              >Fecha</label
            >
            <label for="" class="text-sm font-normal p-2 block text-right">{{
              date
            }}</label>
          </div>

          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-sm md:text-lg font-bold mr-5"
              >Medio de pago</label
            >
            <label for="" class="text-sm p-2 font-normal">{{
              transaction.payment_method?.type
            }}</label>
          </div>
          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-sm md:text-lg font-bold mr-5"
              >Referencia</label
            >
            <label
              for=""
              class="text-sm font-normal p-2 block text-right text-ellipsis overflow-hidden"
              >{{ order.purchase.reference }}</label
            >
          </div>
        </div>

        <div class="bg-white rounded-xl p-10 w-[90vw] md:w-4/6 lg:w-2/6 shadow-md">
          <label for="" class="justify-start font-bold underline"
            >Información del comprador</label
          >
          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-sm md:text-lg font-bold mr-5"
              >Email</label
            >
            <label for="" class="text-sm font-normal p-2 block text-right">{{
              transaction.customer_email
            }}</label>
          </div>
          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-sm md:text-lg font-bold mr-5"
              >Nombres y apellidos</label
            >
            <label for="" class="text-sm font-normal p-2 block text-right">{{
              transaction.customer_data?.full_name
            }}</label>
          </div>

          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-sm md:text-lg font-bold mr-5"
              >Número telefónico o celular</label
            >
            <label for="" class="text-sm p-2 font-normal">{{
              transaction.customer_data?.phone_number
            }}</label>
          </div>
          <div class="flex justify-between items-center p-2 border-b-2">
            <label for="" class="text-sm md:text-lg font-bold mr-5"
              >Dirección</label
            >
            <label for="" class="text-sm font-normal p-2 block text-right"
              >{{ order.purchase?.sending_address.address }},
              {{ order.purchase?.sending_address.city.name }}-{{
                order.purchase?.sending_address.city.department.name
              }}</label
            >
          </div>
        </div>
      </div>
      <ButtonComponent
        class="mx-auto focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
        :show="true"
        :title="'Continuar comprando'"
        :type="'button'"
        @accionBoton="$router.push('/')"
      ></ButtonComponent>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {
  PRODUCTION_PRIVATE_API_KEY,
  PRODUCTION_PUBLIC_API_KEY,
  PRODUCTION_URL,
} from '~/plugins/BASE_CONFIG';

export default {
  name: 'OrdersPage',
  data: () => ({
    order: {},
    transaction: {},
    wompi: {},
  }),
  computed: {
    price() {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(this.order.purchase.total_value);
    },
    date() {
      const fecha = new Date(this.order.purchase.date);
      return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(fecha);
    },
    status() {
      if (this.transaction.status === 'APPROVED') {
        return true;
      } else {
        return false;
      }
    },
  },
  beforeMount() {
    this.$axios
      .get(`/api/v1/purchases/${this.$route.params.id}`)
      .then((response) => {
        this.order = response.data;
      });
    this.$axios
      .get(`${PRODUCTION_URL}/merchants/${PRODUCTION_PUBLIC_API_KEY}`)
      .then((response) => {
        this.wompi = response.data.data;
      })
      .then(async () => {
        await axios
          .get(
            `${PRODUCTION_URL}/transactions?reference=${this.$route.params.id}`,
            {
              headers: {
                authorization: 'Bearer ' + PRODUCTION_PRIVATE_API_KEY,
              },
            }
          )
          .then((response) => {
            console.log(response)
            this.transaction = response.data.data[0];
          });
      });
  },
};
</script>

<style scoped>

@media (max-height: 885px ){
  .change{
    padding-top: 44px;
    padding-bottom: 44px;
    height: 100%;
  }
}

</style>
