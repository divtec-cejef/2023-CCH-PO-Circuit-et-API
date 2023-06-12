<template>
    <dialog id="connection-dialog" ref="dialog">
        <h2>Connection</h2>
        <form @submit.prevent="() => connect(car.idQuery, password)">
            <label for="password">Code de la voiture </label>
            <input type="text" id="password" name="password" v-model="password">
            <p class="error">{{ error }}</p>
            <div class="button-container">
                <button @click.prevent="abort" class="abort">Annuler</button>
                <button type="submit">Se connecter</button>
            </div>
        </form>
    </dialog>
    <h1>Modifier</h1>
    <p>Sur cette page, tu peux modifier complètement ton avatar ainsi que ton pseudo ! Laisse courir ton
        imagination...</p>
    <div class="modify-avatar">
        <div class="tab">
            <div class="title">
                <div class="tab1">
                    <label>
                        <input @click="clickTab(1)" name="tab" type="radio" :checked="numTabOpen == 1">
                        <img src="../assets/img/face.webp" alt="Icon visage homme">
                    </label>
                </div>
                <div class="tab2">
                    <label>
                        <input @click="clickTab(2)" name="tab" type="radio" :checked="numTabOpen == 2">
                        <img src="../assets/img/hanger.webp" alt="Icon de ceintre">
                    </label>
                </div>
            </div>

            <div class="tab-content">
                <div v-if="numTabOpen == 1">
                    <template v-for="(props, key) in avatarPropertiesHead" :key="key">
                        <AvatarRadioSelector v-if="props.propType == TYPE_PROPS_TXT" :avatar-property=props
                                             @regenerateAvatar="regenerateAvatar"/>
                        <AvatarColorPicker v-else :avatar-property="props" @regenerateAvatar="regenerateAvatar"/>
                    </template>
                </div>
                <div v-else>
                    <template v-for="(props, key) in avatarPropertiesClothes" :key="key">
                        <AvatarRadioSelector v-if="props.propType == TYPE_PROPS_TXT" :avatar-property=props
                                             @regenerateAvatar="regenerateAvatar"/>
                        <AvatarColorPicker v-else :avatar-property="props" @regenerateAvatar="regenerateAvatar"/>
                    </template>
                </div>
            </div>
        </div>

        <div class="content-avatar">
            <AutoRegeneratedAvatar :avatar-config="config"></AutoRegeneratedAvatar>
        </div>
    </div>
    <div class="modify-pseudo">
        <label for="pseudo">Pseudo :</label>
        <input type="text" id="pseudo" name="pseudo" v-model="pseudo">
    </div>
</template>

<script setup lang="ts">
import { genConfig } from 'holiday-avatar';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import AvatarRadioSelector from '@/components/AvatarRadioSelector.vue';
import { useCarStore } from '@/stores/car';
import { onMounted, ref } from 'vue';
import AvatarColorPicker from '@/components/AvatarColorPicker.vue';
import restful from '@/models/api';

//Initialisation des données de l'utilisateur
const userCar = useCarStore();
const { car } = userCar;
const config = ref(genConfig(car.avatar));
const password = ref('');
const error = ref('');
const pseudo = ref(car.pseudo);

const dialog = ref<HTMLDialogElement | null>(null);

userCar.token = localStorage.getItem('carToken') || '';
onMounted(() => {
  if (userCar.token === '') {
    dialog.value?.showModal();
  }
});

async function connect(queryId: string, password: string) {
  //Récupération du Token avec le nom et mot de passe de l'URL
  let valueToken = await restful.authenticationQueryIdPwd(queryId, password);

  //Si le token est valide
  if (valueToken.token !== undefined) {
    userCar.token = valueToken.token;
    localStorage.setItem('carToken', userCar.token);

    dialog.value?.close();
    error.value = '';
  } else {
    error.value = 'Code de la voiture incorrect';
  }
}

function abort() {
  window.location.href = '/';
}

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
    hairColorRandom: true,
    hairColor: config.value.hairColor,
    shirtColor: config.value.shirtColor,
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

//Initialisation des constantes
const NAME_HEAD_PROPS = 'head';
const NAME_CLOTHES_PROPS = 'clothes';
const TYPE_PROPS_TXT = 'txt';
const TYPE_PROPS_COLOR = 'color';

const avatarProperties = [
  {
    propNameFr: 'Genre',
    propNameEn: 'sex',
    propNameSnakeCase: 'sex',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_HEAD_PROPS,
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
    propNameFr: 'Couleur du visage',
    propNameEn: 'faceColor',
    propNameSnakeCase: 'face-color',
    propType: TYPE_PROPS_COLOR,
    propGroups: NAME_HEAD_PROPS,
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
        propValueEn: '#ECB',
        propValueFr: 'Beige1',
      },
      {
        propValueEn: '#C87',
        propValueFr: 'Beige2',
      },
      {
        propValueEn: '#B74',
        propValueFr: 'Beige3',
      },
      {
        propValueEn: '#853',
        propValueFr: 'Beige4',
      },
      {
        propValueEn: '#321',
        propValueFr: 'Noir2',
      }
    ],
    selectedValueEn: config.value.faceColor
  },
  {
    propNameFr: 'Type des yeux',
    propNameEn: 'eyeType',
    propNameSnakeCase: 'eye-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_HEAD_PROPS,
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
    propNameFr: 'Type de nez',
    propNameEn: 'noseType',
    propNameSnakeCase: 'nose-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_HEAD_PROPS,
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
    propNameFr: 'Type de bouche',
    propNameEn: 'mouthType',
    propNameSnakeCase: 'mouth-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_HEAD_PROPS,
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
    propNameFr: 'Taille des oreilles',
    propNameEn: 'earSize',
    propNameSnakeCase: 'ear-size',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_HEAD_PROPS,
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
    propNameFr: 'Couleur de fond',
    propNameEn: 'bgColor',
    propNameSnakeCase: 'bg-color',
    propType: TYPE_PROPS_COLOR,
    propGroups: NAME_CLOTHES_PROPS,
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
      },
      {
        propValueEn: '#80F',
        propValueFr: 'Violet',
      }
    ],
    selectedValueEn: config.value.bgColor
  },
  {
    propNameFr: 'Type de cheveux',
    propNameEn: 'hairType',
    propNameSnakeCase: 'hair-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_CLOTHES_PROPS,
    propValues: [
      {
        propValueEn: 'normal',
        propValueFr: 'Normaux',
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
    propNameFr: 'Couleur de cheveux',
    propNameEn: 'hairColor',
    propNameSnakeCase: 'hair-color',
    propType: TYPE_PROPS_COLOR,
    propGroups: NAME_CLOTHES_PROPS,
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
        propValueEn: '#E71',
        propValueFr: 'Roux',
      },
      {
        propValueEn: '#FFB',
        propValueFr: 'Blond',
      },
      {
        propValueEn: '#643',
        propValueFr: 'Brun',
      },
      {
        propValueEn: '#C96',
        propValueFr: 'Chatin',
      },
      {
        propValueEn: '#61C',
        propValueFr: 'Violet',
      }
    ],
    selectedValueEn: config.value.hairColor
  },
  {
    propNameFr: 'Type de haut',
    propNameEn: 'shirtType',
    propNameSnakeCase: 'shirt-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_CLOTHES_PROPS,
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
    propNameFr: 'Couleur du haut (habit)',
    propNameEn: 'shirtColor',
    propNameSnakeCase: 'shirt-color',
    propType: TYPE_PROPS_COLOR,
    propGroups: NAME_CLOTHES_PROPS,
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
        propValueEn: '#44B',
        propValueFr: 'Violet',
      },
      {
        propValueEn: '#1CC',
        propValueFr: 'Bleu',
      },
      {
        propValueEn: '#0A3',
        propValueFr: 'Vert',
      },
      {
        propValueEn: '#FC0',
        propValueFr: 'Jaune',
      },
      {
        propValueEn: '#D22',
        propValueFr: 'Rouge',
      }
    ],
    selectedValueEn: config.value.shirtColor
  },
  {
    propNameFr: 'Type de lunettes',
    propNameEn: 'glassesType',
    propNameSnakeCase: 'glasses-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_CLOTHES_PROPS,
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
  },
  {
    propNameFr: 'Type de chapeau',
    propNameEn: 'hatType',
    propNameSnakeCase: 'hat-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_CLOTHES_PROPS,
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
    propNameFr: 'Couleur de chapeau',
    propNameEn: 'hatColor',
    propNameSnakeCase: 'hat-color',
    propType: TYPE_PROPS_COLOR,
    propGroups: NAME_CLOTHES_PROPS,
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
        propValueEn: '#CCC',
        propValueFr: 'Gris',
      },
      {
        propValueEn: '#965',
        propValueFr: 'Rose',
      },
      {
        propValueEn: '#193',
        propValueFr: 'Vert',
      },
      {
        propValueEn: '#FBB',
        propValueFr: 'Rose',
      },
      {
        propValueEn: '#43B',
        propValueFr: 'Violet',
      }
    ],
    selectedValueEn: config.value.hatColor
  }
];

//Tri de l'interface pour les deux tabs
const avatarPropertiesHead = avatarProperties.filter(props => props.propGroups === NAME_HEAD_PROPS);
const avatarPropertiesClothes = avatarProperties.filter(props => props.propGroups === NAME_CLOTHES_PROPS);

/**
 * Fonction qui change la valeur du tab cliqué
 * @param numTab Numéro de la tab cliqué
 */
function clickTab(numTab: number) {
  numTabOpen.value = numTab;
  localStorage.setItem('numTabOpen', numTabOpen.value.toString());
}

//Initialisation des variables
let numTabOpen = ref(1);
if (localStorage.getItem('numTabOpen')) {
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
    width: 40%;
    display: flex;
    justify-content: end;

    div.avatar {
      width: 300px;
      height: 300px;
      box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
      border-radius: 200px;
    }
  }

  div.tab {
    display: flex;
    width: 60%;
    min-height: 480px;

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
          width: 50px;
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
        width: 100%;
        height: 100%;
      }

      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
      }

      fieldset.color {
        padding-left: 30px;
      }

      fieldset {
        width: 100%;
        padding-right: 30px;
      }

      fieldset:nth-child(1) {
        padding-left: 0;
      }

      div fieldset:nth-child(2) {
        padding-left: 0;

      }
    }
  }
}


#connection-dialog {
  border: none;
  border-radius: 1em;

  form {
    label,
    input {
      display: block;
      margin: 1em 0;
    }

    input {
      margin-bottom: .1em;
    }

    .error {
      display: block;
      height: 1em;
      color: #E33821;
      font-size: 1em;
      font-style: italic;
    }

    button[type="submit"] {
      background-color: #FFFFFF;
      border: 3px solid #000000;
      padding: .5em;
      border-radius: .3em;
      cursor: pointer;
      margin-left: auto;
    }

    button.abort {
      cursor: pointer;
      background-color: unset;
      border: none;
      color: #E33821;
      font-style: italic;
    }

    div.button-container {
      display: flex;
      justify-content: space-between;
    }
  }

  h2 {
    width: unset;
  }
}
</style>