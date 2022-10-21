<template>
  <button
    v-if="show"
    class="boton border border-black hover:border-white ease-in-out duration-500 text-black hover:text-white py-2 rounded-xl w-max px-5 my-5 hover:bg-[#A7AA00]"
    :type="type"
    @click="accionBoton"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  methods: {
    accionBoton() {
      this.$emit('accionBoton', true);
    },
  },
};
</script>

<style>
.boton{
 
  position: relative;
}
.boton:before {
  content:"";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0px;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 2s ease;
}
.boton:hover:before {
width: 100%;
}</style>
