import api from '@/models/api';
import type { models } from '@/models/interface';

export namespace activity {


  /**
   * Initialisation des activités d'une section
   * @param idSection Id de la section
   */
  export async function initAllActivityOneSection(idSection: number)  {
    const { json: dataActivity } = await api.getAllActivityOneSection(idSection);

    const listActivity : models.activity[] = [];

    dataActivity.forEach((activityTable : any) => {
      listActivity.push({
        idActivity: activityTable['id_activity'],
        name: activityTable['label'],
        idSection : activityTable['id_section']
      });
    });

    return listActivity;
  }
}