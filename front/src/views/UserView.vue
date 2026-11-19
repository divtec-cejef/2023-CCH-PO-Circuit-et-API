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

        <div class="instructions">
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

        <div class="sponsor">
          <div v-if="!aSponsor">
            <img :src="cesarGris">
          </div>
          <div v-else>
            <img :src="cesarJaune" >
          </div>
          <img :src="imageSponsor" style="margin-top: -165px">

          <p style="margin-top: 40px">{{sponsorName}}</p>
          <p v-if="!aSponsor">pour gagner un sponsor.</p>
          <RouterLink v-else class="recompense" to="bonus">Obtenir une récompense</RouterLink>
        </div>

        <BonusList5 class="bonus" :id-car="car.idCar"/>

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
        <div style="margin-top: 50px; margin-bottom: 10px"></div>
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
import { defineAsyncComponent, onMounted, ref, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCarStore } from '@/stores/car';
import { HollowDotsSpinner } from 'epic-spinners';
import { usePreferredColorScheme } from '@vueuse/core';

import carModel from '@/assets/other/car.glb';
import carGifLight from '@/assets/img/car-spin-light.gif';
import carGifDark from '@/assets/img/car-spin-dark.gif';
import api from '@/models/api';
import BonusList5 from '@/components/BonusList5.vue';
import NumberTime from '@/components/NumberTime.vue';
import cesarGris from '@/assets/img/cesar-gris.png';
import cesarJaune from '@/assets/img/cesar-jaune.png';
import badgeInconnu from '@/assets/img/sectionInconnu.webp';

// Import des images
import badgeGlobaz from '@/assets/img/globaz.png';
import badgeDecovi from '@/assets/img/decovi.png';
import badgeBusch from '@/assets/img/Busch.png';
import badgeLouisLang from '@/assets/img/Louis lang.png';
import badgeWillemin from '@/assets/img/badgeWillemin-macodel.png';

// Sponsors
const sponsors = [
  { name: 'Globaz', image: badgeGlobaz },
  { name: 'Décovi', image: badgeDecovi },
  { name: 'Atelier Busch', image: badgeBusch },
  { name: 'Louis-lang', image: badgeLouisLang },
  { name: 'Willemin-Macodel', image: badgeWillemin },
];

const SpinLoading = defineAsyncComponent(() => import('@/components/SpinLoading.vue'));
const ErrorConnection = defineAsyncComponent(() => import('@/components/ErrorConnection.vue'));
const AutoRegeneratedAvatar = defineAsyncComponent(() => import('@/components/AutoRegeneratedAvatar.vue'));
const ModelRender = defineAsyncComponent(() => import('@/components/ModelRender.vue'));

//Initialisation de la voiture en fonction de l'url
let userCar = useCarStore();
const { car } = userCar;
const codeBackApi = ref(0);
const colorScheme = usePreferredColorScheme();

const imageSponsor = ref(badgeInconnu);

const aSponsor = ref(false);
const sponsorName = ref('Effectuez une course');

async function getSponsors(carId: string) {
  try {
    const response = await fetch(`https://gp.divtec.ch/api/car/sponsor/${carId}`);
    if (!response.ok) throw new Error('API error');

    const sponsorCar = await response.json(); // { sponsor_name: "Sponsors-4" }

    // Trouver l'image correspondante dans ton tableau de sponsors
    const matchedSponsor = sponsors.find(
      s => s.name === sponsorCar.sponsor_name
    );

    if (matchedSponsor) {
      imageSponsor.value = matchedSponsor.image;
      aSponsor.value = true;
      sponsorName.value = matchedSponsor.name;
    } else {
      imageSponsor.value = badgeInconnu;
    }
  } catch (error) {
    console.error('Erreur récupération sponsor:', error);
  }
}


onMounted(async () => {
  await getSponsors(String(car.idQuery));
});


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
    display: flex;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    align-items: center;
    align-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
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

    margin: 0 35%;

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
  .sponsor {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px auto auto auto;
    max-width: 100vw;
  }

  .bonus {
    max-width: 600px;
  }

  .instructions {
    margin-right: 10px;
    margin-top: 20px;
    @media (min-width: 1000px) {
      margin-top: 0;
      margin-left: 70px;
    }
  }
}

.recompense {
  background-color: #ce0064;
  padding: 5px;
  border-radius: 15px;
  margin-top: 15px;
}
</style>
