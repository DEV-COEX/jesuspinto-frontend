<template>
  <button
    v-if="show"
    class="ease-in-out duration-200"
    :type="type"
    @click="accionBoton"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  methods: {
    accionBoton() {
      this.$emit('accionBoton', true);
    },
  },
};
</script>

<style></style>
