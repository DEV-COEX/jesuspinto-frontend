<template>
  <div
    class="flex flex-col w-full sm:pt-15 pt-10 sm:pl-20 pl-5 sm:pr-20 pr-5 items-center"
  >
    <div class="flex flex-col w-full">
      <h1 class="text-black font-bold text-xl mb-4">Direcciones</h1>
      <hr class="border-black"/>
    </div>
    <section
      id="address"
      class="flex flex-col bg-white rounded-xl w-full lg:w-1/2 justify-center sm:p-10 p-3 m-10 ease-in-out transition-all duration-200"
    >
      <template v-if="addresses.length > 0">
        <AddressComponent
          v-for="dir in addresses"
          :key="dir.id"
          class="bg-white"
          :dir="dir"
          :departments="departments"
          :user="Currentaddress"
          @delete="deleteAddress"
          @list="listAddresses"
        />
      </template>
      <span v-else class="text-center font-bold text-gray-700">
        Aun no tienes direcciones agregadas
      </span>
      <hr class="my-5 z-30"/>
      <button
        v-if="!showForm"
        type="button"
        class="text-white bg-blue-600 hover:bg-blue-700 ease-in-out duration-200 py-3 z-30 rounded-xl"
        @click="showFormAdd"
      >
        Agregar direccion
      </button>
      <Transition name="slide">
        <div v-if="showForm" class="mt-5 w-full z-0">
          <form action="" @submit.prevent="addAddress">
            <label
              class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
            >Direccion
              <input
                v-model="address"
                type="text"
                class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
                placeholder="Ingrese una direccion"
                required
              />
            </label>
            <div class="flex flex-col w-full my-2">
              <label
                for="departments"
                class="text-sm font-semibold text-gray-600"
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
                <option
                  v-for="data in departments"
                  :key="data.id"
                  :value="data.id"
                >
                  {{ data.name }}
                </option>
              </select>
            </div>
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
            <div class="flex flex-col md:flex-row w-full mt-9 items-center">
              <ButtonComponent
                :show="true"
                :title="'Guardar cambios'"
                :type="'submit'"
                class="bg-blue-600 border-2 border-white hover:bg-blue-700 ease-in-out duration-200 text-white py-2 rounded-xl w-full md:w-1/2 px-5 md:mr-1 mb-1 md:mb-0"
              ></ButtonComponent>
              <button
                v-if="showForm"
                type="button"
                class="text-white z-30 py-2 bg-red-600 rounded-xl hover:bg-red-700 hover:font-bold ease-in-out duration-200 w-full md:w-1/2 md:ml-1 mt-2 md:mt-0"
                @click="showFormAdd"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </section>
    <LoadingComponent v-if="isLoading"/>
  </div>
</template>

<script>
export default {
  name: 'AddressView',
  layout: 'SlimLayout',
  middleware({store, redirect}) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
  },
  data: () => ({
    address: '',
    showForm: false,
    departments: [],
    department: 0,
    cities: [],
    city: 0,
    user_id: 0,
    addresses: [],
    isLoading: false,
  }),
  computed: {
    Currentaddress() {
      return this.$auth.user;
    },
  },
  mounted() {
    this.person_id = this.$auth.user.person.id;
    this.user_id = this.$auth.user.id;
    this.funInitial();
  },
  methods: {
    async funInitial() {
      await this.listAddresses();
      await this.listDepartments();
    },
    showFormAdd() {
      this.showForm = !this.showForm;
    },
    async listAddresses() {
      try {
        await this.$axios
          .get(`/api/v1/sending-address/list?user_id=${parseInt(this.user_id)}`)
          .then((response) => {
            this.addresses = response.data.address;
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
    async addAddress() {
      try {
        if (this.city === 0) {
          this.$notify({
            title: 'Advertencia',
            type: 'warn',
            text: 'Debe seleccionar una ciudad',
          });
        } else {
          const payload = {
            address: this.address,
            person_id: parseInt(this.person_id),
            city_id: this.city,
          };
          await this.$axios.post('/api/v1/sending-address/', payload);
          this.$notify({
            title: 'Registro exitoso',
            type: 'success',
            text: 'Dirección registrada correctamente!',
          });
          this.showForm = !this.showForm;
          await this.listAddresses();
        }
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        });
        this.isLoading = false;
      }
    },
    async deleteAddress(id) {
      try {
        await this.$axios.delete(`/api/v1/address/${id}`);
        this.$notify({
          title: 'Eliminacion exitoso',
          type: 'success',
          text: 'Dirección eliminada correctamente!',
        });
        await this.listAddresses();
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        });
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-30%);
  transition: all 200ms ease-in 0s;
}
</style>
