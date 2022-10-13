<template>
  <div>
    <div class="row-categorie sm:w-[20rem] md:w-[30rem] w-auto">
      <div class="tres-puntos">
        <label id="categoria" class="font-bold uppercase">{{ nombre }}</label>
      </div>
      <div class="flex justify-center items-center">
        <button
          :id="categoria.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-blue-300"
          @click="GotoEditar(categoria)"
        >
          <img src="@/static/icons/pencil-fill.svg" alt="" />
        </button>
        <button
          :id="categoria.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-blue-300"
          @click="deleteCategory(categoria.id)"
        >
          <img src="@/static/icons/trash3-fill.svg" alt="" />
        </button>
        <button
          class="rounded-md hover:bg-blue-400 text-blue-800 hover:text-white ease-in-out duration-200 p-2"
          @click="GoToCollapse()"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 110 60"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.78126 3.33664C4.24632 1.80172 6.2331 0.939453 8.3047 0.939453C10.3763 0.939453 12.3631 1.80172 13.8281 3.33664L52.5 43.8648L91.1719 3.33664C92.6453 1.84522 94.6188 1.01997 96.6672 1.03862C98.7156 1.05728 100.675 1.91835 102.124 3.43638C103.572 4.95441 104.394 7.00793 104.412 9.15467C104.429 11.3014 103.642 13.3696 102.219 14.9138L58.0234 61.2305C56.5584 62.7654 54.5716 63.6276 52.5 63.6276C50.4284 63.6276 48.4416 62.7654 46.9766 61.2305L2.78126 14.9138C1.31664 13.3784 0.493866 11.2962 0.493866 9.1252C0.493866 6.95417 1.31664 4.87203 2.78126 3.33664V3.33664Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="sm:p-4">
      <CollapseCategorie
        v-model="collapse"
        :subcategoria="categoria"
        :id-categoria="categoria.id"
        @listCategories="listCategories"
      />
    </div>

    <modal-component
      v-model="modalEditar"
      :titulo="tituloEditar"
      :text-btn="textBtnEditar"
      @metodoBoton="editCategory()"
    >
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
