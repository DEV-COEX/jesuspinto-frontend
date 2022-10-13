<template>
  <div>
    <LoadingComponent v-if="isLoading" />
    <div class="w-screen h-screen flex items-center justify-center bg-blue-800">
      <div
        class="absolute bottom-0 h-4/6 sm:relative hiddeScrollBar overflow-y-scroll w-screen p-8 sm:w-80 md:w-80 bg-white rounded-t-3xl sm:rounded-3xl flex flex-col items-center"
      >
        <form
          class="flex flex-col justify-center items-center w-full"
          @submit.prevent="onSubmit"
        >
          <label
            class="flex flex-col text-sm font-semibold text-gray-600 w-full mt-5 mb-2"
            >Nombres
            <input
              v-model="name"
              type="text"
              class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
              placeholder="Ingrese su nombre"
              required
            />
          </label>
          <label
            class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
            >Apellidos
            <input
              v-model="lastname"
              type="text"
              class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
              placeholder="Ingrese su apellido"
              required
            />
          </label>
          <label
            class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
            >Cedula
            <input
              v-model="nit"
              type="number"
              class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
              placeholder="Ingrese su cedula"
              required
            />
          </label>
          <label
            class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
            >Email
            <input
              v-model="email"
              type="email"
              class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
              placeholder="Ingrese su correo electronico"
              required
            />
          </label>
          <label
            class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
            >Telefono
            <input
              v-model="phone"
              type="number"
              class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
              placeholder="Ingrese un numero de telefono"
              required
            />
          </label>
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
          <label
            class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
          >
            <span>Contraseña</span>
            <input
              v-model="password"
              type="password"
              class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
              placeholder="Contraseña"
              required
            />
          </label>
          <span
            v-if="validPass"
            class="text-xs font-medium text-red-600 text-center"
            >La contraseña debe ser de al menos 6 caracteres</span
          >
          <label
            class="flex flex-col text-sm font-semibold text-gray-600 w-full my-2"
          >
            <span>Confirmar Contraseña</span>
            <input
              v-model="confirmation"
              type="password"
              class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
              placeholder="Contraseña"
              required
            />
          </label>
          <span
            v-if="!confirmationPass"
            class="text-xs font-medium text-red-600 text-center mb-2"
            >Las contraseñas no concuerdan</span
          >
          <ButtonComponent
            :disabled="disabled"
            :show="true"
            :title="'Registrarse'"
            :type="'submit'"
            :class="
              disabled
                ? 'bg-blue-100 text-blue-300 border-2 border-blue-300 ease-in-out duration-75'
                : 'bg-blue-800 border-2 border-white hover:bg-blue-700 ease-in-out duration-75 text-white'
            "
            class="py-2 rounded-xl w-max px-5 my-5"
          ></ButtonComponent>

          <span class="text-xs font-normal my-4 text-gray-500"
            >Ya tengo una cuenta,<nuxt-link
              class="text-blue-800 my-3 font-semibold underline ml-1"
              to="/login"
              >Iniciar Sesion</nuxt-link
            >
          </span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue';

export default {
  name: 'RegisterView',
  components: { ButtonComponent },
  layout: 'blank',
  auth: 'guest',
  data: () => ({
    email: '',
    password: '',
    confirmation: '',
    name: '',
    lastname: '',
    phone: '',
    address: '',
    city: 0,
    nit: '',
    error: null,
    departments: [],
    department: 0,
    cities: [],
    user: [],
    isLoading: false,
  }),
  computed: {
    disabled() {
      return !(this.email.length > 0 && this.password.length > 0);
    },
    confirmationPass() {
      return this.password === this.confirmation;
    },
    validPass() {
      return this.password.length === 0
        ? false
        : this.password.length < 6
        ? true
        : !(this.password.length > 6);
    },
  },
  created() {
    this.listDepartments();
  },
  methods: {
    async listDepartments() {
      const { data } = await this.$axios.get('/api/v1/location/departments');
      this.departments = data.departments;
    },
    async listCities() {
      const { data } = await this.$axios.get('/api/v1/location/cities', {
        params: {
          department_id: this.department,
        },
      });
      this.cities = data.cities;
    },
    async onSubmit() {
      this.isLoading = true;
      try {
        const payload = {
          name: this.name,
          lastname: this.lastname,
          nit: this.nit,
          phone: this.phone,
          address: this.address,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmation,
          city_id: this.city,
        };
        const { data } = await this.$axios.post('/api/auth/register', payload);
        this.user = data;
        this.$notify({
          title: 'Registro exitoso',
          type: 'success',
          text: 'Se ha registrado correctamente',
        });
        await this.$router.push('/login');
        this.$root.$emit('Email', this.email);
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
