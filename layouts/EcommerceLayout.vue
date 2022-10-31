<template>
  <div class="slim">
    <div class="flex flex-col h-screen flex-grow">
      <!--      Se le agrega z-index dado a que hay un componente problemativo (InputSelectComponent) que se sobrepone sobre el navbar-->
      <header class="z-20 fixed top-0">
        <NavbarComponent :menu="menu" class="w-full fixed top-0 left-0" />
      </header>
      <main class="mt-20">
        <Nuxt />
      </main>
    </div>
    <client-only><notifications /></client-only>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  data: () => ({
    menu: [
      {
        name: 'Inicio',
        path: '/ecommerce',
      },
      {
        name: 'Productos',
        path: '/ecommerce/products/',
      },
      {
        name: 'Categorias',
        path: '/ecommerce/categories',
      },
      {
        name: 'Tags',
        path: '/ecommerce/tags',
      },
      {
        name: 'Promociones',
        path: '/ecommerce/promotions',
      },
      {
        name: 'Usuarios',
        path: '/ecommerce/users',
      },
    ],
  }),
}
</script>
