<template>
    <div class="fullscreen">
      <div class="up-screen">
        <div class="return-back" @click="quitPage">
          <img :src="arrow" alt="Icône de retour en arrière">
        </div>
      </div>
        <QrcodeStream @detect="onDecode"/>
        <div class="overlay">
            <div class="message">
                <div>Vous pouvez scanner votre voiture !</div>
            </div>
            <div v-if="error !== undefined" class="scan-error">
                <div>{{error}}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import type { DetectedBarcode } from 'barcode-detector';
import arrow from '@/assets/img/arrow.webp';

const router = useRouter();
const error = ref<string>();

/**
 * Quitte la page et éteind la camera
 */
async function quitPage() {
  await router.push({ path: '/' });
}

/**
 * Récupère la valeur du scan
 * @param resultScan
 */
function onDecode(resultScan:DetectedBarcode[]) {
  try {
    let url = new URL(resultScan[0].rawValue);
    if (url.hostname !== import.meta.env.VITE_DOMAIN_NAME || '') {
      error.value = 'Le code ne vient pas des portes ouvertes.';
    } else {
      router.push(url.pathname);
    }
  } catch (e) {
    if (e instanceof TypeError) {
      error.value = 'Code invalide.';
    }
  }
}

</script>

<style scoped lang="scss">
@import "@/assets/css/consts";

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

.fullscreen {
    z-index: 10000;
    background-color: var(--black);

    .overlay {
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;

        display: flex;
        flex-direction:column;
        justify-content: space-between;
        align-items: center;

        padding: 1em;

        .message{
          div {
            padding: 1em;
            background-color: var(--white);
            color: var(--black);
            border-radius: 20px;
            box-shadow: $default-shadow;
          }
        }

      .scan-error {
        div {
          padding: 1em;
          background-color: var(--white);
          color: var(--red);
          border-radius: 20px;
          box-shadow: $default-shadow;
        }
      }
    }
}

</style>
