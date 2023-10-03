<template>
    <div class="video">
        <template v-if="props.url">
            <video
                    :src="props.url"
                    autoplay
                    controls
                    loop>
            </video>
            <a v-if="disabledDownload" :href="blobBestVideo" download="course-divtec-1.mp4">
                <button class="download">
                    <span>Télécharge la vidéo ici !</span>
                    <img :src="downloadImg" alt="Bouton de téléchargement de la vidéo">
                </button>
            </a>
            <a v-else class="disabled-button">
                <button class="download">
                    <span>Télécharge la vidéo ici !</span>
                    <img :src="downloadImg" alt="Bouton de téléchargement de la vidéo">
                </button>
            </a>
        </template>
        <div v-else>
            <p>La vidéo n'est pas encore disponible !</p>
            <button @click="router.go(0)"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import downloadImg from '@/assets/img/downloads.avif';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

/**
 * Création de l'objet blob
 * @param object Objet
 */
function createObjectURL(object: Blob | MediaSource) {
  return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
}


/**
 * Construit un objet blob en fonction de son URL
 * @param url
 */
async function createBlobObject(url: string) {
  //Récupération de la vidéo et transformation en blob
  let response = await fetch(url);
  const blobURL = await response.blob();
  return createObjectURL(blobURL);
}

const props = defineProps<{
  url: string | null,
}>();

const blobBestVideo = ref<string>();
const router = useRouter();
const disabledDownload = ref(false);


//Ajout du bouton de téléchargement de la vidéo
if (props.url) {
  createBlobObject(props.url.toString()).then(v => {
    blobBestVideo.value = v;
    disabledDownload.value = true;
  });
}
</script>

<style scoped lang="scss">
@import "src/assets/css/consts";

div.video {
  width: 100%;
  margin: 0 auto;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 375px;


  a {
    margin: 0;
    width: 100%;
  }

  video,
  > div:nth-child(2),
  a button {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: $default-shadow;
  }

  .disabled-button {
    button {
      opacity: 0.5 !important;
    }

    button:hover {
      font-weight: normal;
      opacity: 0.5 !important;
      cursor: not-allowed;
    }
  }

  button.download {
    margin-top: 12px;
    background-color: var(--white);
    width: 100%;
    height: 37px;
    border: none;
    transition: all ease-in-out 0.2s;
    color: var(--gray);
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-right: 5px;
    }

    img {
      width: 14px;
      margin-left: 5px;
    }

    &:hover {
      opacity: 0.5;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: $default-shadow;
    padding: 30px;
    height: 100%;
    min-height: 206px;
    border-radius: 7px;
    width: 100%;

    button {
      margin-top: 10px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 22px;
      background-image: url("@/assets/img/reload.avif");
      background-color: var(--gray);
      width: 50px;
      height: 30px;
      border: 1px solid var(--gray);

      &:hover {
        width: 53px
      }
    }
  }
}
</style>