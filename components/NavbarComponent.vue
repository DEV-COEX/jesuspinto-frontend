<template>
  <div>
    <LoadingComponent v-if="isLoading" />
    <nav
      v-else
      class="bg-[#9B9E0B] md:bg-white md:shadow-md rounded-b-lg md:rounded-lg flex items-center md:justify-between h-20 md:px-5"
    >
      <div class="w-1/7 lg:w-auto h-full flex items-center justify-center">
        <div
          class="bg-blue-100 rounded-lg h-full hidden md:flex md:items-center w-min max-h-10 px-3"
        >
          <a href="/" class="uppercase font-bold text-blue-400">logo</a>
        </div>
      </div>
      <div id="navigation" class="hidden md:block">
        <ul class="flex">
          <li v-for="(item, i) in menu" :key="i" class="mx-3">
            <nuxt-link
              class="text-[#9B9E0B] font-bold ease-in-out duration-200 "
              :to="item.path"
              >{{ item.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div
        id="shortcuts"
        class="flex w-full md:w-auto justify-between md:justify-end px-5"
      >
        <button
          class="block md:hidden text-white"
          type="button"
          @click="toggleSidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <!-- <template v-if="logged">
          <SearchBarComponent class="w-full md:w-auto px-2" />
        </template> -->
        <div class="flex items-center">
          <nuxt-link
            to="/payments"
            class="text-white md:text-[#9B9E0B] mx-2 relative hover:text-red-600 duration-200 ease-in-out"
          >
            <span
              v-if="onCart"
              :class="onCart ? 'animate-ping' : ''"
              class="flex h-3 w-3 bg-blue-300 rounded-full absolute -top-2 left-2.5 ease-in-out duration-200"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-cart-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
          </nuxt-link>
          <nuxt-link
            to="/wishlist"
            class="text-white md:text-[#9B9E0B] mx-2 hidden md:block mt-1 relative hover:text-red-600 duration-200 ease-in-out"
          >
            <span
              v-if="onLiked"
              :class="onLiked ? 'animate-ping' : ''"
              class="flex h-3 w-3 bg-blue-300 rounded-full absolute -top-2 left-2.5"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </nuxt-link>
          <button
            type="button"
            class="text-white lg:text-[#9B9E0B] mx-2 hidden sm:block ease-in-out duration-200 "
            @click="toggleAcountMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#9B9E0B"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
          </button>
          <div
            v-if="isShow"
            class="bg-white absolute top-full right-2 flex flex-col items-start justify-center rounded-lg px-5 py-3 shadow min-w-max"
          >
            <nuxt-link v-if="user" to="/profile" class="text-blue-500 font-bold"
              >Mi perfil
            </nuxt-link>
            <button v-if="user" @click="logout">Cerrar Sesión</button>
            <nuxt-link v-else to="/login">Iniciar Sesión</nuxt-link>
          </div>
        </div>
      </div>
      <Transition name="slide">
        <div
          v-show="isToggle"
          class="mr-0 fixed md:hidden top-0 left-0 h-screen w-3/5 rounded-r-lg bg-white z-50 p-8"
        >
          <aside class="h-full w-full rounded-r">
            <header class="flex justify-between items-center">
              <h1 class="text-blue-500">Menú</h1>
              <button
                type="button"
                class="text-blue-500 p-2 bg-blue-100 rounded-lg"
                @click="toggleSidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  class="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                  />
                </svg>
              </button>
            </header>
            <ul class="flex flex-col px-5 py-2">
              <li v-for="(item, i) in menu" :key="i" class="mx-3 my-2">
                <nuxt-link class="text-blue-500 font-bold" :to="item.path"
                  >{{ item.name }}
                </nuxt-link>
              </li>
              <li class="mx-3 my-2">
                <nuxt-link class="text-blue-500 font-bold" to="/profile">
                  Perfil
                </nuxt-link>
              </li>
               <div class="flex items-center justify-center">
                <button v-if="user" class="text-[#9B9E0B] absolute bottom-0 p-8" @click="logout">
                  Cerrar Sesión
                </button>
              </div>
            </ul>
          </aside>
        </div>
      </Transition>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavbarComponent',
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isToggle: false,
    isShow: false,
    isLoading: false,
  }),
  computed: {
    onLiked() {
      return this.$store.state.likedProducts.length > 0;
    },
    onCart() {
      return this.$store.state.cartProducts.length > 0;
    },
    user() {
      return this.$auth.user;
    },
    logged(){
      return this.$auth.loggedIn;
    }
  },
  mounted() {
    document.addEventListener('click', this.closeAcountMenu);
    document.addEventListener('click', this.closeSidebar);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeAcountMenu);
    document.removeEventListener('click', this.closeSidebar);
  },
  methods: {
    toggleSidebar() {
      this.isToggle = !this.isToggle;
    },
    toggleAcountMenu() {
      this.isShow = !this.isShow;
    },
    closeAcountMenu(e) {
      if (!this.$el.contains(e.target)) {
        this.isShow = false;
      }
    },
    closeSidebar(e) {
      if (!this.$el.contains(e.target)) {
        this.isToggle = false;
      }
    },
    async logout() {
      this.isLoading = true;
      await this.$auth.logout().then(() => {
        this.$auth.setUser(null);
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style scoped>
.active {
  border: #a783fa 1px solid;
  background: #e4d6ff;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}
</style>
