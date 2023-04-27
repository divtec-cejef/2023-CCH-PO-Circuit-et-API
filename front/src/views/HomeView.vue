<template>
    <div class="loading" v-if="codeBackApi === api.ReturnCodes.NoCode">
      Chargement...
    </div>

    <div class="user-data" v-else-if="codeBackApi === api.ReturnCodes.Success">
        <div class="avatar-txt">
            <img id="avatar" src="../assets/img/avatar.png" alt="Avatar de l'utilisateur">
            <p>
                Bievenue <span>{{ userCar.pseudo }}</span> !<br>
                Tu trouveras tout ce dont tu as besoin sur ces pages...
            </p>
        </div>

        <img id="car" src="../assets/img/car.png" alt="Voiture de l'utilisateur">
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


div.error {
    color: var(--red);
}

div.loading, div.error {
    text-align: center;
    margin: auto;
    position: absolute;
    top: 50%;
    left: calc(50% - 100px);
    width: 200px;
}

div.user-data {
  div.avatar-txt {
    margin: auto;
    max-width: 300px;
  }

  img#avatar {
    display: block;
    max-width: 160px;
    margin: 0 auto 20px auto;
  }

  img#car {
    display: block;
    max-width: 300px;
    margin: auto;
  }

  p {
    text-align: center;

    span {
      font-weight: bold;
    }
  }
}

div.error {

}

</style>