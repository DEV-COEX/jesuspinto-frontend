<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center mb-5 pt-5"
  >
    <div class="flex flex-col w-full items-center pb-3">
      <div class="flex w-full items-center">
        <div class="w-full">
          <p
            class="font-bold text-xl sm:text-center md:text-center lg:text-center"
          >
            Datos de cuenta
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col bg-white rounded-xl w-full md:w-1/2 justify-center sm:p-10 md:p-5 p-4 sm:m-10 mt-5 mb-5"
    >
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-col w-full">
          <div class="sm:flex items-center w-full block">
            <div class="sm:mb-0 mb-1 sm:mr-2 text-left w-32">
              <label class="">Email
              </label>
            </div>
            <div
              class="w-full flex lg:p-3 lg:mx-3 items-center justify-between"
            >
              <div class="w-max lg:max-w-max text-center">
                <span class="text-blue-500">{{ user.email }}</span>
              </div>
              <div class="text-blue-500 text-center">
                <nuxt-link to="/profile/change-email">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
          <div class="w-full px-2 lg:px-5 my-3">
            <hr v-if="true" class="border-gray-300" />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-col w-full">
          <div class="sm:flex items-center w-full block">
            <div class="sm:mb-0 mb-1 sm:mr-2 text-left w-32">
              <label class="">Password</label>
            </div>
            <div
              class="w-full flex lg:p-3 lg:mx-3 items-center justify-between"
            >
              <div class="w-max lg:max-w-max text-center">
                <span class="text-blue-500">************</span>
              </div>
              <div class="text-blue-500 text-center">
                <nuxt-link to="/profile/change-password">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
          <div class="w-full px-2 lg:px-5 my-3">
            <hr v-if="true" class="border-gray-300" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full items-center pb-3">
      <div class="flex w-full items-center">
        <div class="w-full items-center">
          <p
            class="font-bold text-xl sm:text-center md:text-center lg:text-center"
          >
            Datos personales
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col bg-white rounded-xl w-full md:w-1/2 justify-center sm:p-10 md:p-5 p-4 sm:m-10 mt-5 mb-5"
    >
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-col w-full">
          <div class="sm:flex items-center w-full block">
            <div class="sm:mb-0 mb-1 sm:mr-2 text-left w-32">
              <label for="" class="">Nombre y Apellido</label>
            </div>
            <div
              class="w-full flex lg:p-3 lg:mx-3 items-center justify-between"
            >
              <div class="w-max lg:max-w-max text-center">
                <span class="text-blue-500"
                  >{{ user.person.name }} {{ user.person.lastname }}</span
                >
              </div>
              <div class="text-blue-500 text-center">
                <!-- <nuxt-link to="/"> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                  />
                </svg>
                <!-- </nuxt-link> -->
              </div>
            </div>
          </div>
          <div class="w-full px-5 my-3">
            <hr v-if="true" class="border-gray-300" />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-col w-full">
          <div class="sm:flex items-center w-full block">
            <div class="sm:mb-0 mb-1 sm:mr-2 text-left w-32">
              <label class="">Telefono</label>
            </div>
            <div
              class="w-full flex lg:p-3 lg:mx-3 items-center justify-between"
            >
              <div class="w-max lg:max-w-max text-center">
                <span class="text-blue-500">{{ user.person.phone }}</span>
              </div>
              <div class="text-blue-500 text-center">
                <!-- <nuxt-link to="/"> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                  />
                </svg>
                <!-- </nuxt-link> -->
              </div>
            </div>
          </div>
          <div class="w-full px-5 my-3">
            <hr v-if="true" class="border-gray-300" />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-col w-full">
          <div class="sm:flex items-center w-full block">
            <div class="sm:mb-0 mb-1 sm:mr-2 text-left w-32">
              <label class="">Ciudad</label>
            </div>
            <div
              class="w-full flex lg:p-3 lg:mx-3 items-center justify-between"
            >
              <div class="w-max lg:max-w-max text-center">
                <span class="text-blue-500">{{
                  user?.person?.sending_addresses[0].city.name
                }}</span>
              </div>
              <div class="text-blue-500 text-center">
                <!-- <nuxt-link to="/"> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                  />
                </svg>
                <!-- </nuxt-link> -->
              </div>
            </div>
          </div>
          <div class="w-full px-5 my-3">
            <hr class="border-gray-300" />
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center w-full">
        <div class="flex flex-col w-full">
          <div class="sm:flex items-center w-full block">
            <div class="sm:mb-0 mb-1 sm:mr-2 text-left w-32">
              <label class="">Direccion</label>
            </div>
            <div
              class="w-full flex lg:p-3 lg:mx-3 items-center justify-between"
            >
              <div class="w-max lg:max-w-max text-center">
                <span class="text-blue-500">{{
                  user?.person?.sending_addresses[0].address
                }}</span>
              </div>
              <div class="text-blue-500 text-center">
                <!-- <nuxt-link to="/"> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                  />
                </svg>
                <!-- </nuxt-link> -->
              </div>
            </div>
          </div>
          <div class="w-full px-5 my-3">
            <hr v-if="true" class="border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDataComponent',
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style></style>
