<template>
  <div class="mt-5 mb-5">
    <h3>Codigo de descuento</h3>
    <div class="flex justify-between items-center">
      <input
        v-model="discountCode"
        type="text"
        placeholder="Codigo descuento"
        class="border-2 w-44 xl:w-1/2 border-gray-300 rounded-xl focus:outline-none pl-2"
      />
      <ButtonComponent
        class="xl:w-1/5 w-auto focus:outline-none border-2 border-blue-300 bg-opacity-25 text-blue-700 bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5 px-2 py-2.5"
        :title="'Aplicar'"
        :show="true"
        @accion-boton="onSubmit"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscountFormComponent',
  data: () => ({
    discountCode: '',
  }),
  methods: {
    onSubmit(e) {
      if (this.discountCode === 'COEX10' || this.discountCode === 'coex10') {
        this.$emit('onSubmit', 0.1);
      } else {
        this.$emit('onSubmit', 0);
      }
    },
  },
};
</script>

<style></style>
