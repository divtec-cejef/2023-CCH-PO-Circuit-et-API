<template>
    <div class="qr-code">
        <qrcode-stream @decode="(r) => result = r" :track="paintOutline" />
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

const result = ref('');
</script>

<style scoped lang="scss">

div.qr-code {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>