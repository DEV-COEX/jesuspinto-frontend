<template>
  <div>
    <div class="row-categorie sm:w-[20rem] md:w-[30rem] w-auto">
      <div class="tres-puntos">
        <label id="categoria" class="font-bold uppercase">{{ nombre }}</label>
      </div>
      <div class="flex justify-center items-center">
        <button
          :id="tag.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-blue-300"
          @click="GotoEditar(tag)"
        >
          <img src="@/static/icons/pencil-fill.svg" alt=""/>
        </button>
        <button
          :id="tag.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-blue-300"
          @click="deleteTag(tag.id)"
        >
          <img src="@/static/icons/trash3-fill.svg" alt=""/>
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
