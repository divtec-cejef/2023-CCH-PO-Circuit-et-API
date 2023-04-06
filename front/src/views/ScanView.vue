<template>
  <div>
    <qrcode-stream class="qrcode-reader" @decode="onDecode" @init="onInit"/>
  </div>

  <div v-if="codeBackApi === 200">
    <h1>{{ userCar.pseudo }}</h1>
    <p>Voiture numéro : {{ userCar.idCar }}</p>
    <p>Accessible au code : {{ userCar.idQuery }}</p>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import { QrcodeStream } from 'vue-qrcode-reader/src'

import {useCarStore} from '@/stores/car'

let userCar = useCarStore()
let codeBackApi = ref(0);
const error = ref<String>()


/**
 * Décode le code qr, parse l'URL pour récupérer les informations de la voiture en passant par l'API
 * @param result Résultat du scann du code QR
 */
async function onDecode(result: string) {
  let url = new URL(result);
  let idCAr = ref(url.pathname.substring(1, url.pathname.length));
  codeBackApi.value = await userCar.initUserCarUrl(idCAr.value);
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