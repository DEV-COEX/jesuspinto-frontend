<template>
  <div class="slim">
    <div class="flex flex-col h-screen flex-grow">
      <header class="z-50 fixed top-0">
        <NavbarComponent :menu="menu" class="w-full fixed top-0 left-0" />
      </header>
      <main class="mt-20">
        <Nuxt />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
    <notifications />
  </div>
</template>
<script>
export default {
  name: 'SlimLayout',
  data: () => ({
    menu: [
      {
        name: 'Inicio',
        path: '/',
      },
      {
        name: 'Productos',
        path: '/products',
      },
      {
        name: 'Contacto',
        path: '/contact',
      },
    ],
  }),
};
</script>
