<template>
  <section>
    <h2>Mes bonus</h2>
    <div class="badges">
      <div
          v-for="section in listAllBonus"
          :key="section.idSection"
          :style="{ backgroundColor: getSectionColor(section.name) }"
      >
        <img
            :src="getSectionBadge(section.name, section.realised)"
            :alt="`Badge ${section.name}`"
        />
        <p>{{ section.name }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import badgeAutomaticien from '@/assets/img/automaticien.png';
import badgeElectronicien from '@/assets/img/electronicien.png';
import badgeHorloger from '@/assets/img/horloger.png';
import badgeInformaticien from '@/assets/img/informaticien.png';
import badgeLaborentin from '@/assets/img/laborentin.png';
import badgeMicromecanicien from '@/assets/img/micromecanicien.png';
import badgeInconnu from '@/assets/img/sectionInconnu.png';
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

function getSectionColor(name: string): string {
  const color: Record<string, string> = {
    'Automatique': '#EDE9FE',
    'Dessinateur': '#E5E7EB',
    'Electronique': '#FCE7F3',
    'Horlogerie': '#FEF9C3',
    'Informatique': '#E0F2FE',
    'Laborantin': '#DCFCE7',
    'Mécanicien-auto': '#E5E7EB',
    'Micromécanique': '#DBEAFE',
    'Qualiticien': '#E5E7EB',
  };
  return color[name] ?? '#E5E7EB';
}

function getSectionBadge(name: string, realised: boolean): string {
  console.log('getSectionBadge', { name, realised });
  const badgeMap: Record<string, string> = {
    'Automatique': badgeAutomaticien,
    'Dessinateur': badgeInconnu,
    'Electronique': badgeElectronicien,
    'Horlogerie': badgeHorloger,
    'Informatique': badgeInformaticien,
    'Laborantin': badgeLaborentin,
    'Mécanicien-auto': badgeInconnu,
    'Micromécanique': badgeMicromecanicien,
    'Qualiticien': badgeInconnu,
  };

  if (!realised) return badgeInconnu;
  return badgeMap[name] ?? badgeInconnu;
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
  .badges div {
    width: 160px;
    height: 160px;
    padding: 10px;
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .badges div p {
    font-size: 1.1rem;
    color: black;
  }

  div.badges {
    border-radius: 15px;
    margin: 1.5em auto auto;
    display: grid;
    justify-items: center;
    grid-column-gap: 15vw;
    grid-row-gap: 1.25em;
    width: fit-content;
    grid-template-columns: 1fr 1fr;

    @media screen and (min-width: 475px) {
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

.badges img {
  transition: transform 0.3s ease-in-out;
  transform: scale(1);
}

.badges div:hover img {
  animation: rotateOnce 0.6s ease-in-out forwards;
}
</style>