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
import badgeQualiticien from '@/assets/img/qualiticien.webp';
import badgeForum from '@/assets/img/forum.webp';
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
  return realised ? '#d1ffb5' : '#393939';
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
    'Qualiticien': badgeQualiticien,
    'Forum' : badgeForum,
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
.badges-liste {
  display: grid;
  justify-items: center;
  gap: 1.5em;
  margin: 1.5em auto;
  width: 100%;
  max-width: 900px;

  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.badges-liste div {
  background-color: #393939;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  aspect-ratio: 1 / 1;
  width: 100%;
  max-width: 160px;
  min-width: 160px;
  height: 170px;
  padding: 12px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    max-width: 140px;
    min-width: 140px;
    height: 145px;
    padding: 8px;
  }
}

.badges-liste img {
  width: 75%;
  height: auto;
  transition: transform 0.3s ease-in-out;
}

.badges-liste div p {
  margin-top: 0.5em;
  font-size: 1.1rem;
  text-align: center;
  color: black;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
}

.badges-liste div:hover img {
  animation: rotateOnce 0.6s ease-in-out forwards;
}

.badges-liste div.not-realised img {
  opacity: 0.4;
  filter: grayscale(100%);
}

@keyframes rotateOnce {
  from {
    transform: rotate(0deg) scale(1);
  }
  to {
    transform: rotate(360deg) scale(1.2);
  }
}

</style>