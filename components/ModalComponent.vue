<template>
  <div v-if="state" class="centrar fondo-modal z-50" style="left: 0">
    <div class="modal-principal">
      <div class="separar">
        <label class="font-bold text-base py-4 ml-5">{{ titulo }}</label>
        <button
          type=""
          class="btn-cerrar text-gray-400 bg-transparent hover:bg-gray-200 hover:text-[#5E47D2] rounded-lg text-sm p-1.5 justify-center inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="cerrarModal"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.95853 5.29289C7.56801 5.68342 7.56801 6.31658 7.95854 6.70711L11.7408 10.4894C11.9068 10.6553 12 10.8804 12 11.1151V11.1151C12 11.6038 11.6038 12 11.1151 12V12C10.8804 12 10.6553 11.9068 10.4894 11.7408L6.70711 7.95853C6.31658 7.56801 5.68342 7.56801 5.29289 7.95854L1.51061 11.7408C1.34466 11.9068 1.11958 12 0.884893 12V12C0.396181 12 0 11.6038 0 11.1151V11.1151C0 10.8804 0.0932295 10.6553 0.259179 10.4894L4.04147 6.70711C4.43199 6.31658 4.43199 5.68342 4.04146 5.29289L0.259179 1.51061C0.0932292 1.34466 0 1.11958 0 0.884894V0.884894C0 0.39618 0.39618 0 0.884894 0V0C1.11958 0 1.34466 0.0932296 1.51061 0.259179L5.29289 4.04147C5.68342 4.43199 6.31658 4.43199 6.70711 4.04146L10.4894 0.259179C10.6553 0.0932291 10.8804 0 11.1151 0V0C11.6038 0 12 0.396181 12 0.884893V0.884893C12 1.11958 11.9068 1.34466 11.7408 1.51061L7.95853 5.29289Z"
              fill="#5E47D2"
            />
          </svg>
        </button>
      </div>
      <div class="px-6">
        <div class="centrar px-3 pb-8">
          <slot></slot>
        </div>
        <div
          class="flex items-center justify-between border-2 border-transparent border-t-indigo-500"
        ></div>
        <div class="end ">
          <button-component :title=textBtn   @accionBoton="metodoBoton"/>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    disabled: {
      type: Boolean,
    },
    titulo: {
      type: String,
      default: 'Modal',
    },
    textBtn: {
      type: String,
      default: 'button',
    },
    value: {
      type: Boolean,
      default: false,
    },
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
    cerrarModal() {
      this.state = false
    },
    metodoBoton() {
      this.$emit('metodoBoton')
    },
  },
}
</script>

<style scoped>
.modal-principal {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 6px #88888861;
  border-radius: 8px;
  /* display: grid; */
}

.btn-cerrar {
  right: 0;
  top: 13px;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  position: relative;
}

.fondo-modal {
  height: 100vh;
  width: 100vw;
  background-color: rgb(131 131 131 / 50%);
  position: fixed;
  top: 0;
}

/*ajuste en pantalla*/
.centrar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.separar {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem;
}

.end {
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
  align-self: center;
}
</style>
