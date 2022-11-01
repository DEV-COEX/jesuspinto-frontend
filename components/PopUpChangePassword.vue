<template>
  <div
    class="h-screen w-screen bg-blue-800 fixed top-0 left-0 flex items-center justify-center z-50"
  >
    <div
      class="absolute bottom-0 rounded-t-3xl sm:relative sm:h-fit w-screen p-8 sm:w-96 md:w-96 bg-white border-2 sm:rounded-t-3xl md:rounded-3xl flex flex-col items-center"
    >
      <h1 class="font-semibold text-xl sm:text-lg text-gray-500 py-4">
        Cambiar Contraseña
      </h1>
      <form
        action=""
        class="py-2 flex flex-col items-center"
        @submit.prevent="validate"
      >
        <label class="text-sm flex flex-col font-semibold text-gray-500 w-full"
          >Ingrese su correo electronico
          <input
            v-model="email"
            autofocus
            type="email"
            class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
            placeholder="Correo electronico"
            required
          />
        </label>
        <p class="text-xs font-semibold text-gray-500 py-4">
          Enviaremos un codigo de verificacion para efectuar el cambio de
          contraseña
        </p>
        <div class="flex justify-around w-full">
          <ButtonComponent
            :disabled="disabled"
            :show="true"
            :title="'Enviar'"
            :type="'submit'"
            :class="
              disabled
                ? 'bg-blue-100 text-blue-300 border-blue-400 ease-in-out duration-75'
                : 'bg-blue-800 hover:bg-blue-700 ease-in-out duration-75 text-white'
            "
            class="py-2 rounded-xl w-max px-5 my-5"
          ></ButtonComponent>
          <button
            class="py-2 rounded-xl w-max px-5 my-5 bg-red-600 text-white"
            type="button"
            @click="closePopUp"
          >
            cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUpChangePassword',
  auth: false,
  data() {
    return {
      email: '',
      isClose: 0,
    };
  },
  computed: {
    disabled() {
      return !(this.email.length > 0);
    },
  },
  methods: {
    async onSubmit() {
      await this.$axios
        .post('api/auth/send-code', {
          email: this.email,
        })
        .then(() => {
          this.$store.commit('getEmailUser', this.email)
          this.$router.push('/verification');
        });
    },
    closePopUp() {
      this.$emit('closePopUpChild', {
        close: this.isClose,
      });
    },
    validate() {
      if (/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/.test(this.email)) {
        if (/^\w+@yopmail+\.[a-zA-Z]+/.test(this.email)) {
          this.invalidEmail = !this.invalidEmail;
        } else {
          this.onSubmit();
        }
      }
    },
  },
};
</script>
