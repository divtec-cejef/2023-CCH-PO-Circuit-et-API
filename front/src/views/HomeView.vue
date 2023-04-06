<template>
  <div v-if="codeBackApi === 0">
    Chargement...
  </div>

  <div v-else-if="codeBackApi === 200">
    <h1>{{ userCar.pseudo }}</h1>
    <p>Voiture numéro : {{ userCar.idCar }}</p>
    <p>Accessible au code : {{ userCar.idQuery }}</p>
  </div>

  <div v-else-if="codeBackApi === 404">
    Erreur, impossible de trouver la voiture
  </div>

  <div v-else>
    Erreur innatendue
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useCarStore} from '@/stores/car'

let userCar = useCarStore()
let status = userCar.initUserCarUrl();

let codeBackApi = ref(0);
status.then(value => codeBackApi.value = value)

</script>

<style scoped>

</style>