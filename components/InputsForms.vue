<template>
  <div class="flex flex-col">
    <label for="">{{ label }}</label>
    <input
      :id="id"
      v-model="val"
      class="rounded-md border-1 border-solid border-[#C2C2C2] outline-none placeholder:font-normal placeholder:text-[#757575] placeholder:font-sans focus:border-[#694DF9] active:border-[#E2DCFF] disabled:bg-gray-300"
      :type="tipo"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :min="min"
      :minlength="minlength"
    />
  </div>
</template>

<script>
export default {
  name: 'InputsForms',
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
    tipo: {
      type: String,
      default: 'text',
    },
    number: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: null,
    },
    readonly: {
      type: Boolean,
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Number],
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: String,
      default: null,
    },
    minlength: {
      type: String,
      default: null,
    },
  },
  computed: {
    val: {
      set(value) {
        this.$emit('input', value)
      },
      get() {
        return this.value
      },
    },
  },
}
</script>
