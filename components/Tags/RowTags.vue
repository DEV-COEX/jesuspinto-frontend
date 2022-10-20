<template>
  <div>
    <div class="row-categorie sm:w-[20rem] md:w-[30rem] w-auto">
      <div class="tres-puntos">
        <label id="categoria" class="font-bold uppercase">{{ nombre }}</label>
      </div>
      <div class="flex justify-center items-center">
        <button
          :id="tag.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="GotoEditar(tag)"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill"
            viewBox="0 0 16 16">
            <path
              d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </button>
        <button
          :id="tag.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="deleteTag(tag.id)"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill"
            viewBox="0 0 16 16">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </button>
      </div>
    </div>


    <modal-component
      v-model="modalEditar"
      :titulo="tituloEditar"
      :text-btn="textBtnEditar"
      @metodoBoton="editTag()"
    >
      <InputsForms v-model="infoToEdit.name"/>
    </modal-component>
  </div>
</template>

<script>
export default {
  name: 'RowTags',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    nombre: {
      type: String,
      default: 'sin Nombre',
    },
    idTag: {
      type: Number,
      default: 0,
    },
    idCollapse: {
      type: Boolean,
      default: false,
    },
    tag: {
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
        }
      },
    },
  },
  data() {
    return {
      tituloEditar: 'Editar Tag',
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
    async listTags() {
      await this.$emit('listTags')
    },
    async editTag() {
      const id = this.infoToEdit.id
      await this.$axios.put(`/api/v1/admin/tag/${id}`, {
        name: this.infoToEdit.name,
      })
      await this.listTags()
      this.modalEditar = false
      this.$notify({
        title: 'Succesfull',
        type: 'success',
        text: 'Editado exitosamente',
      })
    },
    async deleteTag(id) {
      try {
        await this.$axios.delete(`/api/v1/admin/tag/${id}`)
          .then(() => {
            this.$notify({
              title: 'Eliminado',
              type: 'warn',
              text: 'Etiqueta eliminada',
            })
          }).then(async () => {
            await this.listTags()
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
