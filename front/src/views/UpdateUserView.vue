<template>
    <AutoRegeneratedAvatar :avatar-config="config"></AutoRegeneratedAvatar>

    <div v-for="(item, key) in avatarProperties" :key="key">
        <AvatarRadioSelector :avatar-property=item @regenerateAvatar="regenerateAvatar"></AvatarRadioSelector>
    </div>
    <div v-for="(item, key) in avatarColorProperties" :key="key">
        <AvatarColorPicker :avatar-property=item @regenerateAvatar="regenerateAvatar"></AvatarColorPicker>
    </div>
</template>

<script setup lang="ts">
import { genConfig } from 'holiday-avatar';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import AvatarRadioSelector from '@/components/AvatarRadioSelector.vue';
import { useCarStore } from '@/stores/car';
import { ref } from 'vue';
import AvatarColorPicker from '@/components/AvatarColorPicker.vue';


//Initialisation des données de l'utilisateur
const userCar = useCarStore();
const { car } = userCar;
const config = ref(genConfig(car.avatar));

/**
 * Regénère l'avatar
 * @param parameter Paramètre changé
 * @param value Nouvelle valeur
 */
function regenerateAvatar(parameter: string, value: any) {

  //Remplissage du champ changé
  if (parameter in config.value) {
    (config.value as { [index: string]: any })[parameter] = value;
  }

  //Affectation de la nouvelle config
  config.value = genConfig({
    bgColor: config.value.bgColor,
    hatColor: config.value.hatColor,
    faceColor: config.value.faceColor,
    hairColor: config.value.hairColor,
    shirtColor: config.value.shirtColor,
    hairColorRandom: config.value.hairColorRandom,
    sex: config.value.sex,
    earSize: config.value.earSize,
    hatType: config.value.hatType,
    eyeType: config.value.eyeType,
    hairType: config.value.hairType,
    noseType: config.value.noseType,
    mouthType: config.value.mouthType,
    shirtType: config.value.shirtType,
    eyeBrowType: config.value.eyeBrowType,
    glassesType: config.value.glassesType,
    shape: config.value.shape
  });
}

const avatarProperties = [
  {
    propNameFr: 'Type de bouche',
    propNameEn: 'mouthType',
    propNameSnakeCase: 'mouth-type',
    propValues: [
      {
        propValueEn: 'laugh',
        propValueFr: 'Rire',
      },
      {
        propValueEn: 'smile',
        propValueFr: 'Sourire',
      },
      {
        propValueEn: 'peace',
        propValueFr: 'Normal',
      }
    ],
    selectedValueEn: config.value.mouthType
  },
  {
    propNameFr: 'Genre',
    propNameEn: 'sex',
    propNameSnakeCase: 'sex',
    propValues: [
      {
        propValueEn: 'male',
        propValueFr: 'Homme',
      },
      {
        propValueEn: 'female',
        propValueFr: 'Femme',
      }
    ],
    selectedValueEn: config.value.sex
  },
  {
    propNameFr: 'Taille des oreilles',
    propNameEn: 'earSize',
    propNameSnakeCase: 'ear-size',
    propValues: [
      {
        propValueEn: 'small',
        propValueFr: 'Petites',
      },
      {
        propValueEn: 'big',
        propValueFr: 'Grandes',
      }
    ],
    selectedValueEn: config.value.earSize
  },
  {
    propNameFr: 'Type des yeux',
    propNameEn: 'eyeType',
    propNameSnakeCase: 'eye-type',
    propValues: [
      {
        propValueEn: 'circle',
        propValueFr: 'Ronds',
      },
      {
        propValueEn: 'oval',
        propValueFr: 'Ovals',
      },
      {
        propValueEn: 'smile',
        propValueFr: 'Plissés',
      }
    ],
    selectedValueEn: config.value.eyeType
  },
  {
    propNameFr: 'Type de cheveux',
    propNameEn: 'hairType',
    propNameSnakeCase: 'hair-type',
    propValues: [
      {
        propValueEn: 'normal',
        propValueFr: 'Normals',
      },
      {
        propValueEn: 'thick',
        propValueFr: 'Epais',
      },
      {
        propValueEn: 'mohawk',
        propValueFr: 'Crête',
      },
      {
        propValueEn: 'femaleLong',
        propValueFr: 'Très longs',
      },
      {
        propValueEn: 'femaleShort',
        propValueFr: 'Longs',
      }
    ],
    selectedValueEn: config.value.hairType
  },
  {
    propNameFr: 'Type de chapeau',
    propNameEn: 'hatType',
    propNameSnakeCase: 'hat-type',
    propValues: [
      {
        propValueEn: 'none',
        propValueFr: 'Aucun',
      },
      {
        propValueEn: 'beanie',
        propValueFr: 'Bonnet',
      },
      {
        propValueEn: 'turban',
        propValueFr: 'Turban',
      }
    ],
    selectedValueEn: config.value.hatType
  },
  {
    propNameFr: 'Type de nez',
    propNameEn: 'noseType',
    propNameSnakeCase: 'nose-type',
    propValues: [
      {
        propValueEn: 'short',
        propValueFr: 'Court',
      },
      {
        propValueEn: 'long',
        propValueFr: 'Long',
      },
      {
        propValueEn: 'round',
        propValueFr: 'Rond',
      }
    ],
    selectedValueEn: config.value.noseType
  },
  {
    propNameFr: 'Type de haut',
    propNameEn: 'shirtType',
    propNameSnakeCase: 'shirt-type',
    propValues: [
      {
        propValueEn: 'hoody',
        propValueFr: 'Sweat',
      },
      {
        propValueEn: 'short',
        propValueFr: 'T-shirt',
      },
      {
        propValueEn: 'polo',
        propValueFr: 'Polo',
      }
    ],
    selectedValueEn: config.value.shirtType
  },
  {
    propNameFr: 'Type de lunettes',
    propNameEn: 'glassesType',
    propNameSnakeCase: 'glasses-type',
    propValues: [
      {
        propValueEn: 'none',
        propValueFr: 'Aucunes',
      },
      {
        propValueEn: 'round',
        propValueFr: 'Rondes',
      },
      {
        propValueEn: 'square',
        propValueFr: 'Carrées',
      }
    ],
    selectedValueEn: config.value.glassesType
  }
];

const avatarColorProperties = [
  {
    propNameFr: 'Couleur de fond',
    propNameEn: 'bgColor',
    propNameSnakeCase: 'bg-color',
    propValues: [
      {
        propValueEn: '#FFF',
        propValueFr: 'Blanc',
      },
      {
        propValueEn: '#000',
        propValueFr: 'Noir',
      },
      {
        propValueEn: '#014',
        propValueFr: 'Bleu',
      },
      {
        propValueEn: '#B22',
        propValueFr: 'Rouge',
      },
      {
        propValueEn: '#1A2',
        propValueFr: 'Vert',
      },
      {
        propValueEn: '#FC0',
        propValueFr: 'Jaune',
      }
    ],
    selectedValueEn: config.value.bgColor
  },
  {
    propNameFr: 'Couleur de chapeau',
    propNameEn: 'hatColor',
    propNameSnakeCase: 'hat-color',
    propValues: [
      {
        propValueEn: '#FFF',
        propValueFr: 'Blanc',
      },
      {
        propValueEn: '#000',
        propValueFr: 'Noir',
      },
      {
        propValueEn: '#014',
        propValueFr: 'Bleu',
      },
      {
        propValueEn: '#B22',
        propValueFr: 'Rouge',
      },
      {
        propValueEn: '#1A2',
        propValueFr: 'Vert',
      },
      {
        propValueEn: '#FC0',
        propValueFr: 'Jaune',
      }
    ],
    selectedValueEn: config.value.hatColor
  },
  {
    propNameFr: 'Couleur du visage',
    propNameEn: 'faceColor',
    propNameSnakeCase: 'face-color',
    propValues: [
      {
        propValueEn: '#FFF',
        propValueFr: 'Blanc',
      },
      {
        propValueEn: '#000',
        propValueFr: 'Noir',
      },
      {
        propValueEn: '#014',
        propValueFr: 'Bleu',
      },
      {
        propValueEn: '#B22',
        propValueFr: 'Rouge',
      },
      {
        propValueEn: '#1A2',
        propValueFr: 'Vert',
      },
      {
        propValueEn: '#FC0',
        propValueFr: 'Jaune',
      }
    ],
    selectedValueEn: config.value.faceColor
  },
  {
    propNameFr: 'Couleur de cheveux',
    propNameEn: 'hairColor',
    propNameSnakeCase: 'hair-color',
    propValues: [
      {
        propValueEn: '#FFF',
        propValueFr: 'Blanc',
      },
      {
        propValueEn: '#000',
        propValueFr: 'Noir',
      },
      {
        propValueEn: '#014',
        propValueFr: 'Bleu',
      },
      {
        propValueEn: '#B22',
        propValueFr: 'Rouge',
      },
      {
        propValueEn: '#1A2',
        propValueFr: 'Vert',
      },
      {
        propValueEn: '#FC0',
        propValueFr: 'Jaune',
      }
    ],
    selectedValueEn: config.value.hairColor
  },
  {
    propNameFr: 'Couleur du haut (habit)',
    propNameEn: 'shirtColor',
    propNameSnakeCase: 'shirt-color',
    propValues: [
      {
        propValueEn: '#FFF',
        propValueFr: 'Blanc',
      },
      {
        propValueEn: '#000',
        propValueFr: 'Noir',
      },
      {
        propValueEn: '#014',
        propValueFr: 'Bleu',
      },
      {
        propValueEn: '#B22',
        propValueFr: 'Rouge',
      },
      {
        propValueEn: '#1A2',
        propValueFr: 'Vert',
      },
      {
        propValueEn: '#FC0',
        propValueFr: 'Jaune',
      }
    ],
    selectedValueEn: config.value.shirtColor
  }
];


</script>

<style scoped lang="scss">

div.avatar {
    width: 200px;
    height: 200px;
}
</style>