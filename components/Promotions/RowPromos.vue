<template>
  <div>
    <div class="row-categorie sm:w-[20rem] md:w-[30rem] w-auto">
      <div class="tres-puntos">
        <div class="flex flex-col">
          <label id="promo" class="font-bold uppercase">Código: {{ nombre }}</label>
          <label id="promo" class="font-bold uppercase">Descuento: {{ discount }} %</label>
          <label :id="promo.id" for="small-toggle" class="inline-flex relative items-center mb-5 cursor-pointer"
            :class="isLoading === true ? 'animate-pulse' : ''" @click="editPromoCode(promo)">
            <input :id="promo.id" type="checkbox" :checked="actived" class="sr-only peer" />
            <div
              class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500">
            </div>
          </label>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button :id="promo.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="GotoEditar(promo)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill"
            viewBox="0 0 16 16">
            <path
              d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </button>
        <button :id="promo.id" class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="deletePromo(promo.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill"
            viewBox="0 0 16 16">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </button>
      </div>
    </div>

    <modal-component v-model="modalEditar" :titulo="tituloEditar" :text-btn="textBtnEditar" @metodoBoton="editPromo()">
      <div class="flex flex-col">
        <InputsForms v-model="infoToEdit.code" :label="'Código de promoción'" class="mb-4" />
        <InputsForms v-model="infoToEdit.discount" :label="'Descuento de la Promoción'" />
      </div>
    </modal-component>
  </div>
</template>

<script>
export default {
  name: 'RowPromos',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    nombre: {
      type: String,
      default: 'sin Nombre',
    },
    discount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
      default: 0,
    },
    idPromo: {
      type: Number,
      default: 0,
    },
    idCollapse: {
      type: Boolean,
      default: false,
    },
    promo: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      tituloEditar: 'Editar Promoción',
      textBtnEditar: 'Editar',
      modalEditar: false,
      infoToEdit: {},
      collapse: false,
      subcategoria: {},
      activo: false,
      isLoading: false,
    }
  },
  computed: {
    actived() {
      if (this.active === 1) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    GotoEditar(data) {
      this.infoToEdit = Object.assign({}, data)
      this.modalEditar = true
    },
    listPromos() {
      this.$emit('listPromos')
    },
    async editPromoCode(promocion) {
      this.isLoading = true
      this.activo = !this.activo
      await this.$axios.put(`/api/v1/admin/prom-code/${promocion.id}`, {
          code: promocion.code,
          discount: promocion.discount,
          active: this.activo,
        })
      await this.listPromos()
      this.isLoading = false
    },
    async editPromo() {
      const payload = {
        code: this.infoToEdit.code,
        discount: this.infoToEdit.discount,
        active: this.infoToEdit.active,
      }
      await this.$axios.put(`/api/v1/admin/prom-code/${this.infoToEdit.id}`, payload)
      await this.listPromos()
      this.modalEditar = false
      this.$notify({
        title: 'Succesfull',
        type: 'success',
        text: 'Editado exitosamente',
      })
    },
    async deletePromo(id) {
      try {
        await this.$axios.delete(`/api/v1/admin/prom-code/${id}`).then((response) => {
          this.$notify({
            title: 'Eliminado!',
            type: 'warn',
            text: 'Promoción Eliminada!',
          })
          this.listPromos()
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
