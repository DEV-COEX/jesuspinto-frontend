<template>
  <div
    class="flex flex-col w-full sm:pt-15 pt-10 sm:pl-20 pl-4 sm:pr-20 pr-4 items-center"
  >
    <div class="flex flex-col w-full">
      <h1 class="text-black font-bold text-xl mb-4">Mi Perfil</h1>
      <hr class="border bg-gray-400 border-gray-400 rounded-full" />
    </div>
    <CardDataComponent :user="user" />
  </div>
</template>

<script>
export default {
  name: 'ProfileDataView',
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
