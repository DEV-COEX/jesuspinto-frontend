<template>
  <div
    class="bg-white shadow-md rounded-lg flex flex-col items-center px-10 py-5 m-5"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex flex-col w-full"
    >
      <div class="flex items-center">
        <div class="w-1/5 mx-3 text-black text-base font-bold">
          <label for="">{{ item.title }}</label>
        </div>
        <div class="w-full flex p-3 mx-3 items-center justify-between">
          <div class="w-3/4 text-center text-blue-700">
            <span>{{ item.name }}</span>
          </div>
          <div
            class="text-blue-500 hover:text-blue-700 ease-in-out duration-200"
          >
            <nuxt-link :to="item.path">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                />
              </svg>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-if="item.hr" class="w-full px-5 my-3">
        <hr class="border-gray-300" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSecurity',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  //   data() {
  //     return {
  //       items: [
  //         {
  //           name: 'Mis datos',
  //           icon: '/icons/person-fill.svg',
  //           path: '/profile/details',
  //           hr: true,
  //         },
  //         {
  //           name: 'Seguridad',
  //           icon: '/icons/lock-fill.svg',
  //           path: '/profile/security',
  //           hr: true,
  //         },
  //         {
  //           name: 'Direcciones',
  //           icon: '/icons/geo-alt-fill.svg',
  //           path: '/profile/addresses',
  //           hr: false,
  //         },
  //       ],
  //     }
  //   },
};
</script>

<style></style>
