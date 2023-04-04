<template>
  <div v-if="data">
    <h1>{{data.pseudo}}</h1>
    <p>Voiture numéro : {{ data.id_car}}</p>
    <p>Accessible au code : {{ data.query_id }}</p>
    <p>Avatar numéro : {{ data.id_avatar}}</p>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const data = ref<{
  id_car: number,
  query_id: String,
  pseudo: String,
  id_avatar: number
}[]>();

//Lecture de code QR pour récupérer l'ID de la voiture dans le code
let currentUrl = window.location.href;
let url = new URL(currentUrl);
let idCAr = ref<string>(url.searchParams.get("id") || "")
let routApi = computed(() => `http://192.168.1.101:3001/car?id=${idCAr.value}`);
getDataOneCar(routApi.value);

/**
 * Décode le code qr, parse l'URL pour récupérer les informations de la voiture en passant par l'API
 * @param result Résultat du scann du code QR
 */
async function getDataOneCar(result: string) {
  let res = await fetch(routApi.value);
  data.value = await res.json();
}

</script>

<style scoped>

</style>