<template>
  <div class="flex flex-col p-10 items-center">
    <Transition name="fade">
      <div
        v-if="modal"
        class="h-screen w-screen bg-gray-400 opacity-80 fixed top-0 left-0 z-50"
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
                Esta seguro de eliminar este producto?
              </h3>
              <button
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                @click="deleteProduct(idProduct)"
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
    <div class="container overflow-hidden flex flex-col justify-center">
      <section class="block mb-10">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Productos</h1>
          <div class="flex">
            <button
              v-if="ids > 1"
              type="button"
              class="bg-red-500 border-2 border-white hover:bg-red-600 ease-in-out duration-75 text-white py-2 rounded-xl w-max px-2 my-5"
              @click="deleteProducts()"
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
              class="boton border border-black hover:border-white ease-in-out duration-500 text-black hover:text-white py-2 rounded-xl w-max px-5 my-5 hover:bg-[#A7AA00]"
            >
              Agregar producto
            </nuxt-link>
          </div>
        </div>
        <hr class="border border-gray-300" />
      </section>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 z-0"
        >
          <thead
            class="text-xs text-[#9B9E0B] uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 text-center"
          >
            <tr>
              <th scope="col" class="py-3 px-6">
                <input
                  ref="checkAll"
                  type="checkbox"
                  class="appearance-none checked:bg-[#AA8500] checked:border-transparent"
                  @click="checkAll"
                />
              </th>

              <th scope="col" class="py-3 px-6">Id</th>
              <th scope="col" class="py-3 px-6">Foto</th>
              <th scope="col" class="py-3 px-6">UID</th>
              <th scope="col" class="py-3 px-6">Nombre</th>
              <th scope="col" class="py-3 px-6">Categoria</th>
              <th scope="col" class="py-3 px-6">Subcategoria</th>
              <th scope="col" class="py-3 px-6">Acciones</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="product in currentProducts.data"
              :key="product.id"
              class="bg-white w-full border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <input
                  ref="checkbox"
                  :value="product.id"
                  type="checkbox"
                  class="appearance-none checked:bg-[#AA8500] checked:border-transparent"
                  @click="pushProduct(product.id)"
                />
              </td>
              <td class="py-4 px-6">{{ product.id }}</td>
              <td class="py-4 px-6">
                <img
                  :src="
                    product.images.length > 0
                      ? product.images[0].path
                      : 'http://via.placeholder.com/640x360'
                  "
                  class="bg-gray-100 w-28 rounded-lg duration-200 ease-in-out hover:bg-transparent"
                  alt="Imagen de producto"
                />
              </td>
              <td class="py-4 px-6">{{ product.uuid }}</td>
              <td class="py-4 px-6">{{ product.name }}</td>
              <td class="py-4 px-6">{{ product.subcategory.category.name }}</td>
              <td class="py-4 px-6">{{ product.subcategory.name }}</td>
              <td class="py-4 px-6">
                <div class="flex">
                  <nuxt-link
                    :to="'/ecommerce/products/' + product.uuid"
                    type="button"
                    class="mr-4"
                  >
                    <img
                      src="/icons/pencil-fill.svg"
                      title="Editar"
                      alt="Editar"
                    />
                  </nuxt-link>
                  <button type="button" @click="openModal(product.id)">
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
        <nav v-if="pages > 1" aria-label="Page navigation example">
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
                @click="listProducts(index + 1)"
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
  </div>
</template>

<script>
export default {
  name: 'IndexProducts',
  layout: 'EcommerceLayout',
  data: () => ({
    products: [],
    currentProducts: [],
    modal: false,
    idProduct: 0,
    currentPage: 1,
    idsProducts: [],
  }),
  computed: {
    pages() {
      return parseInt(this.currentProducts.last_page)
    },
    ids() {
      return this.idsProducts.length
    },
  },
  mounted() {
    this.listProducts()
  },
  methods: {
    openModal(id) {
      this.modal = !this.modal
      this.idProduct = id
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
            .get(`/api/v1/admin/product/list?page=${this.currentPage + 1}`)
            .then((response) => {
              this.currentProducts = response.data
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
            .get(`/api/v1/admin/product/list?page=${this.currentPage - 1}`)
            .then((response) => {
              this.currentProducts = response.data
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
    listProducts(page = 1) {
      try {
        this.$axios
          .get(`/api/v1/admin/product/list?page=${page}`)
          .then((response) => {
            this.currentProducts = response.data
            this.currentPage = this.currentProducts.current_page
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
    async deleteProduct(id) {
      try {
        await this.$axios
          .delete(`/api/v1/admin/product/${id}`)
          .then((response) => {
            this.$notify({
              title: 'Eliminar',
              type: 'success',
              text: 'Producto eliminado!',
            })
            this.closeModal()
            this.listProducts()
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

    pushProduct(id) {
      this.$refs.checkAll.checked === true
        ? (this.$refs.checkAll.checked = false)
        : (this.$refs.checkAll.checked = false)
      if (this.idsProducts.includes(id)) {
        this.idsProducts = this.idsProducts.filter((p) => p !== id)
      } else {
        this.idsProducts.push(id)
      }
      if (this.currentProducts.data.length === this.idsProducts.length) {
        this.$refs.checkAll.checked = true
      }
    },
    async deleteProducts() {
      try {
        await this.idsProducts.forEach((product) => {
          this.$axios
            .delete(`/api/v1/admin/product/${product}`)
            .then((response) => {
              this.idsProducts = []
              this.$refs.checkAll.checked = false
            })
        })
        this.listProducts()
        this.$notify({
          title: 'Eliminar',
          type: 'warning',
          text: 'Productos eliminados!',
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
    checkAll() {
      const referencias = this.$refs.checkbox
      if (this.$refs.checkAll.checked === true) {
        referencias.forEach((element) => {
          element.checked = true
          this.idsProducts.push(parseInt(element.value))
        })
      } else {
        referencias.forEach((element) => {
          element.checked = false
          this.idsProducts = []
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
