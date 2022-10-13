<template>
  <div
    class="flex flex-col w-full sm:pt-15 pt-10 sm:pl-20 pl-5 sm:pr-20 pr-5 items-center"
  >
    <LoadingComponent v-if="isLoading" />
    <div class="flex flex-col w-full">
      <h1 class="text-black font-bold text-xl mb-4">Modificar e-mail</h1>
      <hr class="border bg-gray-400 border-gray-400" />
    </div>

    <form @submit.prevent="changeEmail">
      <div
        class="flex flex-col bg-white rounded-xl w-full p-4 justify-center sm:p-10 mt-10 mb-10"
      >
        <div class="flex flex-col">
          <div class="block w-full">
            <div class="flex flex-col">
              <div><label for="">Ingresa tu e-mail</label></div>
              <div class="">
                <input
                  v-model="new_email"
                  type="email"
                  required
                  class="rounded-xl focus:outline-none focus:border-gray-600 outline-none w-full"
                  placeholder="Email"
                />
              </div>
              <div>
                <span class="font-light text-gray-400 text-xs p-2"
                  >Despues de esta acción tendra que validar de nuevo el
                  correo</span
                >
              </div>
            </div>

            <div class="flex justify-center">
              <ButtonComponent
                class="mt-4 mr-3 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
                :show="true"
                :type="'submit'"
                :title="'Cambiar email'"
              ></ButtonComponent>

              <ButtonComponent
                class="mt-4 focus:outline-none border-2 border-blue-400 text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
                :type="'button'"
                :show="true"
                :title="'Cancelar'"
                @accionBoton="cancelar"
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
  name: 'ChangeEmailView',
  layout: 'SlimLayout',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
  },
  data: () => ({
    new_email: '',
    isLoading: false,
  }),
  computed: {
    idUser() {
      return this.$auth.user.id;
    },
  },
  methods: {
    cancelar() {
      this.$router.push('/profile/details');
    },
    async changeEmail() {
      const payload = {
        user_id: this.idUser,
        new_email: this.new_email,
      };
      const { data } = await this.$axios.put('/api/auth/change-email', payload);
      if (data.success === true) {
        this.$notify({
          title: 'Actualización exitosa!',
          type: 'success',
          text: data.message,
        });
        this.logout();
      }
    },
    async logout() {
      this.isLoading = true;
      await this.$auth.logout().then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style scoped></style>
