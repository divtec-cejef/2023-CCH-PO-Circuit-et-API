import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { models } from '@/models/api';
import api from '@/models/api';

export const useAdminPostStore = defineStore('adminPost', () => {
  const idSection = ref<number>(0);
  const sectionName = ref<string>('');
  const token = ref<string>('');
  const listActivity = ref<models.parsedData.SectionActivities>([]);

  /**
   * Initialisation des activités d'une section
   * @param idSection Id de la section
   */
  async function initAllActivityOneSection(idSection: number) {
    const { json: dataActivity } = await api.getAllActivityOneSection(idSection);

    if (typeof dataActivity === 'string') {
      console.error(dataActivity);
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
    if (typeof dataSection === 'string') {
      console.error(dataSection);
      return;
    }

    return dataSection.label;
  }


  return {
    idSection, sectionName, token, listActivity,
    initAllActivityOneSection, getNameSectionById
  };
});
