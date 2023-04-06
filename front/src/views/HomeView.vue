<template>
  <div v-if="codeBackApi === api.ReturnCodes.NoCode">
    Chargement...
  </div>

  <div v-else-if="codeBackApi === api.ReturnCodes.Success">
    <h1>{{ userCar.pseudo }}</h1>
    <p>Voiture numéro : {{ userCar.idCar }}</p>
    <p>Accessible au code : {{ userCar.idQuery }}</p>
  </div>

  <div v-else-if="codeBackApi === api.ReturnCodes.NotFound">
    Erreur, impossible de trouver la voiture
  </div>

  <div v-else>
    Erreur innatendue
  </div>

</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useCarStore} from '@/stores/car'
import {useRouter} from "vue-router";
import api from "../../models/api";

let userCar = useCarStore()
let status = userCar.initUserCarUrl(useRouter().currentRoute.value.params.id);

let codeBackApi = ref(0);
status.then(value => codeBackApi.value = value)

</script>

<style scoped>

</style>