export namespace Section {
  export const SectionName = [
    'dessinateur',
    'industries2.0',
    'micromecanique',
    'electronique',
    'automatique',
    'mecatronique',
    'horlogerie',
    'laborantin'];

  export const getColor = (sectionName: (typeof Section.SectionName)[number]) => {
    if (!SectionName.includes(sectionName)) {
      throw new Error('Not a valid section.');
    }

    const colors: Record<(typeof Section.SectionName)[number], string> = {
      automatique: '#4e0975',
      dessinateur: '#42aa2b',
      electronique: '#bd0381',
      horlogerie: '#f4c503',
      'industries2.0': '#56c1f0',
      laborantin: '#2ccdbd',
      mecatronique: '#d30369',
      micromecanique: '#099ad9'
    };

    return colors[sectionName];
  };
}

export default Section;