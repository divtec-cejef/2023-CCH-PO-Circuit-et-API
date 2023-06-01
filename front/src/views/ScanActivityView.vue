<template>
    <div class="fullscreen">
        <div @click="quitPage" class="return-back" v-if="!loading">
            <img src="../assets/img/arrow.png" alt="Icon de retour en arrière">
        </div>
        <qrcode-stream :camera="camera" @init="onInit" v-if="!destroyed" @decode="onDecode" :track="paintOutline">
            <div class="loading-indicator" v-if="loading">
                Chargement...
            </div>
        </qrcode-stream>
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
  result.value = addRealisationCar(1, 1, adminPost.token);
  quitPage();
}

/**
 * Quitte la page et éteinds la camerae
 */
async function quitPage() {
  camera.value = 'off';
  console.log('test');
  await router.push({ path: '/admin' });
}

const loading = ref(false);
const destroyed = ref(false);
const result = ref();
const adminPost = useAdminPostStore();
const camera = ref('auto');

//S'il n'y a pas d'authentification retour à la page admin
if(adminPost.token == '') {
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
    width: 25px;
  }
}
</style>