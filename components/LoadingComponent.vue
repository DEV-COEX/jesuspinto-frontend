<template>
  <div
    class="h-screen w-screen bg-white fixed top-0 left-0 flex items-center justify-center z-50"
  >
    <ClipLoader :loading="true" color="#000" size="50px" />
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
  name: 'LoadingComponent',
  components: {
    ClipLoader,
  },
};
</script>

<style scoped></style>
