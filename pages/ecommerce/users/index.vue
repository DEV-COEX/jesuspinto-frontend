<template>
  <div class="flex flex-col p-10 items-center">
    <Transition name="fade">
      <div
        v-if="modal"
        class="h-screen w-screen bg-gray-400 opacity-80 fixed top-0 left-0 z-20"
      />
    </Transition>
    <Transition name="bounce">
      <div
        v-if="modal"
        id="popup-modal"
        tabindex="-1"
        :class="{ show: modal }"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
      >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
          <div class="relative bg-white rounded-lg">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              @click="closeModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              >
                Esta seguro de eliminar este usuario?
              </h3>
              <button
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                @click="deleteUser(idUser)"
              >
                Si, estoy seguro
              </button>
              <button
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click="closeModal"
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <section class="block container mb-10">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Usuarios</h1>
        <div class="flex">
          <button
            v-if="ids > 1"
            type="button"
            class="bg-red-500 border-2 border-white hover:bg-red-600 ease-in-out duration-75 text-white py-2 rounded-xl w-max px-2 my-5"
            @click="deleteUsers()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FFFFFF"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
          </button>
          <nuxt-link
            to="/ecommerce/products/create"
            class="bg-blue-700 border-2 border-white hover:bg-blue-700 ease-in-out duration-75 text-white py-2 rounded-xl w-max px-5 my-5"
          >
            Agregar usuario
          </nuxt-link>
        </div>
      </div>
      <hr class="border border-gray-300" />
    </section>

    <div class="container overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-blue-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center"
        >
          <tr>
            <th scope="col" class="py-3 px-6">
              <input
                ref="checkAll"
                type="checkbox"
                class="appearance-none checked:bg-blue-600 checked:border-transparent"
                @click="checkAll"
              />
            </th>

            <th scope="col" class="py-3 px-6">Id</th>
            <th scope="col" class="py-3 px-6">Identificación</th>
            <th scope="col" class="py-3 px-6">Nombre Completo</th>
            <th scope="col" class="py-3 px-6">Email</th>
            <th scope="col" class="py-3 px-6">Teléfono</th>
            <th scope="col" class="py-3 px-6">Dirección</th>
            <th scope="col" class="py-3 px-6">Acciones</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="user in currentUsers.data"
            :key="user.id"
            class="bg-white w-full border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <input
                ref="checkbox"
                :value="user.id"
                type="checkbox"
                class="appearance-none checked:bg-blue-600 checked:border-transparent"
                @click="pushUser(user.id)"
              />
            </td>
            <td class="py-4 px-6">{{ user.id }}</td>
            <td class="py-4 px-6">{{ user.person.nit }}</td>
            <td class="py-4 px-6">
              {{ user.person.name }} {{ user.person.lastname }}
            </td>
            <td class="py-4 px-6">{{ user.email }}</td>
            <td class="py-4 px-6">{{ user.person.phone }}</td>
            <td class="py-4 px-6">
              {{
                user?.person.sending_addresses[0]
                  ? user.person.sending_addresses[0].address
                  : 'Sin registro'
              }}
            </td>
            <td class="py-4 px-6">
              <div class="flex">
                <nuxt-link
                  :to="'/ecommerce/users/' + user.id"
                  type="button"
                  class="mr-4"
                >
                  <img
                    src="/icons/pencil-fill.svg"
                    title="Editar"
                    alt="Editar"
                  />
                </nuxt-link>
                <button type="button" @click="openModal(user.id)">
                  <img
                    alt="Eliminar"
                    src="/icons/trash3-fill.svg"
                    title="Eliminar"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-5">
      <nav v-if="pages" aria-label="Page navigation example">
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <button
              type="button"
              class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click="prevPage"
            >
              Anterior
            </button>
          </li>
          <li v-for="(page, index) in pages" :key="index">
            <button
              class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click="listUsers(index + 1)"
            >
              {{ page }}
            </button>
          </li>
          <li>
            <button
              type="button"
              class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              @click="nextPage"
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcommerceUsersView',
  layout: 'EcommerceLayout',
  data: () => ({
    users: [],
    currentUsers: [],
    modal: false,
    idUser: 0,
    currentPage: 1,
    arrayId: [],
  }),
  computed: {
    pages() {
      return parseInt(this.users.last_page)
    },
    ids() {
      return this.arrayId.length
    },
  },
  mounted() {
    this.getUsers()
    this.listUsers()
  },
  methods: {
    openModal(id) {
      this.modal = !this.modal
      this.idUser = id
    },
    closeModal() {
      this.modal = !this.modal
      this.idProduct = 0
    },
    async nextPage() {
      if (this.currentPage === this.pages) {
        this.currentPage = this.pages
      } else {
        try {
          await this.$axios
            .get(`api/auth/list?page=${this.currentPage + 1}`)
            .then((response) => {
              this.currentUsers = response.data.users
              this.currentPage = this.currentPage + 1
            })
        } catch (error) {
          this.$notify({
            title: 'Error',
            type: 'error',
            text: error?.response?.data?.error || 'Error desconocido',
          })
        }
      }
    },
    async prevPage() {
      if (this.currentPage === 1) {
        this.currentPage = 1
      } else {
        try {
          await this.$axios
            .get(`/api/auth/list?page=${this.currentPage - 1}`)
            .then((response) => {
              this.currentUsers = response.data.users
              this.currentPage = this.currentPage - 1
            })
        } catch (error) {
          this.$notify({
            title: 'Error',
            type: 'error',
            text: error?.response?.data?.error || 'Error desconocido',
          })
        }
      }
    },
    getUsers() {
      try {
        this.$axios.get('/api/auth/list?page=1').then((response) => {
          const {data} = response
          this.users = data.users
        })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
        this.isLoading = false
      }
    },
    listUsers(page = 1) {
      try {
        this.$axios.get(`api/auth/list?page=${page}`).then((response) => {
          this.currentUsers = response.data.users
          this.currentPage = this.currentUsers.current_page
        })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
        this.isLoading = false
      }
    },
    async deleteUser(id) {
      try {
        const idLogged = this.$store.state.auth.user.id
        if (id === idLogged) {
          this.closeModal()
          this.$notify({
            title: 'Error',
            type: 'error',
            text: 'No puedes eliminarte a ti mismo',
          })
        } else {
          await this.$axios.delete(`/api/auth/${id}`).then((response) => {
            this.$notify({
              title: 'Eliminar',
              type: 'success',
              text: 'Usuario eliminado!',
            })
            this.closeModal()
            this.listUsers()
          })
        }
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
        this.isLoading = false
      }
    },
    pushUser(id) {
      this.$refs.checkAll.checked === true
        ? (this.$refs.checkAll.checked = false)
        : (this.$refs.checkAll.checked = false)
      if (this.arrayId.includes(id)) {
        this.arrayId = this.arrayId.filter((p) => p !== id)
      } else {
        this.arrayId.push(id)
      }
      if (this.arrayId.length === this.users.data.length) {
        this.$refs.checkAll.checked = true
      }
    },

    async deleteUsers() {
      try {
        const idLogged = this.$store.state.auth.user.id
        await this.arrayId.forEach(id => {
        if (id === idLogged) {
          this.$notify({
            title: 'Error',
            type: 'error',
            text: 'No puedes eliminarte a ti mismo',
          })
        } else {
           this.$axios.delete(`/api/auth/${id}`).then((response) => {
            this.$notify({
              title: 'Eliminar',
              type: 'success',
              text: 'Usuario eliminado!',
            })
            this.listUsers()
            this.checkAll();
            this.$refs.checkAll.checked = false
          })
        }
        });

        // await this.$axios
        //   .post(`/api/v1/product/admin/delete`, payload)
        //   .then((response) => {
        //     this.$notify({
        //       title: 'Eliminar',
        //       type: 'warning',
        //       text: 'Usuarios eliminados!',
        //     })
        //     this.listUsers()
        //     this.arrayId = []
        //   })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
        this.isLoading = false
      }
    },
    checkAll() {
      const referencias = this.$refs.checkbox
      if (this.$refs.checkAll.checked === true) {
        referencias.forEach((element) => {
          element.checked = true
          this.arrayId.push(parseInt(element.value))
        })
      } else {
        referencias.forEach((element) => {
          element.checked = false
          this.arrayId = []
        })
      }
    },
  },
}
</script>
<style>
.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.4s;
}

.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
