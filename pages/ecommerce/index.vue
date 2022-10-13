<template>
  <div>EcommerceAdminView</div>
</template>

<script>
export default {
  name: 'EcommerceAdminView',
  layout: 'EcommerceLayout',
  middleware({store, redirect}) {
    redirect('/ecommerce/products');
  },
}
</script>

<style scoped></style>
