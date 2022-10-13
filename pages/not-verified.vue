<template>
  <div
    class="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen"
  >
    <div
      class="max-w-xl p-8 text-center text-gray-800 px-20 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12"
    >
      <h3 class="text-2xl">Gracias por registrarte en nuestra aplicacion.</h3>
      <div class="flex justify-center text-indigo-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-24 h-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
          />
        </svg>
      </div>

      <p>
        Estamos felices que estes aqui, ahora vamos a verificar tu correo
        electronico:
      </p>
      <div class="mt-4">
        <nuxt-link
          to="/verify-email"
          class="px-3 py-2 text-white bg-indigo-600 rounded-xl"
          >Haz click aqui para verificar
        </nuxt-link>
        <p class="mt-4 text-sm">
          Si estas teniendo problemas para verificar tu cuenta, envianos un
          correo a
          <a
            href="mailto:support@tarjeta-vip.com"
            class="text-blue-600 underline"
            >support@ecommerce.com.co</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotVerifiedView',
  layout: 'blank',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified === 1) {
      redirect('/profile');
    }
  },
};
</script>

<style scoped></style>
