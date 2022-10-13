<template>
  <div
    class="flex flex-col w-full sm:pt-15 pt-10 sm:pl-20 pl-5 sm:pr-20 pr-5 items-center"
  >
    <div class="flex flex-col w-full">
      <h1 class="text-black font-bold text-xl mb-4">Contactenos</h1>
      <hr class="border bg-gray-400 border-gray-400 rounded-full" />
    </div>

    <div
      class="flex flex-col bg-white rounded-xl w-full md:w-full justify-center p-6 sm:p-10 m-10 lg:w-1/2 sm:w-full"
    >
      <form>
        <div class="flex flex-col md:flex-row w-full md:pt-2">
          <div class="flex flex-col lg:w-1/2 mt-2 md:mt-2 w-full px-2">
            <label class="flex flex-col"
              >Nombre
              <input
                v-model="name"
                type="text"
                class="rounded-xl border-gray-400"
                placeholder="Nombre"
            /></label>
          </div>
          <div class="flex flex-col lg:w-1/2 mt-2 md:mt-2 w-full px-2">
            <label class="flex flex-col"
              >Apellido
              <input
                v-model="lastName"
                type="text"
                class="rounded-xl border-gray-400"
                placeholder="Apellido"
            /></label>
          </div>
        </div>

        <div class="flex flex-col md:flex-row w-full md:pt-2">
          <div class="flex flex-col lg:w-1/2 mt-2 md:mt-2 w-full px-2">
            <label class="flex flex-col"
              >Correo electronico
              <input
                v-model="email"
                type="text"
                class="rounded-xl border-gray-400"
                placeholder="Email"
            /></label>
          </div>
          <div class="flex flex-col lg:w-1/2 mt-2 md:mt-2 w-full px-2">
            <label class="flex flex-col"
              >Teléfono
              <input
                v-model="phone"
                type="text"
                class="rounded-xl border-gray-400"
                placeholder="Teléfono"
            /></label>
          </div>
        </div>

        <div class="flex w-full pt-2">
          <div class="flex flex-col w-full px-2">
            <label class="flex flex-col"
              >Mensajes
              <textarea
                v-model="message"
                rows="5"
                placeholder="Mensaje"
                class="resize-none border-gray-400 focus:outline-none focus:ring focus:border-gray-300 rounded-xl"
              >
              </textarea>
            </label>
          </div>
        </div>
      </form>
      <ButtonComponent
        class="mt-4 mr-3 w-full focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2"
        :show="true"
        :type="'submit'"
        :title="'Enviar mensaje'"
        @accionBoton="sendMail"
      ></ButtonComponent>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUsView',
  auth: false,
  layout: 'SlimLayout',
  data: () => ({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  }),
  methods: {
    validate() {
      if (/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/.test(this.email)) {
        if (/^\w+@yopmail+\.[a-zA-Z]+/.test(this.email)) {
          this.invalidEmail = !this.invalidEmail;
        } else {
          this.sendMail();
        }
      }
    },
    async sendMail() {
      try {
        const payload = {
          name: this.name,
          last_name: this.lastName,
          email: this.email,
          phone: this.phone,
          msg: this.message,
        };
        await this.$axios.post('/api/auth/send-email', payload);

        this.$notify({
          title: 'Correo enviado',
          type: 'success',
          text: 'Email enviado correctamente!',
        });
        this.$router.push('/');
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        });
      }
    },
  },
};
</script>

<style></style>
