<template>
  <div class="flex flex-col w-full sm:pt-15 pt-10 sm:pl-20 pl-5 sm:pr-20 py-10 pr-5 items-center">
    <form class="w-full" @submit.prevent="createProduct">
      <section class="block mb-10">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Agregar producto</h1>
          <ButtonComponent
            :show="true"
            :title="'Agregar'"
            :type="'submit'"

          />
        </div>
        <hr class="border rounded-full gb-gray-400 border-gray-400"/>
      </section>
      <div class="flex justify-center lg:flex-row flex-col">
        <div
          class="flex flex-col lg:w-3/5 w-full bg-white rounded-xl p-10 mr-10 shadow-2xl"
        >
          <div class="flex md:flex-row flex-col">
            <div class="md:w-1/2 w-full mr-4 flex flex-col">
              <div class="w-full flex flex-col">
                <label
                  class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                  for="file_input"
                >Imagen principal</label
                >
                <input
                  id="file_input"
                  ref="principalImg"
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  type="file"
                  required
                  @change="previewImg"
                />
                <p
                  id="file_input_help"
                  class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                >
                  SVG, PNG, JPG o GIF (MAX. 800x400px).
                </p>
              </div>
              <div class="w-full h-full border-0">
                <img id="imgPreview" class="w-full h-full"/>
              </div>
            </div>
            <div class="md:w-1/2 w-full flex flex-col">
              <InputsForms
                :id="'nomProduct'"
                v-model="name"
                :placeholder="'Nombre del producto'"
                :tipo="'text'"
                :label="'Nombre del producto'"
                class="pb-4"
              ></InputsForms>
              <InputsForms
                :id="'serial'"
                v-model="serial"
                :placeholder="'Serial'"
                :tipo="'text'"
                :label="'Serial'"
                class="pb-4"
              ></InputsForms>
              <InputsForms
                :id="'quantity'"
                v-model="quantity"
                :placeholder="'Cantidad disponible'"
                :tipo="'number'"
                :label="'Cantidad disponible'"
                class="pb-4"
              ></InputsForms>
              <InputsForms
                :id="'price'"
                v-model="price"
                class="pb-4"
                :placeholder="'Precio'"
                :tipo="'number'"
                :label="'Valor del producto'"
              ></InputsForms>
            </div>
          </div>
          <div class="flex flex-col mt-5">
            <label for="" class="font-bold text-lg"
            >Descripcion del producto</label
            >
            <textarea
              id=""
              v-model="description"
              placeholder="Descripción del producto"
              cols="30"
              rows="5"
              class="rounded-xl border-gray-400"
            ></textarea>
          </div>
        </div>
        <div class="lg:w-2/5 w-full lg:mt-0 bg-white rounded-xl p-10  shadow-2xl">
          <div class="flex flex-col">
            <div
              class="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between w-full items-center"
            >
              <label for="" class="font-bold text-xl w-3/5"
              >Imagenes del producto
              </label>
              <div
                class="flex bg-blue-600 w-10 h-10 rounded-lg items-center justify-center"
              >
                <div class="flex justify-center items-center w-full h-10">
                  <label
                    for="dropzone-file"
                    class="flex flex-col justify-center items-center w-full h-full bg-blue-600 rounded-lg border-2 cursor-pointer hover:bg-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#FFFF"
                      class="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                      />
                    </svg>
                    <input
                      id="dropzone-file"
                      ref="images"
                      type="file"
                      class="hidden"
                      multiple
                      @change="previewImages"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="">
              <div v-if="images.length > 0" class="flex w-full mt-4  rounded-lg  bg-gray-200 overflow-x-scroll scroll-smooth hover:scroll-auto">
                <img
                v-for="(image, index) in images"
                :id="`imagesPreview-${image.name}`"
                :key="index"
                :src="`${image}`"
                class="flex p-3 w-1/4 rounded"
                alt="Imagen del producto"/>
            </div>
            </div>
             
            
          </div>
          <div class="flex flex-col my-2">
            <label for="categories" class="text-sm font-bold text-gray-600 mt-3"
            >Categoría</label
            >
            <select
              id="categories"
              v-model="category"
              class="border-gray-300 border-2 bg-white text-sm text-gray-600 font-medium focus:outline-none focus:border-blue-800 rounded-lg block p-2"
              name="categories"
              @change="listSubCategories()"
            >
              <option value="0" disabled>Seleccione una categoria</option>
              <option
                v-for="data in categories"
                :key="data.id"
                :value="data.id"
              >
                {{ data.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col my-2">
            <label for="" class="text-sm font-bold text-gray-600 mt-3"
            >Subcategoría</label
            >
            <select
              id="subcategories"
              v-model="subcategory"
              class="border-gray-300 border-2 bg-white font-medium text-sm text-gray-600 focus:outline-none focus:border-blue-800 rounded-lg block p-2"
              name="subcategories"
            >
              <option value="0" disabled>Seleccione una subcategoria</option>
              <option
                v-for="data in subcategories"
                :key="data.id"
                :value="data.id"
              >
                {{ data.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-col my-2">
              <label for="categories" class="text-sm font-bold text-gray-600 mt-3"
              >Tags</label
              >
              <select
                id="tags"
                class="border-gray-300 border-2 bg-white text-sm text-gray-600 font-medium focus:outline-none focus:border-blue-800 rounded-lg block p-2"
                name="tags"
                multiple
              >
                <option value="0" disabled>Seleccione los tags</option>
                <option
                  v-for="data in tags"
                  :key="data.id"
                  :value="data.id"
                  @click="addTag(data)"
                >
                  {{ data.name }}
                </option>
              </select>
            </div>
            <div class="flex flex-col my-2">
              <label
                v-if="tagsProduct.length > 0"
                for="tags"
                class="text-sm font-bold text-gray-600 mt-3"
              >Listado de tags</label
              >
              <div
                v-for="data in tagsComputed"
                :key="data.id"
                class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-3"
                role="alert"
              >
                <strong class="font-bold">{{ data.name }}</strong>
                <span
                  class="absolute top-0 bottom-0 right-0 px-4 py-3"
                  @click="removeTag(data)"
                >
                <svg
                  class="fill-current h-6 w-6 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Eliminar</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  />
                </svg>
              </span>
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <label class="font-bold text-gray-600">Destacado</label>
              <div class="flex">
                <ButtonComponent
                  :class="
                    isFeatured === 1
                      ? 'bg-black text-white'
                      : 'text-[black] hover:bg-black hover:text-white focus:ring-black border-black'
                      "
                  class="focus:outline-none border-2 border-black mx-2 hover:bg-black font-medium rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2 ease-in-out duration-200"
                  :show="true"
                  :type="'button'"
                  :title="'Sí'"
                  @accionBoton="featuredProduct(1)"
                ></ButtonComponent>
                <ButtonComponent
                  :class="
                    isFeatured === 0
                      ? 'bg-red-600  text-white'
                      : 'text-red-600  hover:bg-red-600  focus:ring-blue-300'
                  "
                  class="focus:outline-none border-2 font-medium border-red-600 rounded-lg text-sm md:px-5 px-2 py-2.5 mb-2 hover:bg-red-600"
                  :type="'button'"
                  :show="true"
                  :title="'No'"
                  @accionBoton="featuredProduct(0)"
                ></ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateProductView',
  layout: 'EcommerceLayout',
  data: () => ({
    description: '',
    category: 0,
    categories: [],
    subcategory: 0,
    subcategories: [],
    tagsProduct: [],
    tags: [],
    tags_id: [],
    img: [],
    files: [],
    name: '',
    serial: '',
    price: 0,
    quantity: 0,
    featured: 0,
    images: [],
    isFeatured: 0,
  }),
  computed: {
    tagsComputed() {
      return this.tagsProduct
    },
  },
  mounted() {
    this.initFunctions()
  },
  methods: {
    onFeatured() {
      if (this.isFeatured === 0) {
        this.isFeatured = 1
      } else {
        this.isFeatured = 0
      }
    },
    previewImg() {
      const file = this.$refs.principalImg.files[0]
      const imgPreview = document.getElementById('imgPreview')
      if (!/\.(jpe?g|png|gif|svg)$/i.test(file?.name)) {
        const extension = file?.name.split('.')
        this.$notify({
          title: 'Ups!',
          type: 'warn',
          text: `Los archivos ${extension?.at(-1).toUpperCase()} no están permitidos`,
        })
        this.$refs.principalImg.value = null;
        // imgPreview.src 
         return
      }
      this.img = file
      const reader = new FileReader()
      
      reader.onload = (event) => {
        imgPreview.src = event.target.result
      }

      if(file){
        reader.readAsDataURL(file)
      }
      
      
    },
    previewImages() {
      const files = this.$refs.images.files
      const array = Array.from(files)
      array.forEach((element) => {
        if (!/\.(jpe?g|png|gif|svg)$/i.test(element.name)) {
          const extension = element.name.split('.')
          this.$notify({
            title: 'Ups!',
            type: 'warn',
            text: `Los archivos ${extension.at(-1).toUpperCase()} no están permitidos`,
          })
          return
        }
        this.images.push(element)
      })
      this.images.forEach((element) => {
        const reader = new FileReader()
        const name = element.name
        reader.onload = (event) => {
          document.getElementById(`imagesPreview-${name}`).src =
            event.target.result
        }
        reader.readAsDataURL(element)
      })
    },
    async initFunctions() {
      await this.listCategories()
      await this.listTags()
    },
    addTag(tag) {
      if (this.tagsProduct.includes(tag)) {
        this.tagsProduct = this.tagsProduct.filter((t) => t.id !== tag.id)
        this.tags_id = this.tags_id.filter((t) => t !== tag.id)
      } else {
        this.tagsProduct.push(tag)
        this.tags_id.push(tag.id)
      }
    },
    removeTag(tag) {
      this.tagsProduct = this.tagsProduct.filter((item) => item.id !== tag.id)
      this.tags_id = this.tags_id.filter((item) => item !== tag.id)
    },
    async listTags() {
      const {data} = await this.$axios.get('/api/v1/tag/')
      this.tags = data
    },
    async listCategories() {
      const {data} = await this.$axios.get('/api/v1/category/')
      this.categories = data
    },
    async listSubCategories() {
      const {data} = await this.$axios.get(
        '/api/v1/category/subcategories',
        {
          params: {
            category_id: this.category,
          },
        }
      )
      this.subcategories = data.subcategories
    },
    featuredProduct(state) {
      this.featured = state
      this.onFeatured();
    },
    async createProduct() {
      try {
        const payload = new FormData()
        payload.append('image', this.img)
        payload.append('name', this.name)
        payload.append('serial', this.serial)
        payload.append('description', this.description)
        payload.append('price', this.price)
        payload.append('quantity', this.quantity)
        payload.append('subcategory_id', this.subcategory)
        payload.append('image', this.img)
        payload.append('featured', this.featured)
        // this.images.forEach((element) => {
        //   payload.append('images[]', element, `${element.name}`)
        // })
        for (let i = 0; i < this.images.length; i++) {
          payload.append('images[]', this.images[i])
        }
        // return console.log('hola: ', payload.getAll('images[]'))
          await this.$axios
          .post('/api/v1/admin/product/', payload, {
            params: {
              tags: this.tags_id,
            },
          })
          .then((response) => {
            this.$notify({
              title: 'Registro exitoso',
              type: 'success',
              text: 'Producto registrado correctamente!',
            })
            this.$router.push('/ecommerce/products/')
          })
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error?.response?.data?.error || 'Error desconocido',
        })
      }
    },
  },
}
</script>
