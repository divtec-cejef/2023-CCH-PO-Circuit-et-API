<template>
  <div>
    <qrcode-stream class="qrcode-reader" @decode="onDecode" @init="onInit"/>
  </div>

  <div v-if="data">
    <ul>
      <li v-for="info in data">
        {{ info }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import { QrcodeStream } from 'vue-qrcode-reader/src'

const data = ref<{
  id_car: number,
  url: String,
  pseudo: String,
  id_avatar: number
}[]>();
const error = ref<String>()

//Lecture de code QR pour récupérer l'ID de la voiture dans le code
let idCAr = ref<string>('');
let routApi = computed(() => `http://192.168.1.101:3001/car?id=${idCAr.value}`);

/**
 * Décode le code qr, parse l'URL pour récupérer les informations de la voiture en passant par l'API
 * @param result Résultat du scann du code QR
 */
async function onDecode(result: string) {
  console.log(result)
  let url = new URL(result);
  idCAr.value = url.pathname || ""
  console.log(idCAr.value)
  let res = await fetch(routApi.value);
  data.value = await res.json();
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