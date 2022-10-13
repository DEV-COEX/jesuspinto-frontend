<template>
  <div
    class="flex flex-col w-full sm:pt-15 pt-10 sm:pl-20 pl-5 sm:pr-20 pr-5 items-center"
  >
    <div class="flex flex-col w-full">
      <h1 class="text-black font-bold text-xl mb-4">Cambiar Contraseña</h1>
      <hr class="border bg-gray-400 border-gray-400" />
    </div>

    <form @submit.prevent="changePassword">
      <div
        class="flex flex-col bg-white rounded-xl w-full p-3 justify-center sm:p-10 mt-10 mb-10"
      >
        <div class="flex flex-col">
          <div class="block w-full">
            <div class="flex flex-col">
              <label for="">Contraseña actual</label>
              <input
                v-model="old_password"
                type="password"
                class="rounded-xl border-gray-300 focus:outline-none focus:border-gray-600"
                placeholder="Contraseña actual"
                min="6"
              />
            </div>

            <div class="flex flex-col pt-5">
              <label for="">Nueva contraseña</label>
              <input
                v-model="new_password"
                type="password"
                class="rounded-xl border-gray-300 focus:outline-none focus:border-gray-600"
                placeholder="Nueva contraseña"
                min="6"
              />
            </div>
            <div class="flex flex-col pt-5">
              <label for="">Confirmar nueva contraseña</label>
              <input
                v-model="new_password_confirmation"
                type="password"
                class="rounded-xl border-gray-300 focus:outline-none focus:border-gray-600"
                placeholder="Confirmar contraseña"
                min="6"
              />
            </div>
            <div class="flex mt-5">
              <ButtonComponent
                class="mt-4 mr-3 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
                :type="'submit'"
                :show="true"
                :title="'Cambiar contraseña'"
              ></ButtonComponent>

              <ButtonComponent
                class="mt-4 focus:outline-none border-2 border-blue-400 text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
                :type="'button'"
                :show="true"
                :title="'Cancelar'"
              ></ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ChangePasswordView',
  layout: 'SlimLayout',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
  },
  data: () => ({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
    success: [],
  }),
  methods: {
    async changePassword() {
      const payload = {
        old_password: this.old_password,
        new_password: this.new_password,
        new_password_confirmation: this.new_password_confirmation,
      };
      const { data } = await this.$axios.put(
        '/api/auth/change-password-auth',
        payload
      );
      this.success = data;
      if (this.success.success === false) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: this.success.message || 'Error desconocido',
        });
        this.isLoading = false;
        this.old_password = '';
        this.new_password = '';
        this.new_password_confirmation = '';
      } else {
        this.$notify({
          title: 'Actualización exitosa!',
          type: 'success',
          text: this.success.message,
        });
        this.old_password = '';
        this.new_password = '';
        this.new_password_confirmation = '';
        this.$router.push('/profile');
      }
    },
  },
};
</script>

<style scoped></style>
