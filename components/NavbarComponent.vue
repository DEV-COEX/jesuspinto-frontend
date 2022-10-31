<template>
  <div>
    <LoadingComponent v-if="isLoading" />
    <nav
      v-else
      class="
        bg-[#9B9E0B]
        md:bg-white md:shadow-md
        rounded-b-lg
        md:rounded-lg
        flex
        items-center
        md:justify-between
        h-20
        md:px-5
      "
    >
      <div class="w-1/7 lg:w-auto h-full flex items-center justify-center">
        <div
          class="
            bg-blue-100
            rounded-lg
            h-full
            hidden
            md:flex md:items-center
            w-min
            max-h-10
            px-3
          "
        >
          <a href="/" class="uppercase font-bold text-blue-400">logo</a>
        </div>
      </div>
      <div id="navigation" class="hidden md:block">
        <ul class="flex">
          <li v-for="(item, i) in menu" :key="i" class="mx-3">
            <nuxt-link class="text-[#9B9E0B] font-bold" :to="item.path"
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
        <div class="flex items-center">
          <button
            type="button"
            class="text-white lg:text-[#9B9E0B] mx-2 hidden sm:block"
            @click="toggleAccountMenu"
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
            class="
              bg-white
              absolute
              top-full
              right-2
              flex flex-col
              items-start
              justify-center
              rounded-lg
              px-5
              py-3
              shadow
              min-w-max
            "
          >
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
          <aside class="w-full rounded-r">
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
                <nuxt-link class="text-[#9B9E0B] font-bold" :to="item.path"
                  >{{ item.name }}
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
    user() {
      return this.$auth.user
    },
  },
  methods: {
    toggleSidebar() {
      this.isToggle = !this.isToggle
    },
    toggleAccountMenu() {
      this.isShow = !this.isShow
    },
    outsideNavbar(event) {
      if (event.target.tagName === 'DIV') {
        this.isToggle = !this.isToggle
      }
    },
    async logout() {
      this.isLoading = true
      await this.$auth.logout().then(() => {
        this.$router.push('/login')
      })
    },
  },
}
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
