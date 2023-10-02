import type { Configs } from 'holiday-avatar';

export namespace models {
  export type Avatar = Configs;

  /**
   * Représente une propriété de sélecteur de trait d'avatar
   */
  export type RadioProperty<T = Exclude<Configs[keyof Configs], undefined>> = {
    propNameFr: string;
    propNameEn: string;
    propType: string;
    propGroups: string;
    propNameSnakeCase: string;
    propValues: {
      value: T;
      label: string;
    }[];
    selectedValue?: T;
  }
}

export default models;
