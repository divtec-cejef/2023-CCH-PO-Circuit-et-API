<template>
  <div class="loading" v-if="codeBackApi === api.ReturnCodes.NoCode">
    Chargement...
  </div>

  <div class="user-data" v-else-if="codeBackApi === api.ReturnCodes.Success">
      <img src="../assets/img/avatar.png" alt="Avatar de l'utilisateur">
      <p>
        Bievenue {{ userCar.pseudo }} <br>
          Tu trouveras tout ce dont tu as besoin sur ces pages...
      </p>
  </div>

  <div class="error" v-else-if="codeBackApi === api.ReturnCodes.NotFound">
    Erreur, impossible de trouver la voiture
  </div>

  <div class="error" v-else>
    Erreur innatendue
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useCarStore} from '@/stores/car'
import {useRouter} from "vue-router";
import api from "../../models/api";

let userCar = useCarStore()
let status = userCar.initUserCarUrl(useRouter().currentRoute.value.params.id);

let codeBackApi = ref(0);
status.then(value => codeBackApi.value = value)

</script>

<style scoped lang="scss">

div.loading {

}

div.user-data {

}

div.error {

}

</style>