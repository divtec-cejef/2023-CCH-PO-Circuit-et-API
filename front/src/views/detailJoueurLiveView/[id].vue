<script setup lang="ts">
import api, { type models } from '@/models/api';
import { WebsocketConnection } from '@/models/api';
import { defineAsyncComponent, onMounted, type Ref, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Section } from '@/models/section';
import { getNumRace } from '@/models/car';

const AutoRegeneratedAvatar = defineAsyncComponent(() => import('@/components/AutoRegeneratedAvatar.vue'));
const BonusList3 = defineAsyncComponent(() => import('@/components/BonusList4.vue'));
const RaceInfo = defineAsyncComponent(() => import('@/components/RaceInfo.vue'));


const route = useRoute();
const carId = route.params.id as string;
const hasLoaded = ref(false);
const errorMessage = ref<string>();
const BEST_TIME_INDEX = 0;
const carData: Ref<models.parsedData.CarData> | Ref<undefined> = ref();
const raceData: Ref<models.parsedData.RacesData> | Ref<undefined> = ref();
const hasError = ref(false);
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

  hasLoaded.value = true;

  await loadUserData();

  emit('load');
});

async function loadUserData() {
  // if (!listRace.value || !listRace.value[id]) return;



  const { json: oneCarQueryID } = await api.getDataOneCarId(carId);
  if ('message' in oneCarQueryID) {
    hasError.value = true;
    return;
  }
  carData.value = oneCarQueryID;

  //Récupère les courses de l'utilisateur
  const { json: allRaceOneCar } = await api.getAllRaceOneCar(carId);
  if ('message' in allRaceOneCar) {
    hasError.value = true;
    return;
  }
  raceData.value = allRaceOneCar;

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
  onMounted(async () => {
    hasLoaded.value = true;
  });
}
</script>

<template>
  <div class="contenu-en-tete">
    <RouterLink to="../pilote">
      <AutoRegeneratedAvatar class="avatar"
                             style="margin-top: 20px; margin-right: 30px; width: 130px; height: 130px"
                             :avatar-config="carData!.avatar"/>
    </RouterLink>
    <h1>{{ carData!.pseudo }}</h1>
  </div>

  <div class="contenu-principal">
    <div class="contenu-bonus">
      <BonusList3 :id-car="carData!.idCar"/>
    </div>

    <div class="contenu-course">
      <h2>Meilleure course</h2>
      <div v-if="raceData?.races.length != 0" class="course">
        <RaceInfo :display-rank="false"
                  :num-race="getNumRace(raceData!.races[BEST_TIME_INDEX], raceData!.races)"
                  :race="raceData!.races[BEST_TIME_INDEX]"
                  :rank="raceData!.rank"
                  class="race-info"/>
      </div>
      <div v-else>
        <p>Aucune course effectué</p>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.contenu-principal {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.contenu-bonus {
  flex: 1;
}

.contenu-course {
  flex: 2;
}

.course {
  display: flex;
  flex-direction: column;

  .race-info {
    margin: 0;
  }
}
.contenu-en-tete {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.contenu-en-tete h1 {
  margin: 0;
}

</style>