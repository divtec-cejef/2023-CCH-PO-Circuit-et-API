import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { models } from '@/models/api';
import api from '@/models/api';

export const useAdminPostStore = defineStore('adminPost', () => {
  const idSection = ref<number | undefined>(undefined);
  const sectionName = ref<string>('');
  const token = ref<string>('');
  const listActivity = ref<models.parsedData.SectionActivities>([]);

  /**
   * Initialisation des activités d'une section
   * @param idSection Id de la section
   */
  async function initAllActivityOneSection(idSection: number) {
    const { json: dataActivity } = await api.getAllActivitiesOneSection(idSection);

    if ('message' in dataActivity) {
      console.error(dataActivity.message);
      return;
    }

    //Vide la liste
    listActivity.value = [];

    //Ajout des données
    dataActivity.forEach((activityTable) => {
      listActivity.value.push({
        idActivity: activityTable.idActivity,
        label: activityTable.label,
        idSection: activityTable.idSection
      });
    });

  }

  /**
   * Rempli le champ du nom de la section en fonction de son ID
   * @param idSection ID de la section
   */
  async function getNameSectionById(idSection: number) {
    const { json: dataSection } = await api.getNameSectionById(idSection);
    if ('message' in dataSection) {
      console.error(dataSection.message);
      return;
    }

    return dataSection.label;
  }

  /**
   * Reset le store
   */
  function $reset() {
    idSection.value = undefined;
    sectionName.value = '';
    token.value = '';
    listActivity.value = [];
  }

  return {
    idSection, sectionName, token, listActivity,
    initAllActivityOneSection, getNameSectionById, $reset
  };
});
