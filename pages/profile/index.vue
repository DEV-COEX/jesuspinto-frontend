<template>
  <div
    class="flex flex-col w-full sm:pt-15 pt-10 sm:pl-20 pl-4 sm:pr-20 pr-4 items-center"
  >
    <div class="flex flex-col w-full">
      <h1 class="text-black font-bold text-xl mb-4">Mi Perfil</h1>
      <hr class="border bg-gray-400 border-gray-400 rounded-full" />
    </div>

    <div class="w-full flex flex-col justify-center items-center">
      <div class="flex flex-col items-center py-10">
        <div
          class="bg-white shadow-md rounded-lg flex justify-center items-center w-max sm:px-10 px-5 py-5"
        >
          <div class="mx-3 text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
          </div>
          <div class="w-5/6 flex flex-col mx-3">
            <div v-if="user">
              <p class="text-xl font-bold">
                {{ user.person.name }} {{ user.person.lastname }}
              </p>
            </div>
            <div>
              <span class="text-sm font-light">{{ user.person.address }}</span>
            </div>
          </div>
        </div>
        <CardComponent class="w-full" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexProfileView',
  layout: 'SlimLayout',
  middleware({ store, redirect }) {
    if (store.state.auth.user.verified !== 1) {
      redirect('/not-verified');
    }
  },
  computed: {
    user() {
      return this.$auth.user;
    },
  },
};
</script>

<style scoped></style>
