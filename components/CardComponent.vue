<template>
  <div
    class="bg-white shadow-md rounded-lg flex flex-col items-center sm:px-10 px-5 py-5 m-5"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex flex-col w-full"
    >
      <nuxt-link :to="item.path">
        <div class="flex items-center mx-3 text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path :d="item.icon" />
          </svg>
          <!-- <div class="w-1/5 mx-3 text-blue-500">
            <img class="w-1/2" :src="item.icon" :alt="item.name" />
          </div> -->
          <div class="w-full flex p-3 mx-3 items-center justify-between">
            <div class="w-3/4 text-center">
              <span>{{ item.name }}</span>
            </div>
            <div
              class="text-blue-500 hover:text-blue-700 ease-in-out duration-200"
            >
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
            </div>
          </div>
        </div>
        <div v-if="item.hr" class="w-full px-5 my-3">
          <hr class="border-gray-300" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  data() {
    return {
      items: [
        {
          name: 'Mis datos',
          icon: 'M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
          path: '/profile/details',
        },
        {
          name: 'Mis tarjetas',
          icon: 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z',
          path: '/profile/cards',
        },
        {
          name: 'Direcciones',
          icon: 'M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
          path: '/profile/address',
        },
      ],
    };
  },
};
</script>

<style></style>
