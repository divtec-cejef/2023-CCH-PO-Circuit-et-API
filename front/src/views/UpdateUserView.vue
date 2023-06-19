<template>
    <dialog id="connection-dialog" ref="dialog">
        <div class="header">
            <h2>Connexion</h2>
            <button @click.prevent="cancel"><img :src="cancelIcon" alt="close"></button>
        </div>
        <form @submit.prevent="() => connect(car.idQuery, password)">
            <label for="password">Code de la voiture </label>
            <input type="text" id="password" name="password" v-model="password">
            <p class="error">{{ error }}</p>
            <div class="button-container">
                <button type="submit">Se connecter</button>
            </div>
        </form>
    </dialog>

    <h1>Modifier</h1>
    <p>Sur cette page, tu peux modifier complètement ton avatar ainsi que ton pseudo ! Laisse courir ton
        imagination...</p>
    <div class="modify-avatar" @change="enableButton">
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

        <div>
            <div :style="{display: displayMsgValid}" class="msg-success">
                <img :src="validateIcon"
                     alt="Icon de validation de l'enregistrement des données">
            </div>
            <div class="content-avatar" :style="{opacity: opacityAvatar}">
                <AutoRegeneratedAvatar :avatar-config="config"></AutoRegeneratedAvatar>
            </div>

            <div class="modify-pseudo">
                <label for="pseudo">Pseudo : </label>
                <input type="text" id="pseudo" name="pseudo" v-model="refPseudo" @change="enableButton" maxlength="10">
            </div>

            <button @click.prevent="updateUser" ref="updateButton" :disabled="updateDisabled">Enregistrer</button>
        </div>
    </div>

    <div v-if="saveIsInvalid" class="show-error">
        <p>* Le pseudo doit contenir au moins 3 caractères.</p>
    </div>

</template>
<script setup lang="ts">
import { genConfig } from 'holiday-avatar';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import AvatarRadioSelector from '@/components/AvatarRadioSelector.vue';
import { useCarStore } from '@/stores/car';
import { onMounted, ref } from 'vue';
import AvatarColorPicker from '@/components/AvatarColorPicker.vue';
import api from '@/models/api';
import cancelIcon from '@/assets/img/cancel.png';
import validateIcon from '@/assets/img/checked.png';
import router from '@/router';
import type { Configs } from 'holiday-avatar';

//Initialisation des données de l'utilisateur
const userCar = useCarStore();
const { car } = userCar;
const config = ref(genConfig(car.avatar));
const password = ref('');
const error = ref('');
const saveIsInvalid = ref(false);
const refPseudo = ref(car.pseudo);
const displayMsgValid = ref('none');
const opacityAvatar = ref('');

// éléments de l'HTML
const dialog = ref<HTMLDialogElement | null>(null);
const updateDisabled = ref(true);

// Afficher la fenêtre de connexion si l'utilisateur n'est pas connecté
userCar.token = localStorage.getItem('carToken') || '';
onMounted(() => {
  if (userCar.token === '') {
    dialog.value?.showModal();
  }
});

/**
 * Connexion de l'utilisateur
 * @param queryId Identifiant d'url de la voiture
 * @param password mot de passe de la voiture
 */
async function connect(queryId: string, password: string) {
  //Récupération du Token avec le nom et mot de passe de l'URL
  let valueToken = await api.authenticationQueryIdPwd(queryId, password);

  //Si le token est valide
  if (valueToken.token !== undefined) {
    userCar.token = valueToken.token;
    localStorage.setItem('carToken', userCar.token);

    dialog.value?.close();
    error.value = '';
  } else {
    error.value = '* Code de la voiture incorrect';
    return;
  }

  // Test si enregistrement des données de la voiture
  if (refPseudo.value !== car.pseudo || !avatarEquals()) {
    await updateUser();
  }
}

/**
 * Compare deux avatars
 * @returns true si les deux avatars sont identiques, false sinon
 */
function avatarEquals() {
  let equlality = true;
  Object.keys(config.value).forEach((key) => {
    if (userCar.car.avatar === undefined)
      return;
    if (config.value[key as keyof Configs]  !== userCar.car.avatar[key as keyof Configs]) {
      equlality = false;

    }
  });
  return equlality;
}

/**
 * Active le bouton d'enregistrement si les données ont changé
 */
function enableButton() {
  updateDisabled.value = avatarEquals() && refPseudo.value.toString() === car.pseudo.toString();
}

/**
 * Quitter la page de modification
 */
function cancel() {
  router.push({ path: '/' });
}

/**
 * Met à jour les données de l'utilisateur (de la voiture)
 */
async function updateUser() {
  // Désactivation du bouton d'enregistrement
  updateDisabled.value = true;

  // Utilisateur Voiture pour l'enregistrement dans la db
  const reqUserCar = {
    token: userCar.token,
    car: {
      idCar: userCar.car.idCar,
      pseudo: userCar.car.pseudo,
      avatar: config.value
    }
  };

  // Vérification du pseudo
  if (refPseudo.value.length < 3) {
    refPseudo.value = userCar.car.pseudo;
    saveIsInvalid.value = true;
    return;
  }
  reqUserCar.car.pseudo = refPseudo.value;
  saveIsInvalid.value = false;

  // enregistrement de la voiture
  try {
    await api.updateCar(reqUserCar);
  } catch (e) {
    localStorage.removeItem('carToken');
    dialog.value?.showModal();
    return;
  }

  opacityAvatar.value = '0.5';
  displayMsgValid.value = 'flex';

  //Affichage de l'icon de succès
  setTimeout(() => {
    opacityAvatar.value = '1';
    displayMsgValid.value = 'none';
  }, 1500);

  // Enregistrement de la voiture dans Pinia
  userCar.car.avatar = JSON.parse(JSON.stringify(reqUserCar.car.avatar));
  userCar.car.pseudo = reqUserCar.car.pseudo;
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

  // Affectation de la nouvelle config
  config.value = genConfig(JSON.parse(JSON.stringify(config.value)));

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
  transition: all ease-in-out 0.1s;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;

    div.content-avatar {
      display: flex;
      justify-content: end;
      transition: all ease-in-out 0.2s;

      div.avatar {
        width: 300px;
        height: 300px;
        box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
        border-radius: 200px;
      }
    }

    div.modify-pseudo {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      label,
      input {
        display: block;
        margin: .5em 0;
      }

      input {
        width: 165px;
        border-radius: 3px;
        padding: 3px;
        border: 1px solid var(--black);
      }

      label {
        margin-right: 10px;
        font-weight: bold;
      }
    }

    button {
      background-color: var(--dark-green);
      border: 1px solid var(--dark-green);
      padding: 8px;
      border-radius: .6em;
      cursor: pointer;
      color: var(--white);
      margin-top: 10px;
      width: 120px;
      text-align: center;
      transition: ease-in-out 0.1s;

    }

    button:not(:disabled):hover {
      font-weight: bold;
      border: 1px solid var(--dark-green);
      transition: ease-in-out 0.1s;
    }

    button:disabled {
      background-color: var(--gray);
      border-color: var(--gray);
      opacity: 70%;
      transition: ease-in-out 0.1s;
      cursor: auto;
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

  div.header {
    h2 {
      width: unset;
    }

    button {
      img {
        height: 2.5em;
      }

      background-color: unset;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    display: flex;
    justify-content: space-between;
  }


  form {
    label,
    input {
      display: block;
      margin: 1em 0;
    }

    input {
      margin-bottom: .1em;
      border: 1px solid var(--black);
    }

    .error {
      display: block;
      height: 1em;
      color: var(--red);
      font-size: 1em;
      font-style: italic;
      margin-bottom: 1.2em;
    }

    button[type="submit"] {
      background-color: var(--white);
      border: 2px solid var(--dark-green);
      color: var(--dark-green);
      padding: 8px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: all ease-in-out 0.2s;
    }

    button[type="submit"]:hover {
      background-color: var(--dark-green);
      border: 2px solid var(--dark-green);
      color: var(--white);
      transition: all ease-in-out 0.2s;
    }

    div.button-container {
      display: flex;
      justify-content: center;
    }
  }
}

div.show-error {
  margin-top: 10px;
  color: var(--red);
  text-align: center;
  font-weight: bold;

  p {
    font-size: 15px;

  }
}

div.msg-success {
  width: 300px;
  height: 300px;
  display: flex;
  position: absolute;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 0.2s;
  border-radius: 200px;
  padding: 10px;

  img {
    width: 80px;
    height: 80px;
  }
}

</style>