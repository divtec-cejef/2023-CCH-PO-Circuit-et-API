<template>
    <div class="fullscreen">
        <div @click="quitPage" class="return-back" v-if="!loading">
            <img src="../assets/img/arrow.png" alt="Icon de retour en arrière">
        </div>
        <qrcode-stream :camera="camera" @init="onInit" @decode="onDecode" :track="paintOutline">
            <div class="loading-indicator" v-if="loading">
                Chargement...
            </div>
        </qrcode-stream>

        <template v-if="validateScan">
            <div v-if="addActivitySuccess" class="message">
                <img src="../assets/img/checked.png" alt="Icône de succès">
                <p>Activité ajoutée avec succès !</p>
            </div>
            <div v-else class="message">
                <img src="../assets/img/cancel.png" alt="Icône d'erreur">
                <p>{{ errorMessage }}</p>

                <button @click="quitPage" class="button-return">OK</button>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader/src';
import { ref } from 'vue';
import restful from '@/models/api';
import addRealisationCar = restful.addRealisationCar;
import { useAdminPostStore } from '@/stores/adminPost';
import router from '@/router';

/**
 * Dessine le tour du code qr sur l'image de celui la
 * @param detectedCodes Code détecté par le lecteur
 * @param ctx Canvas 2d
 */
function paintOutline(detectedCodes: any, ctx: CanvasRenderingContext2D) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = '#E33821';

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }

    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}

/**
 * Fonction lancée à l'intialisation du composant de scan pour gérer les erreurs
 * @param promise Objet retourner par l'initialisation
 */
async function onInit(promise: Promise<any>) {
  loading.value = true;
  try {
    await promise;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

/**
 * Fonction lancée au décodage d'un qr code
 * @param value Valeur décodé
 */
async function onDecode(value: string) {
  //Récupération des données de l'url
  let urlQrCode = new URL(value).href;
  let queryId = urlQrCode.substring(urlQrCode.lastIndexOf('/') + 1);
  let idActivity = Number(router.currentRoute.value.query.idActivity || 0);

  //Lancement de la requête
  const result = await addRealisationCar(idActivity, queryId, adminPost.token);

  //Traitement de la réponse
  validateScan.value = true;
  if (result == restful.ReturnCodes.Success) {
    addActivitySuccess.value = true;
    waitPopPupResult();

  } else if (result == restful.ReturnCodes.Conflict) {
    addActivitySuccess.value = false;
    errorMessage.value = 'L\'activité à déjà été réalisé par cette voiture !';

  } else {
    addActivitySuccess.value = false;
    errorMessage.value = 'Erreur indéterminée !';
  }
}

/**
 * Quitte la page et éteinds la camerae
 */
async function quitPage() {
  camera.value = 'off';
  await router.push({ path: '/admin' });
}

/**
 * Lance un timer pour afficher le résultat du scan
 * Le ferme après un certain temps.
 */
function waitPopPupResult() {
  setTimeout(() => {
    validateScan.value = false;
    quitPage();
  }, 1500);
}

const loading = ref(false);
const adminPost = useAdminPostStore();
const camera = ref('auto');
const validateScan = ref(false);
const errorMessage = ref('');
const addActivitySuccess = ref(true);

//S'il n'y a pas d'authentification retour à la page admin
if (adminPost.token == '') {
  router.push({ path: '/admin' });
}

</script>

<style scoped lang="scss">

.loading-indicator {
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
}

div.return-back {
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--white);
  z-index: 1001;
  rotate: 180deg;
  border-radius: 20px;
  padding: 8px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  margin-left: 25px;

  img {
    margin-right: -3px;
    width: 25px;
  }
}

div.message {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: absolute;
  align-items: center;
  z-index: 1002;
  padding: 10px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  width: 180px;
  height: 250px;
  top: calc(50% - 125px);
  left: calc(50% - 90px);
  text-align: center;

  img {
    width: 70px;
  }

  button {
    background-color: var(--white);
    border: 1px solid var(--gray);
      border-radius: 10px;
      padding: 4px 8px;
  }
}
</style>