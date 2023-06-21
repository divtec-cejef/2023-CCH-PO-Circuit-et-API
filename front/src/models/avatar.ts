import type { Configs } from 'holiday-avatar';

export namespace models {
  export type Avatar = Configs;

  /**
   * Représente une propriété de sélecteur de trait d'avatar
   */
  export type radioProperty = {
    propNameFr: string;
    propNameEn: string;
    propType: string;
    propGroups: string;
    propNameSnakeCase: string;
    propValues: {
      propValueEn: string;
      propValueFr: string;
    }[];
    selectedValueEn?: string;
  }
}

export default models;
