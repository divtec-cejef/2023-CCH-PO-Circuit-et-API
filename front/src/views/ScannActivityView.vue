<template>

    <div class="fullscreen">
        <qrcode-stream @init="onInit" v-if="!destroyed" @decode="(r) => result = r" :track="paintOutline">
            <div class="loading-indicator" v-if="loading">
                Chargement...
            </div>
        </qrcode-stream>
    </div>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader/src';
import { ref } from 'vue';

/**
 * Dessine le tour du code qr sur l'image de celui la
 * @param detectedCodes Code détecté par le lecteur
 * @param ctx Canvas 2d
 */
function paintOutline (detectedCodes:any, ctx: CanvasRenderingContext2D) {
  for (const detectedCode of detectedCodes) {
    const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints;

    ctx.strokeStyle = '#E33821';

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x , y);
    }

    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}

async function onInit (promise: Promise<any>) {
  loading.value = true;

  try {
    await promise;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const loading = ref(false);
const destroyed = ref(false);
const result = ref('');

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
</style>