<template>
  <div class="p-3 flex items-center">
    <div class="sm:ml-5 mr-1 sm:mr-5">
      <svg
        width="30"
        height="30"
        viewBox="0 0 25 25"
        fill="#979697"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00002 7.9999H21C21.6 7.9999 22 7.5999 22 6.9999C22 6.3999 21.6 5.9999 21 5.9999H7.00002C6.40002 5.9999 6.00002 6.3999 6.00002 6.9999C6.00002 7.5999 6.40002 7.9999 7.00002 7.9999ZM21 10.9999H7.00002C6.40002 10.9999 6.00002 11.3999 6.00002 11.9999C6.00002 12.5999 6.40002 12.9999 7.00002 12.9999H21C21.6 12.9999 22 12.5999 22 11.9999C22 11.3999 21.6 10.9999 21 10.9999ZM21 15.9999H7.00002C6.40002 15.9999 6.00002 16.3999 6.00002 16.9999C6.00002 17.5999 6.40002 17.9999 7.00002 17.9999H21C21.6 17.9999 22 17.5999 22 16.9999C22 16.3999 21.6 15.9999 21 15.9999ZM3.70002 6.2999C3.60002 6.1999 3.50002 6.0999 3.40002 6.0999C3.00002 5.8999 2.60002 5.9999 2.30002 6.2999C2.20002 6.3999 2.10002 6.4999 2.10002 6.5999C2.00002 6.8999 2.00002 7.0999 2.10002 7.3999C2.20002 7.4999 2.20002 7.5999 2.30002 7.6999C2.40002 7.7999 2.50002 7.8999 2.60002 7.8999C2.70002 7.9999 2.90002 7.9999 3.00002 7.9999C3.30002 7.9999 3.50002 7.8999 3.70002 7.6999C3.80002 7.5999 3.90002 7.4999 3.90002 7.3999C4.00002 7.0999 4.00002 6.8999 3.90002 6.5999C3.90002 6.4999 3.80002 6.3999 3.70002 6.2999ZM3.70002 11.2999C3.40002 10.9999 3.00002 10.8999 2.60002 11.0999C2.50002 11.1999 2.40002 11.1999 2.30002 11.2999C2.20002 11.3999 2.10002 11.4999 2.10002 11.5999C2.00002 11.7999 2.00002 12.0999 2.10002 12.3999C2.20002 12.4999 2.20002 12.5999 2.30002 12.6999C2.40002 12.7999 2.50002 12.8999 2.60002 12.8999C2.70002 12.9999 2.90002 12.9999 3.00002 12.9999C3.10002 12.9999 3.30002 12.9999 3.40002 12.8999C3.50002 12.7999 3.60002 12.7999 3.70002 12.6999C3.80002 12.5999 3.90002 12.4999 3.90002 12.3999C4.00002 12.1999 4.00002 11.8999 3.90002 11.5999C3.90002 11.4999 3.80002 11.3999 3.70002 11.2999V11.2999ZM3.70002 16.2999C3.60002 16.1999 3.50002 16.0999 3.40002 16.0999C3.20002 15.9999 2.90002 15.9999 2.60002 16.0999C2.50002 16.0999 2.40002 16.1999 2.30002 16.2999C2.20002 16.3999 2.10002 16.4999 2.10002 16.5999C1.90002 16.9999 2.00002 17.3999 2.30002 17.6999C2.40002 17.7999 2.50002 17.8999 2.60002 17.8999C2.70002 17.9999 2.90002 17.9999 3.00002 17.9999C3.10002 17.9999 3.30002 17.9999 3.40002 17.8999C3.50002 17.7999 3.60002 17.7999 3.70002 17.6999C4.00002 17.3999 4.10002 16.9999 3.90002 16.5999C3.90002 16.4999 3.80002 16.3999 3.70002 16.2999Z"
        />
      </svg>
    </div>
    <div>
      <InputsForms
        v-model="infoToEdit.name"
        :disabled="disabled"
        class="sm:w-auto supersm:w-32 w-24"
      />
    </div>

    <div class="flex ml-3">
      <button
        :id="`btn_guardar${subCategoria.id}`"
        class="hidden"
        @click="editSubcategoria(subCategoria)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#5E47D2"
          class="bi bi-check-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
          />
        </svg>
      </button>
      <div class="flex">
        <button
          :id="`btn_edit${subCategoria.id}`"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="habilitarEdit(subCategoria)"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill"
            viewBox="0 0 16 16">
            <path
              d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </button>
        <button
          :id="`btn_delete${subCategoria.id}`"
          class="p-2 rounded-lg duration-300 ease-in-out hover:bg-[#A39410] hover:text-white  text-[#A39410]"
          @click="deleteSubCategoria(subCategoria)"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill"
            viewBox="0 0 16 16">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: 'sin categoria',
    },
    idCategoria: {
      type: Number,
      default: 0,
    },
    subCategoria: {
      type: Object,
      default() {
        return {
          id: '',
          name: '',
          category_id: '',
          created_by: null,
          updated_by: null,
          created_at: '',
          updated_at: '',
          deleted_at: null,
          subCategoria: [],
        }
      },
    },
  },
  data() {
    return {
      disabled: true,
      infoToEdit: {},
    }
  },
  mounted() {
    this.infoToEdit = Object.assign({}, this.subCategoria)
  },
  methods: {
    listCategories() {
      this.$emit('listCategories')
    },
    habilitarEdit(subCategoria) {
      const idGuardar = `btn_guardar${subCategoria.id}`
      const idEdit = `btn_edit${subCategoria.id}`
      const idDelete = `btn_delete${subCategoria.id}`
      if (this.disabled === true) {
        this.disabled = false
        document.getElementById(idGuardar).style.display = 'flex'
        document.getElementById(idEdit).style.display = 'none'
        document.getElementById(idDelete).style.display = 'none'
      } else {
        this.disabled = true
      }
    },
    async editSubcategoria(subCategoria) {
      const idGuardar = `btn_guardar${subCategoria.id}`
      const idEdit = `btn_edit${subCategoria.id}`
      const idDelete = `btn_delete${subCategoria.id}`
      const id = this.infoToEdit.id
      await this.$axios.put(`api/v1/admin/subcategories/${id}`, {
        name: this.infoToEdit.name,
        category_id: this.idCategoria,
      })
      document.getElementById(idGuardar).style.display = 'none'
      document.getElementById(idEdit).style.display = 'flex'
      document.getElementById(idDelete).style.display = 'flex'
      this.disabled = true
      this.$notify({
        title: 'Succesfull',
        type: 'success',
        text: 'Editado exitosamente',
      })
    },
    async deleteSubCategoria() {
      const id = this.infoToEdit.id
      await this.$axios.delete(`api/v1/admin/subcategories/${id}`)
      this.listCategories()
      this.$notify({
        title: 'Succesfull',
        type: 'success',
        text: 'Eliminado exitosamente',
      })
    },
  },
}
</script>

<style scoped></style>
