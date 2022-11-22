<template>
  <div class="my-10 flex items-center justify-center">
    <div
      v-if="deletingProducts"
      class="h-screen w-screen bg-white fixed top-0 left-0 flex items-center justify-center"
    >
      <span
        class="animate-pulse text-center font-bold text-2xl tracking-tight ">Eliminando Productos</span>
    </div>
    <div v-else class="h-full w-full flex items-center justify-center">
      <div
        v-if="hasProducts === null"
        class="loadingElements gap-2 flex-col justify-center z-[-1]"
      >
      <span
        class="order-last font-bold text-2xl animate-bounce tracking-tight"
      >Cargando productos</span
      >
        <img
          alt=""
          class="order-first h-10 animate-bounce object -contain"
          src="@/static/icons/loadingProducts.svg"
        />
      </div>
      <div v-else-if="!hasProducts" class="loadingElements items-center justify-center w-full">
        <div
          class="md:w-1/2 flex flex-col items-center text-black-700 p-10 rounded-2xl">
          <img alt="" class="w-1/6 xl:w-1/12 fill-purple-600" src="@/static/icons/thinking.svg">
          <span class="lg:text-xl font-medium mt-1 text-center"
          >Parece que aun no tienes productos</span
        >
          <nuxt-link
          class="boton border border-black hover:border-white ease-in-out duration-500 text-black hover:text-white py-2 rounded-xl w-max px-5 my-5 hover:bg-[#A7AA00]"
          to="/ecommerce/products/create"
          >
            Agregar producto
          </nuxt-link>
        </div>
      </div>
      <div v-else class="w-11/12 sm:w-10/12 md:w-10/12 lg:w-9/12 flex flex-col">
        <section class="mb-10">
          <div class="flex flex-row justify-between items-center">
            <h1 class="text-2xl font-bold ">Productos</h1>
            <div class="flex md:flex-row items-center">
              <button
                v-if="ids > 1"
                class="bg-red-500 border-2 border-white hover:bg-red-600 ease-in-out duration-75 text-white py-2 rounded-xl w-max px-2 my-5"
                type="button"
                @click="modalDeleteAll"
              >
                <svg
                  class="bi bi-trash3-fill"
                  fill="#FFFFFF"
                  height="20"
                  viewBox="0 0 16 16"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
                  />
                </svg>
              </button>
              <nuxt-link
                class=" text-black-700 border-2 border-black hover:bg-purple-700 ease-in-out duration-75  py-2 rounded-xl w-max px-5 my-5"
                to="/ecommerce/products/create"
              >
                Agregar producto
              </nuxt-link>
            </div>
          </div>
        </section>
        <div class="flex flex-col">
          <div class="overflow-x-auto rounded-2xl">
            <table class="w-full text-sm text-left">
              <thead
                class="text-base  uppercase bg-white h-24 text-center"
              >
              <tr class="border-b-2">
                <th class="py-3 px-6" scope="col">
                  <input
                    v-if="hasProducts"
                    ref="checkAll"
                    class="appearance-none checked:border-transparent rounded checked:bg-purple-700"
                    type="checkbox"
                    @input="checkAll"
                  />
                </th>
                <th class="py-3 px-6" scope="col">Id</th>
                <th class="py-3 px-6" scope="col">Imágen</th>
                <th class="py-3 px-6" scope="col">UID</th>
                <th class="py-3 px-6" scope="col">Nombre</th>
                <th class="py-3 px-6" scope="col">Categoria</th>
                <th class="py-3 px-6" scope="col">Subcategoria</th>
                <th class="py-3 px-12" scope="col"></th>
              </tr>
              </thead>
              <tbody class="text-center items-center text-base">
              <tr
                v-for="product in currentProducts.data"
                :key="product.id"
                class="bg-white w-full border-b hover:bg-purple-50"
              >
                <td
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    ref="checkbox"
                    :value="product.id"
                    class="appearance-none checked:bg-purple-600 checked:border-transparent rounded"
                    type="checkbox"
                    @click="pushProducts(product.id)"
                  />
                </td>
                <td class="py-4 px-6">{{ product.id }}</td>
                <td class="py-4 px-6 flex items-center justify-center">
                  <div
                    class="h-20 w-20 shadow-xl hover:rounded-2xl rounded-2xl"
                  >
                    <img
                      :src="
                        product.images?.length > 0
                          ? product.images[0]?.path
                          : 'https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-sin-foto-o-icono-de-imagen-en-blanco-cargando-im%C3%A1genes-o-marca-de-imagen-faltante-imagen-no-disponib.jpg?ver=6'
                      "
                      alt="Imagen de producto"
                      class="bg-gray-100 object-cover h-full rounded-2xl duration-200 ease-in-out hover:rounded-2xl hover:scale-110 hover:bg-transparent"
                    />
                  </div>
                </td>
                <td class="py-4 px-6">{{ product.uuid }}</td>
                <td class="py-4 px-6">{{ product.name }}</td>
                <td class="py-4 px-6">{{ product.subcategory.category.name }}</td>
                <td class="py-4 px-6">{{ product.subcategory.name }}</td>
                <td class="py-4 pr-4">
                  <div class="flex">
                    <nuxt-link
                      :to="'/ecommerce/products/' + product.id"
                      class="mr-4"
                      type="button"
                    >
                      <img
                        alt="Editar"
                        src="/icons/pencil-fill.svg"
                        title="Editar"
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
        </div>
        <div class="flex justify-center mt-5">
          <nav v-if="pages > 0" aria-label="Page navigation example">
            <ul class="inline-flex items-center -space-x-px">
              <li>
                <button
                  class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  type="button"
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
                  class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  type="button"
                  @click="nextPage"
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
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
            :class="{ show: modal }"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
            tabindex="-1"
          >
            <div class="flex">
              <div class="relative bg-white rounded-lg">
                <button
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="popup-modal"
                  type="button"
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
                      clip-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      fill-rule="evenodd"
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
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></path>
                  </svg>
                  <h3
                    class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                  >
                    Esta seguro de eliminar este producto?
                  </h3>

                  <button
                    v-if="deleteOne"
                    class="text-white bg-purple-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    type="button"
                    @click="deleteProduct(idProduct)"
                  >
                    Si, estoy seguro
                  </button>
                  <button
                    v-if="deleteAll"
                    class="text-white bg-purple-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    type="button"
                    @click="deleteProducts"
                  >
                    Si, estoy seguro
                  </button>
                  <button
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    @click="closeModal"
                  >
                    No, cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexProducts',
  layout: 'EcommerceLayout',
  data: () => ({
    idProduct: 0,
    currentPage: 1,
    arrayId: [],
    products: [],
    currentProducts: [],
    deletingProducts: false,
    modal: false,
    hasProducts: null,
    deleteOne: false,
    deleteAll: false,
  }),
  computed: {
    pages() {
      return parseInt(this.currentProducts.last_page)
    },
    ids() {
      return this.arrayId.length
    },
  },
  watch: {
    currentProducts(newValue, oldValue) {
      this.hasProducts = newValue.data.length !== 0;
    },
  },
  created() {
    // this.getProducts()
    this.listProducts()
  },
  mounted() {
    this.deletingProducts = false
  },
  methods: {
    openModal(id) {
      this.deleteOne = true
      this.deleteAll = false
      this.modal = !this.modal
      this.idProduct = id
    },
    modalDeleteAll() {
      this.deleteAll = true
      this.deleteOne = false
      this.modal = !this.modal
    },
    closeModal() {
      this.deleteOne = false
      this.deleteAll = false
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
            this.currentProducts.data.forEach((product) => {
              if (product.active === 0) {
                this.currentProducts.data = this.currentProducts.data.filter(
                  (product) => product.active === 1
                )
              }
            })
          })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
      }
    },
    async deleteProduct(id) {
      try {
        await this.$axios.delete(`/api/v1/admin/product/${id}`).then((response) => {
          this.$notify({
            title: 'Eliminar',
            type: 'success',
            text: 'Producto eliminado!',
          })
          this.listProducts()
          this.closeModal()
          this.$refs.checkAll.checked = false
        })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
      }
    },

    pushProducts(id) {
      this.$refs.checkAll.checked === true
        ? (this.$refs.checkAll.checked = false)
        : (this.$refs.checkAll.checked = true)
      if (this.arrayId.includes(id)) {
        this.arrayId = this.arrayId.filter((p) => p !== id)
      } else {
        this.arrayId.push(id)
      }
      if (this.currentProducts.data.length === this.arrayId.length) {
        this.$refs.checkAll.checked = true
      }
    },

    async deleteProducts() {
      this.deletingProducts = true
      try {
        const payload = {
          ids: this.arrayId,
        }
        await this.$axios
          .post(`/api/v2/admin/product/delete`, {
            ...payload,
          })
          // await this.$axios.post(`/api/v1/admin/product/delete`, payload)
          .then((response) => {
            this.$notify({
              title: 'Eliminar',
              type: 'warning',
              text: 'Productos eliminados!',
            })
            this.listProducts()
            this.arrayId = []
          })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
      }
      this.deletingProducts = false
      this.hasProducts = null
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

.loadingElements {
  height: calc(100vh - 11rem);
  display: flex;
  overflow: hidden;
}
</style>
