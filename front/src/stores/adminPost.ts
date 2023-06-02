import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { models } from '@/models/interface';
import api from '@/models/api';

export const useAdminPostStore = defineStore('adminPost', () => {
  const idSection: Ref<number> = ref(0);
  const sectionName: Ref<string> = ref('');
  const token : Ref<string> = ref('');
  const listActivity : Ref<models.activity[]> = ref([]);

  /**
   * Initialisation des activités d'une section
   * @param idSection Id de la section
   */
  async function initAllActivityOneSection(idSection: number)  {
    const { json: dataActivity } = await api.getAllActivityOneSection(idSection);

    //Vide la liste
    listActivity.value = [];

    //Ajout des données
    dataActivity.forEach((activityTable : any) => {
      listActivity.value.push({
        idActivity: activityTable['id_activity'],
        name: activityTable['label'],
        idSection : activityTable['id_section']
      });
    });

  }

  /**
   * Rempli le champ du nom de la section en fonction de son ID
   * @param idSection ID de la section
   */
  async function getNameSectionById(idSection : number) {
    const { json: dataSection } = await api.getNameSectionById(idSection);
    return dataSection.label;
  }


  return {
    idSection, sectionName, token, listActivity,
    initAllActivityOneSection, getNameSectionById
  };
});