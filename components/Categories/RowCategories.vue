<template>
  <div>
    <div class="row-categorie sm:w-[20rem] md:w-[30rem] w-auto">
      <div class="tres-puntos">
        <label id="categoria" class="font-bold uppercase">{{ nombre }}</label>
      </div>
      <div class="flex justify-center items-center">
        <button :id="categoria.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="GotoEditar(categoria)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill"
            viewBox="0 0 16 16">
            <path
              d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </button>
        <button :id="categoria.id" class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="deleteCategory(categoria.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill"
            viewBox="0 0 16 16">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </button>
        <button class="rounded-md hover:bg-[#A39410] text-blue-800 hover:text-white ease-in-out duration-200 p-2"
          @click="GoToCollapse()">
          <svg width="18" height="18" viewBox="0 0 110 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.78126 3.33664C4.24632 1.80172 6.2331 0.939453 8.3047 0.939453C10.3763 0.939453 12.3631 1.80172 13.8281 3.33664L52.5 43.8648L91.1719 3.33664C92.6453 1.84522 94.6188 1.01997 96.6672 1.03862C98.7156 1.05728 100.675 1.91835 102.124 3.43638C103.572 4.95441 104.394 7.00793 104.412 9.15467C104.429 11.3014 103.642 13.3696 102.219 14.9138L58.0234 61.2305C56.5584 62.7654 54.5716 63.6276 52.5 63.6276C50.4284 63.6276 48.4416 62.7654 46.9766 61.2305L2.78126 14.9138C1.31664 13.3784 0.493866 11.2962 0.493866 9.1252C0.493866 6.95417 1.31664 4.87203 2.78126 3.33664V3.33664Z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="sm:p-4">
      <CollapseCategorie v-model="collapse" :subcategoria="categoria" :id-categoria="categoria.id"
        @listCategories="listCategories" />
    </div>

    <modal-component v-model="modalEditar" :titulo="tituloEditar" :text-btn="textBtnEditar"
      @metodoBoton="editCategory()">
      <InputsForms v-model="infoToEdit.name" />
    </modal-component>
  </div>
</template>

<script>
import CollapseCategorie from './CollapseCategorie.vue'
export default {
  name: 'RowCategories',
  components: { CollapseCategorie },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    nombre: {
      type: String,
      default: 'sin Nombre',
    },
    idCategoria: {
      type: Number,
      default: 0,
    },
    idCollapse: {
      type: Boolean,
      default: false,
    },
    categoria: {
      type: Object,
      default() {
        // default function receives the raw props object as argument
        return {
          id: 0,
          name: '',
          created_by: null,
          updated_by: null,
          created_at: '',
          updated_at: '',
          deleted_at: null,
          categorias: [],
        }
      },
    },
  },
  data() {
    return {
      tituloEditar: 'Editar Categoria',
      textBtnEditar: 'Editar',
      modalEditar: false,
      infoToEdit: {},
      collapse: false,
      subcategoria: {},
    }
  },
  methods: {
    GotoEditar(data) {
      this.infoToEdit = Object.assign({}, data)
      this.modalEditar = true
    },
    GoToCollapse() {
      if (this.collapse === true) {
        this.collapse = false
      } else {
        this.collapse = true
      }
    },
    listCategories() {
      this.$emit('listCategories')
    },
    async editCategory() {
      const id = this.infoToEdit.id
      await this.$axios.put(`/api/v1/admin/category/${id}`, {
        name: this.infoToEdit.name,
      })
      await this.listCategories()
      this.modalEditar = false
      this.$notify({
        title: 'Succesfull',
        type: 'success',
        text: 'Editado exitosamente',
      })
    },
    async deleteCategory(id) {
      try {
        await this.$axios.delete(`/api/v1/admin/category/${id}`).then((response) => {
          this.$notify({
            title: 'Eliminado!',
            type: 'warn',
            text: 'Categoria Eliminada!',
          })
          this.listCategories()
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
<style scoped>
.tres-puntos {
  width: 230px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.row-categorie {
  display: flex;

  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

@media (max-width: 325px) {
  .tres-puntos {
    width: 160px;
  }
}
</style>
