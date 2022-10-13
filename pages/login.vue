<template>
  <div class="w-screen h-screen flex items-center justify-center bg-blue-800">
    <LoadingComponent v-if="isLoading"/>
    <div
      v-else
      class="absolute bottom-0 rounded-t-3xl sm:relative sm:h-fit w-screen p-8 sm:w-80 md:w-80 bg-white sm:rounded-t-3xl md:rounded-3xl flex flex-col items-center"
    >
      <form
        class="flex flex-col justify-center items-center w-full"
        @submit.prevent="onSubmit"
      >
        <label class="text-sm flex flex-col font-semibold text-gray-600 w-full"
        >Usuario
          <input
            v-model="email"
            type="email"
            class="border-2 border-gray-300 focus:outline-none focus:border-blue-800 rounded-lg p-2"
            placeholder="Correo electronico"
            required
          />
        </label>
        <label
          class="text-sm flex flex-col py-4 font-semibold text-gray-600 w-full"
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
        <div class="w-full text-center my-3">
          <button
            id="rememberMe"
            type="button"
            :class="[checked ? 'bg-blue-800 text-white' : 'text-gray-400']"
            class="w-5 h-5 rounded border-2 border-gray-400 mr-2"
            @click="isChecked"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check-lg"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
              />
            </svg>
          </button>
          <label
            for="rememberMe"
            class="font-medium text-center text-gray-500 my-5"
          >
            Recordar Contraseña</label
          >
        </div>
        <p
          class="text-blue-800 text-center w-full underline my-4 font-semibold text-sm hover:cursor-pointer"
        >
          Olvide mi contraseña
        </p>
        <button
          :disabled="disabled"
          :class="
            disabled
              ? 'bg-blue-100 text-blue-300 border-2 border-blue-300 ease-in-out duration-75'
              : 'bg-blue-800 border-2 border-white hover:bg-blue-700 ease-in-out duration-75 text-white'
          "
          class="py-2 rounded-xl w-max px-5 my-5"
        >
          Iniciar Sesion
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  layout: 'blank',
  data: () => ({
    email: '',
    password: '',
    error: null,
    checked: false,
    isLoading: false,
  }),
  computed: {
    disabled() {
      return !(this.email.length > 0 && this.password.length > 0)
    },
  },
  methods: {
    isChecked() {
      this.checked = !this.checked
    },
    async onSubmit() {
      this.isLoading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        }).then(() => {
          this.$router.push('/')
        })
      } catch (error) {
        this.isLoading = false
        await this.$router.push('/login')
        this.error = error
      }
    },
  },
}
</script>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}
</style>
