<template>
  <div class="flex flex-col rounded-xl p-8 bg-white shadow">
    <div class="contents py-10">
      <h2 class="text-xl font-bold py-2">Datos de entrega</h2>
      <hr class="bg-gray-400 border-gray-400 rounded-full"/>
    </div>
    <form
      v-if="isAdding"
      class="flex flex-col sm:flex-row sm:flex-wrap sm:justify-around p-5 font-semibold"
      @submit.p.prevent="saveAddress"
    >
      <div class="sm:basis-1/2 sm:w-6/12 sm:pr-2">
        <label
          class="flex flex-col text-sm font-semibold text-gray-600 w-full mt-5 sm:mt-2 mb-2"
        >Nombres
          <input
            v-model="name"
            type="text"
            class="border border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
            placeholder="Ingrese su nombre"
            required
          />
        </label>
      </div>
      <div class="sm:basis-1/2 sm:w-6/12 sm:pl-2">
        <label
          class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
        >Apellidos
          <input
            v-model="lastname"
            type="text"
            class="border border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
            placeholder="Ingrese su apellido"
            required
          />
        </label>
      </div>
      <div class="sm:basis-1/2 sm:w-6/12 sm:pr-2">
        <label
          class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
        >Telefono
          <input
            v-model="phone"
            type="number"
            class="border border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
            placeholder="Ingrese un numero de telefono"
            required
          />
        </label>
      </div>
      <div class="sm:basis-1/2 sm:w-6/12 sm:pl-2">
        <label
          class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
        >Direccion
          <input
            v-model="address"
            type="text"
            class="border border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
            placeholder="Ingrese una direccion"
            required
          />
        </label>
      </div>
      <div class="sm:basis-1/2 sm:w-6/12 sm:pr-2">
        <div class="flex flex-col w-full my-2">
          <label for="departments" class="text-sm font-semibold text-gray-600"
          >Departamento</label
          >
          <select
            id="departments"
            v-model="department"
            class="border-gray-300 border-2 bg-white text-sm text-gray-600 font-medium focus:outline-none focus:border-blue-800 rounded-lg block p-2"
            name="departments"
            @change="listCities()"
          >
            <option value="0" disabled>Seleccione un departamento</option>
            <option v-for="data in departments" :key="data.id" :value="data.id">
              {{ data.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="sm:basis-1/2 sm:w-6/12 sm:pl-2">
        <div class="flex flex-col w-full my-2">
          <label for="cities" class="text-sm font-semibold text-gray-600"
          >Ciudad</label
          >
          <select
            id="cities"
            v-model="city"
            class="border-gray-300 border-2 bg-white font-medium text-sm text-gray-600 focus:outline-none focus:border-blue-800 rounded-lg block p-2"
            name="cities"
          >
            <option value="0" disabled>Seleccione una ciudad</option>
            <option v-for="data in cities" :key="data.id" :value="data.id">
              {{ data.name }}
            </option>
          </select>
        </div>
      </div>
    </form>
    <div v-else class="mt-3">
      <div v-if="addresses.length > 0">
        <div
          v-for="(dir, i) in addresses"
          :key="i"
          class="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700 mb-3"
        >
          <input
            type="radio"
            :value="dir.id"
            name="bordered-radio"
            class="w-4 h-4 text-blue-600 bg-blue-100 checked:bg-blue-600 focus:bg-blue|-800 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            @click="showValue"
          />
          <label
            for="bordered-radio-2"
            class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <span>
              {{ dir.address }}
            </span>
            <span> {{ dir.city.department.name }} - {{ dir.city.name }} </span>
          </label>
        </div>
      </div>
      <div v-else>
        <div v-if="addressesEmpty === 2">
          <span
            class="animate-pulse my-3 h-12 border shadow-xl flex w-full items-center rounded-lg"
          >
            <span class="w-1/12 h-2 bg-blue-500 rounded-lg ml-4"></span>
            <span class="w-4/6 h-2 bg-blue-500 rounded-lg ml-4"></span>
          </span>
        </div>
        <div v-else-if="addressesEmpty === 1">
          <p class="my-4 text-center text-gray-600">
            No hay direcciones registradas
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button-component title="Agregar direccion"  @accionBoton="$router.push('/profile/address')"></button-component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliveryDataComponent',
  data: () => ({
    name: '',
    lastname: '',
    phone: '',
    address: '',
    city: 0,
    error: null,
    departments: [],
    department: 0,
    cities: [],
    checked: false,
    isAdding: false,
    addressesEmpty: 0,
    addresses: [],
  }),
  computed: {
    disabled() {
      return this.address.length > 0;
    },
    user() {
      return this.$auth.user;
    },
  },
  created() {
    this.$store.commit('cart/setSelectedAddress', false);
  },
  async mounted() {
    await this.listAddresses();
    await this.listDepartments();
  },
  methods: {
    isChecked() {
      this.checked = !this.checked;
    },
    async listAddresses() {
      try {
        this.adressesEmpty = 2;
        await this.$axios
          .get(`/api/v1/sending-address/list?user_id=${parseInt(this.user.id)}`)
          .then((response) => {
            this.addresses = response.data.address;
            this.addresses.length === 0
              ? (this.addressesEmpty = 1)
              : (this.addressesEmpty = 0);
          });
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        });
        this.isLoading = false;
      }
    },
    showValue(e) {
      this.$store.commit('cart/setCurrentAddress', e.target.value);
      this.$store.commit('cart/setSelectedAddress', true);
    },
    async listDepartments() {
      const {data} = await this.$axios.get('/api/v1/location/departments');
      this.departments = data.departments;
    },
    async listCities() {
      const {data} = await this.$axios.get('/api/v1/location/cities', {
        params: {
          department_id: this.department,
        },
      });
      this.cities = data.cities;
    },
    async saveAddress() {
      await this.$axios
        .post('api/v1/sending-address', {
          person_id: this.user.person.id,
          address: this.address,
          city_id: this.city,
        })
        .then((response) => {
          this.$notify({
            title: 'Exito',
            type: 'success',
            text: 'Direccion agregada',
          });
          this.isAdding = false;
          this.listAddresses();
        })
        .catch((error) => {
          this.$notify({
            title: 'Error',
            type: 'error',
            text: error?.response?.data?.error || 'Error desconocido',
          });
        });
    },
  },
};
</script>

<style scoped></style>
