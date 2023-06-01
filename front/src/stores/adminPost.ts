import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { models } from '@/models/interface';
import api from '@/models/api';

export const useAdminPostStore = defineStore('adminPost', () => {
  const sectionName: Ref<string> = ref('');
  const mdp: Ref<string> = ref('');
  const token : Ref<string> = ref('');
  const listActivity : Ref<models.activity[]> = ref([]);

  /**
   * Initialisation des activités d'une section
   * @param idSection Id de la section
   */
  async function initAllActivityOneSection(idSection: number)  {
    const { json: dataActivity } = await api.getAllActivityOneSection(idSection);

    dataActivity.forEach((activityTable : any) => {
      listActivity.value.push({
        idActivity: activityTable['id_activity'],
        name: activityTable['label'],
        idSection : activityTable['id_section']
      });
    });

    return listActivity;
  }
  return { sectionName, mdp, token, listActivity, initAllActivityOneSection };
});