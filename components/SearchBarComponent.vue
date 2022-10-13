<template>
  <div class="flex items-center">
    <div class="flex flex-col my-5 w-full">
      <div class="relative w-full">
        <form class="w-full" @submit.prevent="">
          <input
            class="h-full bg-white border-1 border-gray-200 rounded-lg w-full focus:outline-none shadow-none"
            type="text"
            placeholder="Buscar"
          />
          <button
            type="submit"
            class="absolute top-1 right-1 bg-blue-100 text-blue-500 ease-in-out duration-200 hover:bg-blue-500 hover:text-white h-7 w-7 p-1.5 rounded"
          >
            <span class="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
    <!--<input
      type="text"
      class="focus:outline-none focus:border-none border-none rounded-lg w-4/6 mx-2 h-full"
    />
    <div class="p-2 absolute right-0 w-2/6 flex justify-end">
      <button
        type="button"
        class="bg-blue-100 rounded-lg text-blue-500 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </button>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'SearchBarComponent',
};
</script>

<style scoped></style>
