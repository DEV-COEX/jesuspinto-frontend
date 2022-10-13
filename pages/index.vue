<template>
  <div class="w-screen h-screen erp flex items-center justify-center">
    <div class="grid-cols-2 grid grid-rows-2 gap-2 md:flex md:gap-6">
      <nuxt-link class="flex flex-col col-span-1 ease-in-out duration-200 hover:mx-5" to="/">
        <div
          class="h-36 w-36 icon-ecommerce rounded-lg border-2 border-white flex items-center justify-center fade-in">
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M52 52C48.3925 52 45.5 54.8925 45.5 58.5C45.5 60.2239 46.1848 61.8772 47.4038 63.0962C48.6228 64.3152 50.2761 65 52 65C53.7239 65 55.3772 64.3152 56.5962 63.0962C57.8152 61.8772 58.5 60.2239 58.5 58.5C58.5 54.8925 55.575 52 52 52ZM0 0V6.5H6.5L18.2 31.1675L13.78 39.13C13.2925 40.04 13 41.1125 13 42.25C13 43.9739 13.6848 45.6272 14.9038 46.8462C16.1228 48.0652 17.7761 48.75 19.5 48.75H58.5V42.25H20.865C20.6495 42.25 20.4428 42.1644 20.2905 42.012C20.1381 41.8597 20.0525 41.653 20.0525 41.4375C20.0525 41.275 20.085 41.145 20.15 41.0475L23.075 35.75H47.2875C49.725 35.75 51.87 34.385 52.975 32.4025L64.61 11.375C64.8375 10.855 65 10.3025 65 9.75C65 8.88805 64.6576 8.0614 64.0481 7.4519C63.4386 6.84241 62.612 6.5 61.75 6.5H13.6825L10.6275 0M19.5 52C15.8925 52 13 54.8925 13 58.5C13 60.2239 13.6848 61.8772 14.9038 63.0962C16.1228 64.3152 17.7761 65 19.5 65C21.2239 65 22.8772 64.3152 24.0962 63.0962C25.3152 61.8772 26 60.2239 26 58.5C26 54.8925 23.075 52 19.5 52Z"
              fill="url(#paint0_linear_1017_38319)"/>
            <defs>
              <linearGradient
                id="paint0_linear_1017_38319" x1="32.5" y1="0" x2="32.5" y2="65"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="white" stop-opacity="0.9" offset="0"/>
                <stop offset="1" stop-color="white" stop-opacity="0.63"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="text-center text-xs text-white font-bold mt-2">Comprar</span>
      </nuxt-link>
      <nuxt-link class="flex flex-col col-span-1 ease-in-out duration-200 hover:mx-5" to="/ecommerce">
        <div
          class="h-36 w-36 icon-purchase rounded-lg border-2 border-white flex items-center justify-center">
          <svg width="72" height="48" viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0H72V48H0V0ZM36 12C39.1826 12 42.2348 13.2643 44.4853 15.5147C46.7357 17.7652 48 20.8174 48 24C48 27.1826 46.7357 30.2348 44.4853 32.4853C42.2348 34.7357 39.1826 36 36 36C32.8174 36 29.7652 34.7357 27.5147 32.4853C25.2643 30.2348 24 27.1826 24 24C24 20.8174 25.2643 17.7652 27.5147 15.5147C29.7652 13.2643 32.8174 12 36 12M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16V32C10.1217 32 12.1566 32.8429 13.6569 34.3431C15.1571 35.8434 16 37.8783 16 40H56C56 37.8783 56.8429 35.8434 58.3431 34.3431C59.8434 32.8429 61.8783 32 64 32V16C61.8783 16 59.8434 15.1571 58.3431 13.6569C56.8429 12.1566 56 10.1217 56 8H16Z"
              fill="url(#paint0_linear_1017_38320)"/>
            <defs>
              <linearGradient
                id="paint0_linear_1017_38320" x1="36" y1="0" x2="36" y2="48"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#FEFCF5" offset="0"/>
                <stop offset="1" stop-color="#FEFCF5" stop-opacity="0.8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="text-center mt-2 text-sm font-bold text-white">Ecommerce</span>
      </nuxt-link>
      <nuxt-link class="flex flex-col col-span-1 ease-in-out duration-200 hover:mx-5" to="/">
        <div
          class="h-36 w-36 icon-warehouse rounded-lg border-2 border-white flex items-center justify-center">
          <svg width="53" height="65" viewBox="0 0 53 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M53 0V11.8182H0V0H53ZM2.94444 14.7727H50.0556V53.1818H2.94444V14.7727ZM17.6667 29.5455H35.3333V25.1136C35.3333 24.2864 34.6856 23.6364 33.8611 23.6364H19.1389C18.3144 23.6364 17.6667 24.2864 17.6667 25.1136V29.5455ZM11.7778 65H17.6667V59.0909H11.7778V65ZM23.5556 65H29.4444V59.0909H23.5556V65ZM35.3333 65H41.2222V59.0909H35.3333V65Z"
              fill="url(#paint0_linear_1017_38321)"/>
            <defs>
              <linearGradient
                id="paint0_linear_1017_38321" x1="26.5" y1="0" x2="26.5" y2="65"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFFCF5" offset="0"/>
                <stop offset="1" stop-color="#FFFCF5" stop-opacity="0.8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="text-center mt-2 text-sm font-bold text-white">Inventario</div>
      </nuxt-link>
      <nuxt-link class="flex flex-col col-span-1 ease-in-out duration-200 hover:mx-5" to="/">
        <div
          class="h-36 w-36 icon-selling rounded-lg border-2 border-white flex items-center justify-center">
          <svg width="68" height="61" viewBox="0 0 68 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 47.4444H68V61H0V47.4444ZM14.45 13.5556H23.8V10.1667H13.6V0H40.8V10.1667H30.6V13.5556H53.72C57.12 13.5556 60.52 16.9444 61.2 20.3333L62.9 44.0556H5.1L6.97 20.3333C6.97 16.9444 10.37 13.5556 14.45 13.5556ZM37.4 20.3333V27.1111H54.4V20.3333H37.4ZM13.6 20.3333V23.7222H20.4V20.3333H13.6ZM23.8 20.3333V23.7222H30.6V20.3333H23.8ZM13.6 27.1111V30.5H20.4V27.1111H13.6ZM23.8 27.1111V30.5H30.6V27.1111H23.8ZM13.6 33.8889V37.2778H20.4V33.8889H13.6ZM23.8 33.8889V37.2778H30.6V33.8889H23.8ZM17 3.38889V6.77778H37.4V3.38889H17Z"
              fill="url(#paint0_linear_1017_38322)"/>
            <defs>
              <linearGradient
                id="paint0_linear_1017_38322" x1="34" y1="0" x2="34" y2="61"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="white" offset="0"/>
                <stop offset="1" stop-color="white" stop-opacity="0.8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="text-center mt-2 text-sm font-bold text-white">Ventas</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
<style>
.erp {
  background-image: url('assets/backgrounds/fondo-erp.jpg');
  background-position: center;
  background-size: cover;
}

.icon-ecommerce {
  background: linear-gradient(135.15deg, #9747FF 49.57%, #4D31E4 101.97%)
}

.icon-ecommerce:hover {
  background: linear-gradient(136deg, #9747ff, #4d31e4);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 4s ease infinite;
  -moz-animation: AnimationName 4s ease infinite;
  animation: AnimationName 4s ease infinite;
}

.icon-purchase {
  background: linear-gradient(135.15deg, #38CDEE 49.57%, #3376DB 101.97%);
}

.icon-purchase:hover {
  background: linear-gradient(135.15deg, #38CDEE, #3376DB);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 4s ease infinite;
  -moz-animation: AnimationName 4s ease infinite;
  animation: AnimationName 4s ease infinite;
}

.icon-warehouse {
  background: linear-gradient(135.15deg, #6DF493 49.57%, #26A74A 101.97%);
}

.icon-warehouse:hover {
  background: linear-gradient(135.15deg, #6DF493, #26A74A);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 4s ease infinite;
  -moz-animation: AnimationName 4s ease infinite;
  animation: AnimationName 4s ease infinite;
}

.icon-selling {
  background: linear-gradient(135.15deg, #FFD747 49.57%, #E47131 101.97%);
}

.icon-selling:hover {
  background: linear-gradient(135.15deg, #FFD747, #E47131);
  background-size: 400% 400%;
  -webkit-animation: AnimationName 4s ease infinite;
  -moz-animation: AnimationName 4s ease infinite;
  animation: AnimationName 4s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0 0
  }
  50% {
    background-position: 93% 100%
  }
  100% {
    background-position: 0 0
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 0 0
  }
  50% {
    background-position: 93% 100%
  }
  100% {
    background-position: 0 0
  }
}

@keyframes AnimationName {
  0% {
    background-position: 0 0
  }
  50% {
    background-position: 93% 100%
  }
  100% {
    background-position: 0 0
  }
}
</style>
