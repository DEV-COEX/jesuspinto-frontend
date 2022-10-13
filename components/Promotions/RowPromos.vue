<template>
  <div>
    <div class="row-categorie sm:w-[20rem] md:w-[30rem] w-auto">
      <div class="tres-puntos">
        <div class="flex flex-col">
          <label id="promo" class="font-bold uppercase"
            >Código: {{ nombre }}</label
          >
          <label id="promo" class="font-bold uppercase"
            >Descuento: {{ discount }} %</label
          >
          <label
            :id="promo.id"
            for="small-toggle"
            class="inline-flex relative items-center mb-5 cursor-pointer"
            :class="isLoading === true ? 'animate-pulse' : ''"
            @click="editPromoCode(promo)"
          >
            <input
              :id="promo.id"
              type="checkbox"
              :checked="actived"
              class="sr-only peer"
            />
            <div
              class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"
            ></div>
          </label>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button
          :id="promo.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-blue-300"
          @click="GotoEditar(promo)"
        >
          <img src="@/static/icons/pencil-fill.svg" alt="" />
        </button>
        <button
          :id="promo.id"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-blue-300"
          @click="deletePromo(promo.id)"
        >
          <img src="@/static/icons/trash3-fill.svg" alt="" />
        </button>
      </div>
    </div>

    <modal-component
      v-model="modalEditar"
      :titulo="tituloEditar"
      :text-btn="textBtnEditar"
      @metodoBoton="editPromo()"
    >
      <div class="flex flex-col">
        <InputsForms
          v-model="infoToEdit.code"
          :label="'Código de promoción'"
          class="mb-4"
        />
        <InputsForms
          v-model="infoToEdit.discount"
          :label="'Descuento de la Promoción'"
        />
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
      default: () => {},
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
      if (this.actived === true) {
        this.activo = false
        await this.$axios.put(`/api/v1/admin/prom-code/${promocion.id}`, {
          code: promocion.code,
          discount: promocion.discount,
          active: this.activo,
        })
        await this.listPromos()
      } else {
        this.activo = true
        await this.$axios.put(`/api/v1/admin/prom-code/${promocion.id}`, {
          code: promocion.code,
          discount: promocion.discount,
          active: this.activo,
        })
        await this.listPromos()
      }
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
