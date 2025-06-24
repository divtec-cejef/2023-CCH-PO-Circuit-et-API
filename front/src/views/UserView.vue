<template>
    <div class="content">
        <div v-if="codeBackApi === api.ReturnCodes.NoCode" class="loading-page">
            <SpinLoading></SpinLoading>
        </div>

        <div v-else-if="codeBackApi === api.ReturnCodes.Success" style="margin-top: -50px">
            <div class="user-data">
                <div class="avatar-txt">
                    <RouterLink to="pilote">
                        <AutoRegeneratedAvatar :avatar-config="car.avatar"/>
                    </RouterLink>
                    <p>Bienvenue <span>{{ car.pseudo }}</span> !<br></p>
                </div>

              <div style="margin-right: 10px">
                <h2>Instructions</h2>
                <ul class="list-instruction">
                  <li>
                    <NumberTime color="var(--blue)" number="1"></NumberTime>
                    <p>Balade toi dans les différents ateliers du bâtiment et
                      réalise des activités pour obtenir des
                      <RouterLink to="bonus">bonus</RouterLink>
                      !
                    </p>
                  </li>
                  <li>
                    <NumberTime color="var(--blue)" number="2"></NumberTime>
                    <p>Modifie tes données de
                      <RouterLink to="pilote">pilotes</RouterLink>
                      .
                    </p>
                  </li>
                  <li>
                    <NumberTime color="var(--blue)" number="3"></NumberTime>
                    <p>Participe à la course de la DIVTEC. Plus tu auras récupéré des bonus,
                      plus tu iras vite !</p>
                  </li>
                  <li>
                    <NumberTime color="var(--blue)" number="4"></NumberTime>
                    <p>Analyse ton résultat et récupère la
                      <RouterLink to="course">vidéo</RouterLink>
                      de ta course !
                    </p>
                  </li>

                </ul>
              </div>

                <div class="car-3d">
                    <Suspense>
                        <ModelRender :model="carModel">
                            <img :src="colorScheme === 'dark'
                            ? carGifDark
                            : carGifLight" alt="Animation de la voiture en 3D">
                        </ModelRender>
                        <template #fallback>
                            <div class="loading">
                            <HollowDotsSpinner/>
                            </div>
                        </template>
                    </Suspense>
                </div>
              <BonusList :id-car="car.idCar" />
            </div>
        </div>

        <div v-else-if="codeBackApi === api.ReturnCodes.NotFound" class="error-no-car">
            <h2>Erreur</h2>
            <p>Malheureusement aucune voiture ne correspond à l'URL...</p>
            <RouterLink :to="`/${userCar.car.idQuery || ''}`">
                <button>Accueil</button>
            </RouterLink>
        </div>

        <ErrorConnection v-else></ErrorConnection>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCarStore } from '@/stores/car';
import { HollowDotsSpinner } from 'epic-spinners';
import { usePreferredColorScheme } from '@vueuse/core';
import carModel from '@/assets/other/car.glb';
import carGifLight from '@/assets/img/car-spin-light.gif';
import carGifDark from '@/assets/img/car-spin-dark.gif';
import api from '@/models/api';
import BonusList from '@/components/BonusList.vue';
import NumberTime from '@/components/NumberTime.vue';

const SpinLoading = defineAsyncComponent(() => import('@/components/SpinLoading.vue'));
const ErrorConnection = defineAsyncComponent(() => import('@/components/ErrorConnection.vue'));
const AutoRegeneratedAvatar = defineAsyncComponent(() => import('@/components/AutoRegeneratedAvatar.vue'));
const ModelRender = defineAsyncComponent(() => import('@/components/ModelRender.vue'));

//Initialisation de la voiture en fonction de l'url
let userCar = useCarStore();
const { car } = userCar;
const codeBackApi = ref(0);
const colorScheme = usePreferredColorScheme();

//Ecoute la route
watch(useRouter().currentRoute, async (newUrl) => {
  //Lancement de la requête de récupération seulement à l'initialisation de la page et au changement
  if (newUrl.params.id === car.idQuery) {
    codeBackApi.value = api.ReturnCodes.Success;
    return;
  }

  //Initialisation des données
  let status = userCar.initUserCarQueryId(newUrl.params.id);

  //Récupère le code de réponse de l'api
  status.then((value) => {
    if (value === undefined) {
      return;
    }

    codeBackApi.value = value;

    //Si la requête est valide alors on stocke l'id dans le localstorage
    if (codeBackApi.value == api.ReturnCodes.Success) {
      localStorage.setItem('userCarId', userCar.car.idCar?.toString() ?? '');
      localStorage.removeItem('carToken');
    }
  });
},
{
  deep: true,
  immediate: true
});
</script>

<style lang="scss" scoped>
div.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app div.error-no-car {
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

div.user-data {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: 50px;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    align-items: center;
    align-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    height: 650px;
    width: 100%;

    .car-3d {
      margin-top: -350px !important;
      margin-left: -50px !important;
    }

    div.avatar {
      margin-bottom: 10px;
      margin-top: -275px;
    }

    .avatar-txt p {
      margin-top: -60px;
    }
  }

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div.avatar-txt {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;

    p:nth-child(2) {
      font-size: 18px;
    }

    div.avatar {
      width: 200px;
      height: 200px;
      margin-bottom: 10px;
    }
  }

  ul.list-instruction {
    max-width: 470px;
    padding-left: 17px;
    margin: 10px 0;
    list-style: none;

    p {
      text-align: left;
    }

    li:first-child {
      margin: 0;
    }

    li {
      display: flex;
      margin-top: 10px;

      p {
        margin-left: 10px;
      }
    }

    a {
      color: var(--blue);
      transition: all ease-in-out;
      text-decoration: underline;
      font-weight: bold;


      &:hover {
        color: var(--black);
      }
    }
  }

  img#avatar {
    max-width: 160px;
    margin-bottom: 20px;
  }

  canvas#car {
    margin-top: 60px;
    max-width: 300px;
  }

  p {
    text-align: center;

    span {
      font-weight: bold;
    }
  }

  h2 {
    align-self: start;
  }

  p.intro-badge {
    text-align: left;
    width: fit-content;
    align-self: start;
  }

  div.car-3d {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px auto auto auto;
    max-width: 100vw;

    .loading {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
