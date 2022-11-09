<template>
  <!-- h-[1122px] w-[793px] -->
  <div class="p-0 sm:p-10">

    <header>
      <div class="flex justify-between relative mb-24">
        <div class="first flex">
          <div>
            <img src="" class="w-36 h-28 bg-gray-500" />
          </div>
          <div class="flex flex-wrap flex-col justify-end  mx-8 text-xs font-bold sm:text-base">
            <div>
              <span>Factura de venta</span>
            </div>
            <div>
              <span>Num: D4T0</span>
            </div>
            <div>
              <span>fecha de generacion: 31/02/2021 07:00:19</span>
            </div>
            <div>
              <span>Responsable de Iva</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-end text-right text-xs font-bold max-w-[25%] sm:text-base">
          <span class="text-end">AGENTE RETENEDOR DE IVA O-23 ACTIVIDAD ECONOMICA 4771</span>
        </div>

        <div class="absolute right-0 font-bold">
          <span>pagina 1 de 1</span>
        </div>
      </div>

    </header>

    <div class="flex flex-wrap gap-28">

      <div class="flex flex-wrap w-full gap-8">
        <div class="w-full p-2 rounded-xl bg-[#F6F6F6]">
          <div class="font-bold border-b-[1px] border-black border-solid">
            <span>Emisor: NOMBRE DE LA EMPRESA</span>
          </div>
          <div>
            <span><b>ID: NIT 555555555555 </b> (persona juridica)</span>
          </div>
        </div>

        <div class="w-full p-2 rounded-xl bg-[#F6F6F6]">
          <div class="font-bold border-b-[1px] border-black border-solid">
            <span>Lugar de expedicion del documento</span>
          </div>
          <div class="flex justify-between">
            <span><b>Direccion: </b> Cl 00 # 00 - 00 ext 00 </span>
            <span><b>Codigo postal: </b> 000000 </span>
          </div>
          <div class="flex justify-between">
            <span><b>Ciudad: </b> Bucaramanchester </span>
            <span><b>Departamento: </b> Departamental </span>
            <span><b>Pais: </b> Colombia </span>
          </div>
        </div>

        <div class="w-full p-2 rounded-xl bg-[#F6F6F6]">
          <div class="font-bold border-b-[1px] border-black border-solid">
            <span>Direccion Fiscal</span>
          </div>
          <div class="flex justify-between">
            <span><b>Direccion: </b> Cl 00 # 00 - 00 ext 00 </span>
            <span><b>Codigo postal: </b> 000000 </span>
          </div>
          <div class="flex justify-between">
            <span><b>Ciudad: </b> Bucaramanchester </span>
            <span><b>Departamento: </b> Departamental </span>
            <span><b>Pais: </b> Colombia </span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap w-full gap-8">
        <div class="w-full p-2 rounded-xl bg-[#F6F6F6]">
          <div class="font-bold border-b-[1px] border-black border-solid">
            <span>Cliente: Nombre de cliente</span>
          </div>
          <div class="flex justify-between">
            <span><b>ID: CC </b>0000000 (persona natural) </span>
          </div>
        </div>

        <div class="w-full p-2 rounded-xl bg-[#F6F6F6]">
          <div class="font-bold border-b-[1px] border-black border-solid">
            <span>Direccion Fiscal</span>
          </div>
          <div class="flex justify-between">
            <span><b>Direccion: </b> Cl 00 # 00 - 00 ext 00 </span>
            <span><b>Codigo postal: </b> 000000 </span>
          </div>
          <div class="flex justify-between">
            <span><b>Ciudad: </b> Bucaramanchester </span>
            <span><b>Departamento: </b> Departamental </span>
            <span><b>Pais: </b> Colombia </span>
          </div>
        </div>

        <div class="w-full p-2 rounded-xl bg-[#F6F6F6]">
          <div class="font-bold border-b-[1px] border-black border-solid">
            <span>Datos adicionales</span>
          </div>
          <div class="flex justify-between">
            <span><b>Moneda: </b>Peso colombiano (COP) </span>
            <span><b>Metodo de pago: </b> 000000 </span>
          </div>
          <div class="flex justify-between">
            <span><b>Numero de pedido: 0000000 </b></span>
          </div>
        </div>
      </div>

      <div class="w-full p-2 rounded-xl bg-[#F6F6F6]">
        <div class="font-bold border-b-[1px] border-black border-solid">
          <span>Detalle de factura</span>
        </div>
        <table class="w-full">
          <thead>

            <tr class="border-b-[1px] border-black border-solid">
              <th>Imagen</th>
              <th>Producto</th>
              <th>Refrencia</th>
              <th>Cant.</th>
              <th>Valor unitario</th>
              <th>Impuestos</th>
            </tr>

          </thead>

          <tbody>

            <tr v-for="i in 10" :key="i" class="relative border-b-[1px] border-black border-solid">

              <td class="p-5">
                <div class="flex justify-center">
                  <img src="" alt="esta seria una imagen" class="w-24 h-24 bg-gray-500">
                </div>
              </td>

              <td class="p-5">
                <div class="flex justify-center">
                  <span>Nombre del producto</span>
                </div>
              </td>

              <td class="p-5">
                <div class="flex justify-center">
                  <span>Referencia del prod</span>
                </div>
              </td>

              <td class="p-5">
                <div class="flex justify-center">
                  <span>Cant</span>
                </div>
              </td>

              <td class="p-5">
                <div class="flex justify-center">
                  <span>Precio COP</span>
                </div>
              </td>

              <td class="p-5">
                <div class="flex justify-center">
                  <span>IVA 19 monto $</span>
                </div>
              </td>

              <div class="absolute right-0 bottom-0 px-4">
                <span><b>Total Linea: </b> 0000000</span>
              </div>

            </tr>
          </tbody>
        </table>
      </div>

      <div class="relative w-full bottom-0">

        <div v-for="i in 5" :key="i" class="company-info-container w-full p-2 rounded-xl bg-[#F6F6F6]">
          <div class="flex justify-between font-bold border-b-[1px] border-black border-solid">
            <span>Detalle de factura</span>
            <span>$ 00000000 cop</span>
          </div>
        </div>

      </div>

    </div>



  </div>
</template>

<script>
export default {
  name: 'PucharseSummaryView'
}
</script>

<style scoped>



</style>
