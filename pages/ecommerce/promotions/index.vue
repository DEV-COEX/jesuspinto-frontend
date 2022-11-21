<template>
  <div
    class="flex flex-col w-full sm:pt-15 py-10 sm:pl-10 md:pl-20 pl-5 md:pr-20 sm:pr-10 pr-5 items-center"
  >
    <div class="container flex flex-col w-full">
      <div class="flex mb-4 items-center justify-between">
        <h1 class="text-black font-bold text-xl mr-2">
          Códigos de promociones
        </h1>
        <button-component title="Agregar" @accionBoton="modalAgregar = true" />
      </div>
      <hr class="border rounded-full bg-gray-400 border-gray-400" />
    </div>
    <div class="container flex flex-col w-full items-start md:pl-10 pl-1 pt-5">
      <RowPromos
        v-for="promo in promotions"
        :key="promo.id"
        :nombre="promo.code"
        :discount="promo.discount"
        :active="promo.active"
        :promo="promo"
        @listPromos="listPromos"
      />
    </div>
    <modal-component
      v-model="modalAgregar"
      :titulo="tituloAgregar"
      :text-btn="textBtnAgregar"
      @metodoBoton="createPromo"
    >
      <div class="flex flex-col">
        <InputsForms
          :id="0"
          v-model="code"
          :tipo="'text'"
          :label="'Código de promoción'"
          :placeholder="'Codigo de promoción'"
          :required="'required'"
          class="mr-5 w-96 mb-4"
        />

        <InputsForms
          :id="0"
          v-model="discount"
          :label="'Descuento de la Promoción'"
          :tipo="'number'"
          :placeholder="'Descuento a aplicar'"
          :required="'required'"
          class="mr-5 w-96 border-0 p-0"
        />
      </div>
    </modal-component>
  </div>
</template>

<script>
import RowPromos from '~/components/Promotions/RowPromos.vue'

export default {
  name: 'PromosView',
  components: { RowPromos },
  layout: 'EcommerceLayout',
  data() {
    return {
      code: '',
      discount: 0,
      active: true,
      promotions: [],
      modal: false,
      modalAgregar: false,
      tituloAgregar: 'Codigos',
      textBtnAgregar: 'Agregar',
      tituloEditar: 'Editar Código',
      textBtnEditar: 'Editar',
      modalEditar: false,
    }
  },
  mounted() {
    this.listPromos()
  },
  methods: {
    async listPromos() {
      try {
        await this.$axios.get('/api/v1/admin/prom-code/').then((response) => {
          this.promotions = response.data.promCodes
        })
      } catch (error) {}
    },
    async createPromo() {
      try {
        const payload = {
          code: this.code,
          discount: this.discount,
          active: this.active,
        }

        if (this.discount >= 1 && this.discount <= 100) {
          await this.$axios
            .post('/api/v1/admin/prom-code/', payload)
            .then((response) => {
              this.$notify({
                title: 'Registrar',
                type: 'success',
                text: 'Promoción registrada!',
              })
              this.code = ''
              this.discount = 0
              this.listPromos()
              this.modalAgregar = false
            })
        } else {
          this.$notify({
            title: 'Error al crear',
            type: 'warn',
            text: 'Porcentaje fuera de rango!',
          })
        }
      } catch (error) {}
    },
  },
}
</script>

<style></style>
