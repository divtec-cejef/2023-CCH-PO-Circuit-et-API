<template>
    <div class="fullscreen">
        <QrcodeStream @decode="onDecode"  />
        <div class="overlay">
            <div class="message">
                <div>Vous pouvez scanner votre voiture.</div>
            </div>
            <div v-if="error !== undefined" class="scan-error">
                <div>{{error}}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader/src';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const error = ref<string>();

/**
 * Récupère la valeur du scan
 * @param resultScan
 */
function onDecode(resultScan:string) {
  try {
    let url = new URL(resultScan);
    if (url.hostname !== 'voiture.divtec.me') {
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
.fullscreen {
    z-index: 10000;

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
