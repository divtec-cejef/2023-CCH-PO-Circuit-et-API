<template>
    <h1>Modifier</h1>
    <p>Sur cette page, tu peux modifier complètement ton avatar ainsi que ton pseudo ! Laisse courir ton
        imagination...</p>
    <div class="modify-avatar">
        <div class="tab">
            <div class="title">
                <div class="tab1">
                    <label>
                        <input @click="clickTab(1)" name="tab" type="radio" :checked="numTabOpen == 1">
                        <img src="../assets/img/face.png" alt="Icon visage homme">
                    </label>
                </div>
                <div class="tab2">
                    <label>
                        <input @click="clickTab(2)" name="tab" type="radio" :checked="numTabOpen == 2">
                        <img src="../assets/img/hanger.png" alt="Icon de ceintre">
                    </label>
                </div>
            </div>

            <div class="tab-content">
                <div v-if="numTabOpen == 1">
                    <div class="rd-bt" v-for="(index, key) in 5" :key="key">
                        <AvatarRadioSelector :avatar-property=avatarProperties[index]
                                             @regenerateAvatar="regenerateAvatar"></AvatarRadioSelector>
                    </div>
                </div>
                <div v-else>
                    <div class="rd-bt" v-for="(index, key) in 3" :key="key">
                        <AvatarRadioSelector :avatar-property=avatarProperties[index+5]
                                             @regenerateAvatar="regenerateAvatar"></AvatarRadioSelector>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-avatar">
            <AutoRegeneratedAvatar :avatar-config="config"></AutoRegeneratedAvatar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { genConfig } from 'holiday-avatar';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import AvatarRadioSelector from '@/components/AvatarRadioSelector.vue';
import { useCarStore } from '@/stores/car';
import { ref } from 'vue';

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

function clickTab(numTab: number) {
  numTabOpen.value = numTab;
  localStorage.setItem('numTabOpen', numTabOpen.value.toString());
}

//Initialisation des variables
let numTabOpen = ref(1);
if(localStorage.getItem('numTabOpen')) {
  numTabOpen.value = Number(localStorage.getItem('numTabOpen'));
}

</script>

<style scoped lang="scss">

div.modify-avatar {
    width: 95%;
    margin: 25px auto 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    div.content-avatar {
        width: 50%;
        display: flex;
        justify-content: center;

        div.avatar {
            width: 300px;
            height: 300px;
            box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
            border-radius: 200px;
        }
    }

    div.tab {
        display: flex;
        width: 50%;
        min-height: 355px;

        div.title {
            display: flex;
            flex-direction: column;
            margin-right: 20px;
            border-right: 1px solid var(--gray);
            padding-right: 12px;

            > div {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 1;

                label {
                    cursor: pointer;
                }


                input {
                    display: none;

                    ~ img {
                        filter: grayscale(1);
                        opacity: 0.7;
                        transition: 0.2s ease-in-out;
                    }

                    ~ img:hover {
                        filter: none;
                        opacity: 1;
                        transition: 0.2s ease-in-out;
                    }
                }

                input:checked ~ img {
                    filter: none;
                    opacity: 1;
                }
            }

            img {
                width: 45px;
            }
        }

        div.tab-content {
            display: flex;
            flex-direction: column;

            > div:nth-child(1) {
                height: 100%;
            }

            > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;
            }

            .rd-bt {
                width: fit-content;
            }
        }
    }
}
</style>