<template>
  <div class="w-full">
    <div class="flex justify-between mt-4">
      <section class="w-96">
        <div class="flex items-center">
          <span class="text-blue-500 sm:flex hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
              />
            </svg>
          </span>
          <span class="text-blue-500 sm:ml-5 ml-0 sm:mt-0 mt-5">{{
            staticAddress
          }}</span>
        </div>
        <section class="text-black my-2">
          <span class="block"
            >{{ dir.city.name }} - {{ dir.city.department.name }}</span
          >
          <span class="block text-sm"
            >{{ user.person.name }} - {{ user.person.phone }}</span
          >
        </section>
      </section>

      <div class="relative" @click="toggleOptions">
        <button type="button" class="text-blue-500 content-start self-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
        </button>
        <div
          v-show="isShow"
          class="border-blue-100 border-2 z-50 absolute lg:top-[-10px] lg:left-[20px] sm:top-[-10px] sm:right-[20px] top-[-10px] right-[25px] bg-white rounded-md shadow-xl w-36"
        >
          <ul
            class="h-full text-sm dark:text-gray-200"
            aria-labelledby="dropdownRightButton"
          >
            <li
              class="rounded-t-md block px-4 py-2 hover:bg-blue-300"
              @click="showEditForm"
            >
              Editar
            </li>
            <hr />
            <li
              class="rounded-b-md block px-4 py-2 hover:bg-blue-300"
              @click="deleteAddress"
            >
              Eliminar
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="editar" class="flex flex-col justify-center">
      <button
        v-if="showFormEdit"
        type="button"
        class="text-blue-500 z-30 bg-white"
        @click="showEditForm"
      >
        Cancelar
      </button>

      <Transition name="slide">
        <div v-if="showFormEdit" class="mt-5 w-full z-ekisde">
          <form action="" @submit.prevent="updateAddress(dirEdit.id)">
            <label
              class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
              >Direccion
              <input
                v-model="dirEdit.address"
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
                v-model="dirEdit.city.department.id"
                class="border-gray-300 border-2 bg-white text-sm text-gray-600 font-medium focus:outline-none focus:border-blue-800 rounded-lg block p-2"
                name="departments"
                @change="listCities(true)"
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
                v-model="dirEdit.city.id"
                class="border-gray-300 border-2 bg-white font-medium text-sm text-gray-600 focus:outline-none focus:border-blue-800 rounded-lg block p-2"
                name="cities"
              >
                <option value="0" disabled>Seleccione una ciudad</option>
                <option v-for="data in cities" :key="data.id" :value="data.id">
                  {{ data.name }}
                </option>
              </select>
            </div>
            <div class="flex flex-col w-full mt-9 items-center">
              <ButtonComponent
                :show="true"
                :title="'Agregar'"
                :type="'submit'"
               
              ></ButtonComponent>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressComponent',
  props: {
    departments: {
      type: Array,
      required: false,
      default: () => [],
    },
    dir: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isShow: false,
      showFormEdit: false,
      cities: [],
      staticAddress: '',
      dirEdit: {
        id: '',
        address: '',
        user_id: '',
        city_id: '',
        city: {
          id: '',
          name: '',
          department_id: '',
          department: {
            id: '',
            name: '',
          },
        },
      },
    };
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeOptions);
  },
  mounted() {
    document.addEventListener('click', this.closeOptions);
    this.dirEdit = this.dir;
    this.staticAddress = this.dir.address;
    this.listCities(false);
  },
  methods: {
    async listCities(e) {
      if (e) {
        const { data } = await this.$axios.get('/api/v1/location/cities', {
          params: {
            department_id: this.dirEdit.city.department.id,
          },
        });
        this.cities = data.cities;
        this.dirEdit.city.id = 0;
      } else {
        const { data } = await this.$axios.get('/api/v1/location/cities', {
          params: {
            department_id: this.dirEdit.city.department.id,
          },
        });
        this.cities = data.cities;
      }
    },
    showEditForm() {
      this.showFormEdit = !this.showFormEdit;
    },
    deleteAddress() {
      this.$emit('delete', this.dir.id);
    },
    async updateAddress(id) {
      try {
        if (this.dirEdit.city.id === 0) {
          this.$notify({
            title: 'Advertencia',
            type: 'warn',
            text: 'Debe seleccionar una ciudad',
          });
        } else if (this.dirEdit.address === this.staticAddress) {
          this.$notify({
            title: 'Advertencia',
            type: 'warn',
            text: 'Debe ingresar una direccion diferente a la anterior',
          });
        } else {
          const payload = {
            address: this.dirEdit.address,
            user_id: this.dirEdit.user_id,
            city_id: this.dirEdit.city.id,
          };
          await this.$axios.put(`/api/user/${id}`, payload);
          this.$notify({
            title: 'Actualización exitosa',
            type: 'success',
            text: 'Dirección actualizada correctamente!',
          });
          await this.listAddresses();
          this.staticAddress = this.dir.address;
          this.showEditForm();
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
    toggleOptions(e) {
      this.isShow = !this.isShow;
    },
    closeOptions(e) {
      if (!this.$el.contains(e.target)) {
        this.isShow = false;
      }
    },
    listAddresses() {
      this.$emit('list');
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

.z-ekisde {
  z-index: 0 !important;
}
</style>
