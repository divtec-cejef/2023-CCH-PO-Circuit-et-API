<template>
    <iframe v-if="urlLiveYoutube != ''" class="fullscreen" width="866" :src="urlLiveYoutube" title="Planifier un projet avec GanttProject 2 (partie 2/3)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <div v-else class="error-no-car error-no-car">
        <h2>Erreur</h2>
        <p>Le live n'est pas disponible actuellement. Revenez plus tard !</p>
        <RouterLink :to="`/`">
            <button>Accueil</button>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const urlLiveYoutube :string = import.meta.env.VITE_URL_LIVE_YOUTUBE || '';

</script>

<style scoped lang="scss">
    iframe {
      margin-top: 100px;
      max-height: calc(100vh - var(--height-screen-diff) - 85px);
      height: calc(100vw / (16/9));
    }

    div.error-no-car {
        top: calc(50% - 75px);
        left: calc(50% - 200px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 400px;
        text-align: center;

        h2 {
            width: 100%;
            text-align: center;
            font-size: 45px;
        }

        button {
            border: none;
            color: var(--white);
            padding: 10px;
            border-radius: 8px;
            background-color: var(--blue);
            cursor: pointer;
            transition: 0.2s ease-in-out;
            margin-top: 25px;
        }

        button:hover {
            background-color: var(--white);
            border: 2px solid var(--blue);
            color: var(--black);
            transition: 0.2s ease-in-out;
        }
    }
</style>