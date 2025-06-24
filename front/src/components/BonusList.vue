<template>
  <section>
  <h2>Mes bonus</h2>
  <div class="badges-liste">
    <div
        v-for="section in listAllBonus"
        :key="section.idSection"
        :style="{ backgroundColor: getSectionColor(section.realised) }"
        :class="{ 'not-realised': !section.realised }"
    >
      <img
          :src="getSectionBadge(section.name)"
          :alt="`Badge ${section.name}`"
      />
      <p>{{ section.name }}</p>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import badgeAutomaticien from '@/assets/img/automaticien.webp';
import badgeElectronicien from '@/assets/img/electronicien.webp';
import badgeHorloger from '@/assets/img/horloger.webp';
import badgeInformaticien from '@/assets/img/informaticien.webp';
import badgeLaborentin from '@/assets/img/laborentin.webp';
import badgeMicromecanicien from '@/assets/img/micromecanicien.webp';
import badgeDessinateur from  '@/assets/img/dessinateurs.webp';
import badgeMecaAuto from '@/assets/img/meca-auto.webp';
import badgeInconnu from '@/assets/img/sectionInconnu.webp';
import { onMounted, ref } from 'vue';
import api, { type models } from '@/models/api';
import { Section } from '@/models/section';

const props = defineProps<{
  idCar: number | string;
}>();


onMounted(() => {
  loadBonusList();
});

const listAllBonus = ref<{
  name: string;
  idSection: number;
  realised: boolean;
  listActivity: { name: string; realised: boolean }[];
}[]>([]);

function getSectionColor(realised: boolean): string {
  return realised ? '#d1ffb5' : '#d3d3d3';
}

function getSectionBadge(name: string): string {
  const badgeMap: Record<string, string> = {
    'Automatique': badgeAutomaticien,
    'Dessinateur': badgeDessinateur,
    'Electronique': badgeElectronicien,
    'Horlogerie': badgeHorloger,
    'Informatique': badgeInformaticien,
    'Laborantin': badgeLaborentin,
    'Mécanicien-auto': badgeMecaAuto,
    'Micromécanique': badgeMicromecanicien,
    'Qualiticien': badgeInconnu,
  };
  return badgeMap[name];
}

async function loadBonusList() {
  const { json: activities } = await api.getActivityOneCar(props.idCar);
  const { json: sections } = await api.getAllSections();

  const listActivityOneCarApi = activities;

  listAllBonus.value = [];

  for (const section of sections) {
    if (!Section.SectionNameHasActivity.includes(Section.formatName(section.label))) continue;

    const { json: activitiesInSection } = await api.getAllActivitiesOneSection(section.idSection);
    const activitiesList = activitiesInSection as models.parsedData.SectionActivities;

    const listActivityUser = activitiesList.map((activity) => ({
      name: activity.label,
      realised: listActivityOneCarApi.some((a) => a.idActivity === activity.idActivity),
    }));

    const sectionRealised = listActivityOneCarApi.some((a) => a.idSection === section.idSection);
    listAllBonus.value.push({
      name: section.label,
      idSection: section.idSection,
      realised: sectionRealised,
      listActivity: listActivityUser,
    });
  }
}

</script>

<style lang="scss" scoped>
.badges-liste div {
  width: 160px;
  height: 160px;
  padding: 10px;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  @media screen and (max-width: 425px) {
    width: 120px;
    height: 120px;
  }
}

.badges-liste div p {
  font-size: 1.1rem;
  color: black;
}

div.badges-liste {
  border-radius: 15px;
  margin: 1.5em auto auto;
  display: grid;
  justify-items: center;
  grid-column-gap: 15vw;
  grid-row-gap: 1.25em;
  width: fit-content;
  grid-template-columns: 1fr 1fr;

  @media screen and (min-width: 580px) {
    grid-column-gap: 2.75em;
    grid-template-columns: 1fr 1fr 1fr;
    width: auto;
  }

  p {
    margin: 5px 0;
  }

  img {
    width: 110px;
    height: 110px;
  }
}

@keyframes rotateOnce {
  from {
    transform: rotate(0deg) scale(1);
  }
  to {
    transform: rotate(360deg) scale(1.2);
  }
}

.badges-liste img {
  transition: transform 0.3s ease-in-out;
  transform: scale(1);
}

.badges-liste div:hover img {
  animation: rotateOnce 0.6s ease-in-out forwards;
}

.badges-liste div.not-realised img {
  opacity: 0.4;
  filter: grayscale(60%);
}
</style>