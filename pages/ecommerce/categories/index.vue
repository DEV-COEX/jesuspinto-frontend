<template>
  <div
    class="flex flex-col w-full p-10 items-center"
  >
    <div class="container flex flex-col w-full mt-5">
      <div class="flex mb-4 items-center justify-between">
        <h1 class="text-black font-bold text-xl mr-2">Categorias</h1>
        <button-component title="Agregar"  @accionBoton="modalAgregar = true"/>
      </div>
      <hr class="border border-gray-300"/>
    </div>
    <div class="container flex flex-col w-full items-start md:pl-10 pl-1 pt-5">
      <RowCategories
        v-for="item in categories"
        :key="item.id"
        :nombre="item.name"
        :categoria="item"
        @listCategories="listCategories"
      />
    </div>
    <modal-component
      v-model="modalAgregar"
      :titulo="tituloAgregar"
      :text-btn="textBtnAgregar"
      @metodoBoton="createCategory"
    >
      <InputsForms
        :id="0"
        v-model="name_category"
        :placeholder="'Nombre de categoria'"
        :required="'required'"
        class="mr-5 w-96"
      />
    </modal-component>
  </div>
</template>

<script>
import RowCategories from '~/components/Categories/RowCategories'

export default {
  name: 'CreateCategory',
  components: {
    RowCategories,
  },
  layout: 'EcommerceLayout',
  data() {
    return {
      name_category: '',
      categories: [],
      modal: false,
      disabled: true,
      categoria: 0,
      category: [],
      modalAgregar: false,
      tituloAgregar: 'Categorias',
      textBtnAgregar: 'Agregar',
      tituloEditar: 'Editar Categoria',
      textBtnEditar: 'Editar',
      modalEditar: false,
      categoriaSub: 0,
      idCategoria: 0,
    }
  },
  mounted() {
    this.listCategories()
  },
  methods: {
    closeModal() {
      this.modal = !this.modal
      this.listCategories()
      this.category = []
    },
     listCategories() {
      try {
          this.$axios.get('/api/v1/category/').then((response) => {
          this.categories = response.data
        })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
      }
    },
    async createCategory() {
      try {
        await this.$axios
          .post('/api/v1/admin/category/', {
            name: this.name_category,
          })
          .then((response) => {
            this.$notify({
              title: 'Registrar',
              type: 'success',
              text: 'Categoria registrada!',
            })
            this.name_category = ''
            this.listCategories()
            this.modalAgregar = false
          })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
      }
    },
  },
}
</script>
<style scoped></style>
