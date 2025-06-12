<script setup lang="ts">
import api, { type models } from '@/models/api';
import { WebsocketConnection } from '@/models/api';
import { defineAsyncComponent, onUnmounted, ref, } from 'vue';
import { useRoute } from 'vue-router';
import { Section } from '@/models/section';
import type {Configs} from "holiday-avatar";
const AutoRegeneratedAvatar = defineAsyncComponent(() => import('@/components/AutoRegeneratedAvatar.vue'));

const route = useRoute();
const id = Number(route.params.id);
const hasLoaded = ref(false);
const errorMessage = ref<string>();

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

onUnmounted(() => socket.destroy());

async function loadUserData() {
  if (!listRace.value || !listRace.value[id]) return;

  const carId = listRace.value[id].car.id_car;

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

function getColorClass(name: string): string {
  const color: Record<string, string> = {
    "Automatique": "color-automatique",
    "Dessinateur": "color-dessinateur",
    "Electronique": "color-electronique",
    "Horlogerie": "color-horlogerie",
    "Informatique": "color-informatique",
    "Laborantin": "color-laborantin",
    "Mécanicien-auto": "color-mecanicien",
    "Micromécanique": "color-micormecanique",
    "Qualiticien": "color-qualiticien",
  };
  return color[name];
}

const props = defineProps<{
  idCar: number | string;
  rank: number;
  pseudo: string;
  time: Date;
  avatar: Configs;
  showContent: boolean,
  isNewElement?: boolean
}>();
</script>

<template>
  <h1>Détail joueur {{ listRace[id].car.pseudo }}</h1>
  <AutoRegeneratedAvatar :avatar-config="props.avatar"/>
  <div>
    <h2>Meilleure course</h2>
    {{ props.avatar }}
  </div>

  <div>
    <h2>Bonus</h2>
    <ul>
      <li v-for="section in listAllBonus" :key="section.idSection">
        <span v-if="section.realised">✅</span>
        <span v-else>❌</span>
        <span class="section-nom" :class="getColorClass(section.name)">
            {{ section.name }}
        </span>
      </li>
    </ul>
  </div>

  <h2>Voiture</h2>
  <h2>Vidéo</h2>
</template>

<style scoped lang="scss">
li {
  list-style-type: none;
}

/* Bonus */
.section-nom {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: bold;
  color: white;
  margin-left: 1rem;
}
.color-automatique {
  background-color: #a055ad;
}
.color-dessinateur {
  background-color: #43b02a;
}
.color-electronique {
  background-color: #bd1e6c;
}
.color-horlogerie {
  background-color: #ffcd00;
}
.color-informatique {
  background-color: #766eb1;
}
.color-laborantin {
  background-color: #2cd5c4;
}
.color-mecanicien {
  background-color: #07a0e1;
}
.color-micormecanique {
  background-color: #07a0e1;
}
.color-qualiticien {
  background-color: #156385;
}
</style>
