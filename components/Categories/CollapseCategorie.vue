<template>
  <div v-if="state">
    <div id="subCategorias">
      <div class="flex items-center">
        <input
          v-model="name"
          class="w-11/12 h-full bg-white border-1 border-gray-200 rounded-lg mr-4 focus:outline-none shadow-none"
          type="text"
          placeholder="Subcategoria"
        />
        <button
          class="bg-blue-700 border-2 border-white hover:bg-blue-700 ease-in-out duration-75 text-white py-2 rounded-xl w-max px-5"
          @click="addSubCategoria"
        >
          Añadir
        </button>
      </div>
      <div class="mt-2">
        <SubCategorie
          v-for="subCategoria in subcategoria.subcategories"
          :key="subCategoria.id"
          :name="subCategoria.name"
          :sub-categoria="subCategoria"
          :id-categoria="idCategoria"
          @listCategories="listCategories"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubCategorie from './SubCategorie.vue'
export default {
  components: { SubCategorie },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    subcategoria: {
      type: Object,
      default: null,
    },
    idCategoria: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      name: '',
      subCategoria: 0,
    }
  },
  computed: {
    state: {
      set(value) {
        this.$emit('input', value)
      },
      get() {
        return this.value
      },
    },
  },
  methods: {
    listCategories() {
      this.$emit('listCategories')
    },
    async addSubCategoria() {
      try {
        await this.$axios.post('/api/v1/admin/subcategories', {
          name: this.name,
          category_id: this.subcategoria.id,
        })
        this.name = ''
        this.listCategories()
        this.$notify({
          title: 'Succesfull',
          type: 'success',
          text: 'registrado exitosamente',
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
