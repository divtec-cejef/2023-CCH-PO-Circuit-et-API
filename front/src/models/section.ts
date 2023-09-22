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

  export const getFilterColor = (sectionName: (typeof Section.SectionName)[number]) => {
    console.log(sectionName);
    if (!SectionName.includes(sectionName)) {
      throw new Error('Not a valid section.');
    }

    const filterColorCss: Record<(typeof Section.SectionNameHasActivity)[number], string> = {
      automatique: 'invert(9%) sepia(83%) saturate(6002%) hue-rotate(279deg) brightness(66%) contrast(101%)',
      dessinateur: 'invert(49%) sepia(93%) saturate(362%) hue-rotate(63deg) brightness(94%) contrast(98%)',
      electronique: 'invert(17%) sepia(73%) saturate(6989%) hue-rotate(310deg) brightness(77%) contrast(103%)',
      horlogerie: 'invert(61%) sepia(25%) saturate(3080%) hue-rotate(16deg) brightness(121%) contrast(98%)',
      laborantin: 'invert(97%) sepia(67%) saturate(4865%) hue-rotate(128deg) brightness(84%) contrast(88%)',
      micromecanique: 'invert(65%) sepia(48%) saturate(5955%) hue-rotate(165deg) brightness(89%) contrast(93%)',
      informatique: 'invert(57%) sepia(9%) saturate(6522%) hue-rotate(213deg) brightness(77%) contrast(73%) '
    };

    return filterColorCss[sectionName];
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