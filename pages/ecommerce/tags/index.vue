<template>
  <div
    class="flex flex-col w-full sm:pt-15 py-10 sm:pl-10 md:pl-20 pl-5 md:pr-20 sm:pr-10 pr-5 items-center"
  >
    <div class="container flex flex-col w-full mt-5">
      <div class="flex mb-4 items-center justify-between">
        <h1 class="text-black font-bold text-xl mr-2">Tags</h1>
        <button
          class="bg-blue-700 border-2 border-white hover:bg-blue-700 ease-in-out duration-75 text-white py-2 rounded-xl w-max px-5"
          @click="modalAgregar = true"
        >
          Agregar
        </button>
      </div>
      <hr class="border rounded-full bg-gray-400 border-gray-300"/>
    </div>
    <div class="container flex flex-col w-full items-start md:pl-10 pl-1 pt-5">
      <RowTags
        v-for="tag in tags"
        :key="tag.id"
        :nombre="tag.name"
        :tag="tag"
        @listTags="listTags"
      />
    </div>
    <modal-component
      v-model="modalAgregar"
      :titulo="tituloAgregar"
      :text-btn="textBtnAgregar"
      @metodoBoton="createTag"
    >
      <InputsForms
        :id="0"
        v-model="name_tag"
        :placeholder="'Nombre de categoria'"
        :required="'required'"
        class="mr-5 w-96"
      />
    </modal-component>
  </div>
</template>

<script>
import RowTags from '~/components/Tags/RowTags.vue'

export default {
  name: 'CreateTag',
  components: {
    RowTags,
  },
  layout: 'EcommerceLayout',
  data() {
    return {
      name_tag: '',
      categories: [],
      modal: false,
      disabled: true,
      categoria: 0,
      category: [],
      modalAgregar: false,
      tituloAgregar: 'Tags',
      textBtnAgregar: 'Agregar',
      tituloEditar: 'Editar Tag',
      textBtnEditar: 'Editar',
      modalEditar: false,
      categoriaSub: 0,
      idCategoria: 0,
      tags: [],
      tagg: [],
    }
  },
  mounted() {
    this.listTags()
  },
  methods: {
    closeModal() {
      this.modal = !this.modal
      this.listTags()
      this.tagg = []
    },
    async listTags() {
      try {
        await this.$axios.get('/api/v1/tag/').then((response) => {
          this.tags = response.data
          this.$forceUpdate()
        })
      } catch (error) {
        this.tags = []
        this.$notify({
          title: 'Advertencia',
          type: 'warn',
          text: error?.response?.data?.error || 'No se encontraron etiquetas',
        })
      }
    },
    async createTag() {
      try {
        await this.$axios
          .post('/api/v1/admin/tag/', {
            name: this.name_tag,
          })
          .then((response) => {
            this.$notify({
              title: 'Registro exitoso',
              type: 'success',
              text: 'Etiqueta creada',
            })
            this.name_category = ''
            this.listTags()
            this.modalAgregar = false
          })
        this.name_tag = ''
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
