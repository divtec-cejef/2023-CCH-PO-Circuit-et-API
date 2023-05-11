<template>
  <div>
    <qrcode-stream class="qrcode-reader" @decode="onDecode" @init="onInit"/>
  </div>

  <div v-if="codeBackApi === api.ReturnCodes.Success">
    <h1>{{ car.pseudo }}</h1>
    <p>Accessible au code : {{ userCar }}</p>
  </div>
  <div v-else-if="codeBackApi !== 0">
    Erreur, vous avez fumé
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import { QrcodeStream } from 'vue-qrcode-reader'
import api from "../models/api";


import {useCarStore} from '@/stores/car'

let userCar = useCarStore()
const { car } = userCar;
let codeBackApi = ref(0);
const error = ref<String>()


/**
 * Décode le code qr, parse l'URL pour récupérer les informations de la voiture en passant par l'API
 * @param result Résultat du scann du code QR
 */
async function onDecode(result: string) {
  let url = new URL(result);
  let idCAr = ref(url.pathname.substring(1, url.pathname.length));
  codeBackApi.value = await userCar.initUserCarId(idCAr.value);
}

/**
 * Fonction d'initialisation pour le scan du code qr
 * @param promise
 */
async function onInit(promise:any) {
  try {
    await promise
  } catch (error) {
    console.log(error)
  }
}

</script>

<style scoped lang="scss">

.qrcode-reader {
  width: 400px;
  height: 400px;
}
</style>