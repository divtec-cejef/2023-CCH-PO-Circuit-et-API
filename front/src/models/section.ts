export namespace Section {
  export const SectionName = [
    'dessinateur',
    'industries4.0',
    'micromecanique',
    'electronique',
    'automatique',
    'mecatronique',
    'horlogerie',
    'laborantin',
    'informatique'];

  export const SectionNameHasActivity = [
    'dessinateur',
    'micromecanique',
    'electronique',
    'automatique',
    'horlogerie',
    'laborantin',
    'informatique'
  ];

  export const getColor = (sectionName: (typeof Section.SectionName)[number]) => {
    console.log(sectionName);
    if (!SectionName.includes(sectionName)) {
      throw new Error('Not a valid section.');
    }

    const colors: Record<(typeof Section.SectionName)[number], string> = {
      automatique: '#4e0975',
      dessinateur: '#42aa2b',
      electronique: '#bd0381',
      horlogerie: '#f4c503',
      'industries4.0': '#56c1f0',
      laborantin: '#2ccdbd',
      mecatronique: '#d30369',
      micromecanique: '#099ad9',
      informatique: '#766eb1'
    };

    return colors[sectionName];
  };

  /**
   * Formate le nom donné (sans caractère spéciaux ni majuscule)
   * @param name
   */
  export const formatName = (name: string) => {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
}

export default Section;