<template>
  <div class="bg-gray-200 rounded-xl w-full h-52">
    <div class="flex flex-col h-full justify-center p-10">
      <h4 class="uppercase">{{ product.name }}</h4>
      <span> Desde {{ price }} </span>
      <button-component title="Ver mas" @accionBoton="to()"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FeaturedProductComponent',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(this.product.price);
    },
  },
  methods:{
    to(){
      this.$router.push('/products/'+ this.product.uuid);
    }
  }
};
</script>

<style scoped>

</style>
