<template>
    <div class="fullscreen">
        <div class="up-screen">
            <div v-if="!loading" class="return-back" @click="quitPage">
                <img :src="arrow" alt="Icône de retour en arrière">
            </div>
        </div>
        <qrcode-stream :track="paintOutline"
                       @detect="onDecode"
                       @camera-on="onInit">
            <div v-if="loading" class="loading-indicator">
                Chargement...
            </div>
        </qrcode-stream>

        <template v-if="validateScan">
            <div v-if="addActivitySuccess" class="message">
                <img :src="checkedIcon" alt="Icône de succès">
                <p>Bonus activé avec succès !</p>
            </div>
            <div v-else class="message">
                <img :src="cancelIcon" alt="Icône d'erreur">
                <p>{{ errorMessage }}</p>

                <button class="button-return" @click="() => {
                    validateScan = false
                    addActivitySuccess = true
                }">OK
                </button>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { QrcodeStream } from 'vue-qrcode-reader';
import { ref } from 'vue';
import restful from '@/models/api';
import { useRouter } from 'vue-router';
import type { DetectedBarcode } from 'barcode-detector';

import arrow from '@/assets/img/arrow.webp';
import checkedIcon from '@/assets/img/checked.webp';
import cancelIcon from '@/assets/img/cancel.webp';
import { useCarStore } from '@/stores/car';

type MediaCapabilities = ReturnType<typeof MediaStreamTrack.prototype.getCapabilities>;

const router = useRouter();
const carStore = useCarStore();

if(!carStore.car.idQuery) {
  router.push('/');
}

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
 * Fonction lancée à l'initialisation du composant de scan pour gérer les erreurs
 * @param promise Objet retourner par l'initialisation
 */
async function onInit(promise: Promise<MediaCapabilities>) {
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
async function onDecode(value: DetectedBarcode[]) {
  if(!carStore.car.idQuery){
    await router.push('/');
    return;
  }
  //Récupération des données de l'url
  let urlQrCode = new URL(value[0].rawValue).href;

  validateScan.value = true;

  if(urlQrCode === 'https://vqr.vc/KhPHUkVyW') {
    await restful.addForumCar(carStore.car.idQuery);
    addActivitySuccess.value = true;
  } else {
    addActivitySuccess.value = false;
    errorMessage.value = 'Le QR code scanné n\'est pas valide';
  }
}

/**
 * Quitte la page et éteind la camera
 */
async function quitPage() {
  await router.push({ path: '/' });
}

/**
 * Lance un timer pour afficher le résultat du scan
 * Le ferme après un certain temps.
 */

const loading = ref(false);
const validateScan = ref(false);
const errorMessage = ref('');
const addActivitySuccess = ref(true);
</script>

<style lang="scss" scoped>
@import "@/assets/css/consts.scss";

div.fullscreen {
  background-color: var(--black);
}

.loading-indicator {
  width: 100%;
  height: 100%;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
}

div.up-screen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  div.return-back {
    background-color: var(--white);
    rotate: 180deg;
    border-radius: 999px;
    padding: 8px;
    width: 45px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (prefers-color-scheme: dark) {
      background-color: var(--black);

      img {
        filter: invert(1);
      }
    }

    img {
      margin-right: -3px;
      width: 25px;
    }
  }

  div.name-activity {
    font-style: italic;
    border-radius: 20px;
    padding: 7px 15px;
    color: var(--black);
    background-color: var(--white);

    @media screen and (prefers-color-scheme: dark) {
      background-color: var(--black);
      color: var(--white);
    }
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

  @media screen and (prefers-color-scheme: dark) {
    background-color: var(--black);
    color: var(--white);
    box-shadow: none;
    border: $dark-border;
  }

  img {
    width: 70px;
  }

  button {
    background-color: var(--white);
    border: 1px solid var(--gray);
    border-radius: 10px;
    padding: 4px 8px;

    @media screen and (prefers-color-scheme: dark) {
      background-color: var(--black);
      color: var(--white);
      border: $dark-border;
    }
  }
}

</style>
