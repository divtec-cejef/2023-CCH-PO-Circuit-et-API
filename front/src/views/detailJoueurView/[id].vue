<script setup lang="ts">
import api, { type models } from '@/models/api';
import { WebsocketConnection } from '@/models/api';
import { defineAsyncComponent, type Ref, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Section } from '@/models/section';
import { getNumRace } from '@/models/car';
import carModel from '@/assets/other/car.glb';
import carGifDark from '@/assets/img/car-spin-dark.gif';
import carGifLight from '@/assets/img/car-spin-light.gif';
import { usePreferredColorScheme } from '@vueuse/core/index';
const AutoRegeneratedAvatar = defineAsyncComponent(() => import('@/components/AutoRegeneratedAvatar.vue'));
const BonusList = defineAsyncComponent(() => import('@/components/BonusList.vue'));
const VideoRace = defineAsyncComponent(() => import('@/components/VideoRace.vue'));
const RaceInfo = defineAsyncComponent(() => import('@/components/RaceInfo.vue'));
const ModelRender = defineAsyncComponent(() => import('@/components/ModelRender.vue'));
const colorScheme = usePreferredColorScheme();

const route = useRoute();
const id = Number(route.params.id);
const hasLoaded = ref(false);
const errorMessage = ref<string>();

const BEST_TIME_INDEX = 0;
const raceData: Ref<models.parsedData.RacesData> | Ref<undefined> = ref();
const hasError = ref(false);
const listRace = ref<Exclude<models.rawData.WsRaceData, models.rawData.Error>[]>();
const listActivityOneCarApi = ref<models.parsedData.Activities | undefined>();
const listAllSection = ref<models.parsedData.SectionName[]>([]);
const listAllBonus = ref<
    {
      name: string;
      idSection: number;
      realised: boolean;
      listActivity: { name: string; realised: boolean }[];
    }[]
>([]);

const emit = defineEmits(['indexNewRace', 'load']);

const socket = new WebsocketConnection();

socket.onRankingReceived(async (data) => {
  if ('message' in data) {
    errorMessage.value = data.message;
    return;
  }

  listRace.value = data.races;
  hasLoaded.value = true;

  await loadUserData();

  emit('load');
});

async function loadUserData() {
  if (!listRace.value || !listRace.value[id]) return;

  const carId = listRace.value[id].car.id_car;
  console.log('carId', carId);

  /* <En test> */
  //Récupère les courses de l'utilisateur
  const { json: allRaceOneCar } = await api.getAllRaceOneCar(carId);
  if ('message' in allRaceOneCar) {
    hasError.value = true;
    return;
  }
  raceData.value = allRaceOneCar;
  /* </En test> */


  // Charge les activités de la voiture
  const { json: activities } = await api.getActivityOneCar(carId);
  listActivityOneCarApi.value = activities;

  // Charge toutes les sections
  const { json: sections } = await api.getAllSections();
  listAllSection.value = sections;

  await buildBonusList();
}

async function buildBonusList() {
  if (!listActivityOneCarApi.value) return;

  listAllBonus.value = [];

  for (const section of listAllSection.value) {
    if (!Section.SectionNameHasActivity.includes(Section.formatName(section.label))) continue;

    const { json: activitiesInSection } = await api.getAllActivitiesOneSection(section.idSection);
    const activitiesList = activitiesInSection as models.parsedData.SectionActivities;

    const listActivityUser = activitiesList.map((activity) => ({
      name: activity.label,
      realised: listActivityOneCarApi.value!.some((a) => a.idActivity === activity.idActivity),
    }));

    const sectionRealised = listActivityOneCarApi.value.some((a) => a.idSection === section.idSection);

    listAllBonus.value.push({
      name: section.label,
      idSection: section.idSection,
      realised: sectionRealised,
      listActivity: listActivityUser,
    });
  }
}
</script>

<template>
  <div class="contenu-en-tete">
    <h1 @click="console.log(listRace[id])" >Rang {{ id+1 }} : {{ listRace[id].car.pseudo }}</h1>
    <RouterLink to="../pilote">
      <AutoRegeneratedAvatar class="avatar" style=" margin-top: 20px; width: 130px; height: 130px" :avatar-config="listRace[id].car.avatar"/>
    </RouterLink>
  </div>
  <div class="contenu-course">
    <h2>Meilleure course</h2>
    <div class="course">
      <RaceInfo :display-rank="false"
                :num-race="getNumRace(raceData!.races[BEST_TIME_INDEX], raceData!.races)"
                :race="raceData!.races[BEST_TIME_INDEX]"
                :rank="raceData!.rank"
                class="race-info">
      </RaceInfo>
      <VideoRace :url="raceData!.races[BEST_TIME_INDEX].videoUrl" class="contenu-course"></VideoRace>
    </div>
  </div>

  <div class="contenu-bonus">
    <BonusList :id-car="listRace[id].car.id_car"></BonusList>
  </div>
  <div class="contenu-voiture">
    <h2>Voiture</h2>
    <ModelRender :model="carModel">
      <img :src="colorScheme === 'dark'
                            ? carGifDark
                            : carGifLight" alt="Animation de la voiture en 3D">
    </ModelRender>
  </div>
</template>

<style scoped lang="scss">
.course {
  display: inline-flex;
  .race-info {
    margin: 0 15px;
  }
}

@media screen and (min-width: 1224px) {
  .contenu-course {
    margin-left: -70%;
    margin-right: 0;
  }
  .contenu-bonus {
    margin-right: -70%;
    margin-left: 0;
    margin-top: -40%;
  }
  .contenu-voiture {
    margin-left: -70%;
    margin-top: -20%;
  }
  .contenu-en-tete {
    display: flex;

    h1 {
      margin-top: 15%;
      margin-left: -5%;
      margin-right: 5%;
    }
  }
}

@media screen and (max-width: 765px) {
  h1, h2 {
    text-align: center;
  }

  .avatar {
    display: block;
    margin: 20px auto;
    width: 130px;
    height: 130px;
  }

}
</style>
