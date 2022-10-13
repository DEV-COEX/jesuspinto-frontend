<template>
  <div>
    <LoadingComponent v-if="isLoading" />
    <div
      v-else
      class="w-screen h-screen flex items-center justify-center bg-blue-800"
    >
      <div
        class="absolute bottom-0 rounded-t-3xl sm:relative sm:h-fit w-screen p-8 sm:w-80 md:w-80 bg-white sm:rounded-t-3xl md:rounded-3xl flex flex-col items-center"
      >
        <form
          class="flex flex-col justify-center items-center w-full"
          @submit.prevent="onSubmit"
        >
          <img src="../assets/svg/purpleCheck.svg" alt="" />
          <span class="font-bold text-gray-800 my-4"
            >Codigo de verificacion</span
          >
          <span class="text-sm text-gray-600 font-medium text-center my-4"
            >Enviamos un código de verificación a tu número de télefono</span
          >
          <input
            v-model="verificationCode"
            type="text"
            maxlength="4"
            class="h-10 w-1/3 sm:w-28 border-2 font-semibold border-blue-500 focus:border-blue-800 text-center text-blue-800 my-5 rounded-xl bg-blue-200 focus:bg-white focus:outline-none"
            autofocus
          />
          <form @submit.prevent="onResend">
            <button
              :disabled="resend"
              type="submit"
              class="py-2 rounded-xl px-5 text-sm text-blue-700 font-semibold hover:underline"
            >
              Reenviar codigo.
            </button>
          </form>
          <button
            :disabled="verified"
            type="submit"
            :class="
              verified
                ? 'bg-blue-100 text-blue-300 border-2 border-blue-300 ease-in-out duration-75'
                : 'bg-blue-800 border-2 border-white hover:bg-blue-700 ease-in-out duration-75 text-white'
            "
            class="py-2 rounded-xl w-max px-5 my-5"
          >
            Verificar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationView',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified === 1) {
      redirect('/profile');
    }
  },
  data: () => ({
    verificationCode: '',
    resend: false,
    timer: null,
    email: '',
    isLoading: false,
  }),
  computed: {
    user() {
      return this.$auth.user;
    },
    verified() {
      return !(
        this.verificationCode.length > 3 && this.verificationCode.length <= 4
      );
    },
  },
  created() {
    this.onResend();
  },
  methods: {
    clockResend() {
      this.resend = !this.resend;
    },
    async onSubmit() {
      this.isLoading = true;
      try {
        await this.$axios
          .post('/api/auth/verify-code', {
            code: this.verificationCode,
            email: this.user.email,
          })
          .then(async () => {
            await this.$axios.get('api/auth/user').then((response) => {
              this.$auth.setUser(response.data.user);
            });
            await this.$router.push('/');
          });
      } catch (e) {
        this.isLoading = false;
      }
    },
    async onResend() {
      await this.$axios.post('/api/auth/send-code', {
        email: this.user.email,
      });
    },
  },
};
</script>
