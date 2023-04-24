<template>
    <body>

    <div v-if="codeBackApi === api.ReturnCodes.NoCode">
        Chargement...
    </div>

    <div v-else-if="codeBackApi === api.ReturnCodes.Success">
        <div class="user-data">
            <img id="img-avatar" src="../assets/img/avatar.png" alt="Avatar de l'utilisateur en cours">
            <p>Bienvenue {{ userCar.pseudo }} !
                <br>
                Tu trouveras tout ce dont tu auras besoin sur ces pages.
            </p>
        </div>
    </div>

    <div v-else-if="codeBackApi === api.ReturnCodes.NotFound">
        Erreur, impossible de trouver la voiture
    </div>

    <div v-else>
        Erreur innatendue
    </div>
    </body>

</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {computed, ref} from "vue";
import {useCarStore} from '@/stores/car'
import {useRouter} from "vue-router";
import api from "../../models/api";

let userCar = useCarStore()
let status = userCar.initUserCarUrl(useRouter().currentRoute.value.params.id);

let codeBackApi = ref(0);
status.then(value => codeBackApi.value = value)

</script>

<style scoped lang="scss">


div.user-data {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img#img-avatar {
        width: 120px;
        margin-bottom: 10px;
    }

    p {
        text-align: center;
        width: 250px;
    }
}
</style>