<template>
    <div class="content">
        <dialog id="connection-dialog" ref="dialog">
            <div class="header">
                <h2>Connexion</h2>
                <button @click.prevent="cancel"><img :src="cancelIcon" alt="close"></button>
            </div>
            <form @submit.prevent="() => connect(car.idQuery!, password)">
                <label for="password">Code de la voiture </label>
                <input type="text" id="password" name="password" v-model="password">
                <p class="error">Code invalide.</p>
                <div class="button-container">
                    <button type="submit">Se connecter</button>
                </div>
            </form>
        </dialog>

        <dialog id="exit-dialog" ref="dialogExit">
            <div class="header">
                <h2>Avertissement</h2>
                <button @click.prevent="closeModal"><img :src="cancelIcon" alt="close"></button>
            </div>
            <div>Tu n'as as enregistré tes modifications !
                <br>Es-tu sûr de vouloir quitter ?
            </div>
            <div class="button-container">
                <button @click="closeModal">Non</button>
                <button class="destructive" @click="quitPage">Oui</button>
                <button class="main" @click="saveAndQuit">Enregistrer
                </button>
            </div>
        </dialog>

        <h1>Pilote</h1>
        <p>Sur cette page, tu peux modifier complètement ton avatar ainsi que ton pseudo ! Laisse courir ton
            imagination...</p>
        <div :class="'modify-avatar ' + (classDisplayModif ? 'none' : 'display')" @change="enableButton">
            <div class="tab">
                <div class="title">
                    <div class="tab1" :class="numTabOpen == 1 ? 'tab-checked' : ''" @click="clickTab(1)">
                        <label>
                            <input name="tab" type="radio" :checked="numTabOpen == 1">
                            <img src="../assets/img/face-color.webp" alt="Icon visage homme">
                        </label>
                    </div>
                    <div class="tab2" :class="numTabOpen == 2 ? 'tab-checked' : ''" @click="clickTab(2)">
                        <label>
                            <input name="tab" type="radio" :checked="numTabOpen == 2">
                            <img src="../assets/img/hanger.webp" alt="Icon de ceintre">
                        </label>
                    </div>
                </div>

                <div class="tab-content">
                    <div v-if="numTabOpen == 1">
                        <template v-for="(props, key) in avatarPropertiesHead" :key="key">
                            <AvatarRadioSelector v-if="props.propType == TYPE_PROPS_TXT" :avatar-property=props
                                                 @regenerateAvatar="regenerateAvatar" :is-phone="false"
                                                 :config="config"/>
                            <AvatarColorPicker v-else :avatar-property="props" @regenerateAvatar="regenerateAvatar"
                                               :is-phone="false" :config="config"/>
                        </template>
                    </div>
                    <div v-else>
                        <template v-for="(props, key) in avatarPropertiesClothes" :key="key">
                            <AvatarRadioSelector v-if="props.propType == TYPE_PROPS_TXT" :avatar-property=props
                                                 @regenerateAvatar="regenerateAvatar" :is-phone="false"
                                                 :config="config"/>
                            <AvatarColorPicker v-else :avatar-property="props" @regenerateAvatar="regenerateAvatar"
                                               :is-phone="false" :config="config"/>
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
                    <label for="pseudo">Pseudo </label>
                    <input type="text" id="pseudo" name="pseudo" v-model="refPseudo" @input="atChangePseudo"
                           maxlength="10">
                </div>

                <button class="main" @click.prevent="updateUser" ref="updateButton" :disabled="updateDisabled">
                    Enregistrer
                </button>
            </div>
        </div>

        <div :class="'modify-avatar-phone ' + (classDisplayModif ? 'display' : 'none')" @change="enableButton">

            <div class="avatar-and-pseudo">
                <div class="modify-pseudo">
                    <label for="pseudo">Pseudo </label>
                    <input type="text" id="pseudo" name="pseudo" v-model="refPseudo" @input="atChangePseudo"
                           maxlength="10">
                </div>

                <div :style="{display: displayMsgValid}" class="msg-success">
                    <img :src="validateIcon"
                         alt="Icon de validation de l'enregistrement des données">
                </div>
                <div class="content-avatar" :style="{opacity: opacityAvatar}">
                    <AutoRegeneratedAvatar :avatar-config="config"></AutoRegeneratedAvatar>
                </div>

            </div>

            <div class="tab">
                <div class="title">
                    <template v-for="(props, key) in avatarProperties" :key="key">
                        <div
                                v-if="props.propType != TYPE_PROPS_COLOR || props.propNameSnakeCase == 'bg-color' || props.propNameSnakeCase == 'face-color'"
                                :class="'tab ' + `tab${key} ` + (numTabOpen == key ? 'clicked' : 'not-clicked')">
                            <label>
                                <input @click="clickTab(key)" name="tab-phone" type="radio"
                                       :checked="numTabOpen == key">
                                <ImageModifPhone :image-name="props.propNameSnakeCase"
                                                 :image-name-fr="props.propNameFr"></ImageModifPhone>
                            </label>
                        </div>
                    </template>
                </div>

                <div class="tab-content">
                    <template v-if="avatarProperties[numTabOpen].propType == TYPE_PROPS_TXT">
                        <AvatarRadioSelector :avatar-property=avatarProperties[numTabOpen] :is-phone="true"
                                             @regenerateAvatar="regenerateAvatar"
                                             :config="config"
                        />

                        <AvatarColorPicker
                                v-if="avatarProperties[numTabOpen + 1].propType == TYPE_PROPS_COLOR
                            && avatarProperties[numTabOpen + 1].propNameSnakeCase != 'bg-color'
                            && avatarProperties[numTabOpen + 1].propNameSnakeCase != 'face-color'"
                                :avatar-property="avatarProperties[numTabOpen + 1]"
                                @regenerateAvatar="regenerateAvatar"
                                :is-phone="true"
                                :config="config"/>
                    </template>

                    <template v-else>
                        <AvatarColorPicker :avatar-property="avatarProperties[numTabOpen]"
                                           @regenerateAvatar="regenerateAvatar" :is-phone="true" :config="config"/>
                    </template>

                </div>
            </div>

            <div class="bt-save-phone">
                <button class="main" @click.prevent="updateUser" ref="updateButton" :disabled="updateDisabled">
                    Enregistrer
                </button>
            </div>
        </div>

        <div v-if="saveIsInvalid" class="show-error">
            <p>* Le pseudo doit contenir au moins 3 caractères.</p>
        </div>
    </div>

</template>
<script setup lang="ts">
import { genConfig } from 'holiday-avatar';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import AvatarRadioSelector from '@/components/AvatarRadioSelector.vue';
import { useCarStore } from '@/stores/car';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import AvatarColorPicker from '@/components/AvatarColorPicker.vue';
import api from '@/models/api';
import cancelIcon from '@/assets/img/cancel.png';
import validateIcon from '@/assets/img/checked.png';
import type { Configs } from 'holiday-avatar';
import { useRouter } from 'vue-router';
import ImageModifPhone from '@/components/ImageModifPhone.vue';
import { onBeforeRouteLeave } from 'vue-router';
import type { Ref } from 'vue';

const router = useRouter();

//Initialisation des données de l'utilisateur
const userCar = useCarStore();
const { car } = userCar;
const password = ref('');
const error = ref('');
const saveIsInvalid = ref(false);
const refPseudo = ref(car.pseudo ?? '');
const displayMsgValid = ref('none');
const opacityAvatar = ref('');
const widthScreen = ref(0);
const LIMIT_LARGE_CONTENT = 960;
const nextRoute = ref('');
let isAvatarEquals = ref(true);
let isPseudoEquals = ref(true);

// éléments de l'HTML
const dialog = ref<HTMLDialogElement | null>(null);
const updateDisabled = ref(true);
const dialogExit = ref<HTMLDialogElement | null>(null);

//Config
const config = ref(genConfig(car.avatar));

//Gère le nom du pilote
if (localStorage.getItem('piloteName') && localStorage.getItem('lastPiloteName')) {
  let piloteName = ref('');

  //Récupération des données par l'api
  api.getDataOneCarId(localStorage.getItem('userCarId') || '0').then((v) => {

    //Retour si erreur dans la requête
    if ('message' in v.json) {
      error.value = v.json.message;
      return;
    }

    piloteName.value = v.json.pseudo;

    //Test si les avatars stockés et en ligne sont égaux
    if (localStorage.getItem('lastPiloteName') == piloteName.value) {
      refPseudo.value = localStorage.getItem('piloteName') || '';
    } else {
      refPseudo.value = piloteName.value;
      localStorage.setItem('piloteName', piloteName.value);
      localStorage.setItem('lastPiloteName', piloteName.value);
    }
    isPseudoEquals.value = localStorage.getItem('piloteName') == localStorage.getItem('lastPiloteName');
    updateDisabled.value = isAvatarEquals.value && isPseudoEquals.value;

  });
}

// S'il y a quelque chose dans le localstorage avec, on compare avec les données dans la db
if (localStorage.getItem('configAvatar') && localStorage.getItem('lastConfigAvatar')) {
  let avatarValue: Ref<Configs> = ref(config.value);

  //Récupération des données par l'api
  api.getDataOneCarId(localStorage.getItem('userCarId') || '0').then((v) => {

    //Retour si erreur dans la requête
    if ('message' in v.json) {
      error.value = v.json.message;
      return;
    }

    avatarValue.value = v.json.avatar;

    //Test si les avatars stockés et en ligne sont égaux
    if (avatarEquals(JSON.parse(localStorage.getItem('lastConfigAvatar') || ''), avatarValue.value)) {
      config.value = genConfig(JSON.parse(localStorage.getItem('configAvatar') || ''));
    } else {
      config.value = genConfig(avatarValue.value);
      localStorage.setItem('configAvatar', JSON.stringify(avatarValue.value));
      localStorage.setItem('lastConfigAvatar', JSON.stringify(avatarValue.value));
    }

    //Rempli l'écran des valeurs de l'avatar
    fillAvatarPropreties(config.value);

    isAvatarEquals.value = avatarEquals(config.value, JSON.parse(localStorage.getItem('lastConfigAvatar') || ''));
    updateDisabled.value = isAvatarEquals.value && isPseudoEquals.value;

  });
}


if (!localStorage.getItem('lastConfigAvatar')) {
  localStorage.setItem('lastConfigAvatar', JSON.stringify(config.value));
}

if (!localStorage.getItem('lastPiloteName')) {
  localStorage.setItem('lastPiloteName', refPseudo.value);
}


/**
 * Change la valeur de la taille de l'écran
 */
const changeValueWidthScreen = () => {
  widthScreen.value = window.innerWidth;
};

// Change la classe des éléments des menus pour le petit contenu
const classDisplayModif = computed(() => {
  return widthScreen.value < LIMIT_LARGE_CONTENT;
});

//Ecoute du resize de la page pour changer la largeur
onMounted(() => {
  window.addEventListener('resize', changeValueWidthScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', changeValueWidthScreen);
});

/**
 * Connexion de l'utilisateur
 * @param queryId Identifiant d'url de la voiture
 * @param password mot de passe de la voiture
 */
async function connect(queryId: string, password: string) {
  //Récupération du Token avec le nom et mot de passe de l'URL
  let valueToken = await api.authenticationQueryIdPwd(queryId, password);

  if ('message' in valueToken.json) {
    error.value = valueToken.json.message;
    return;
  }

  //Si le token est valide
  userCar.token = valueToken.json.token;
  localStorage.setItem('carToken', userCar.token);

  dialog.value?.close();
  error.value = '';

  // Test si enregistrement des données de la voiture
  if (refPseudo.value !== car.pseudo || !avatarEquals(config.value, userCar.car.avatar)) {
    await updateUser();
  }
}

/**
 * Compare deux avatars
 * @returns true si les deux avatars sont identiques, false sinon
 */
function avatarEquals(avatar1: any, avatar2: any) {
  let equlality = true;
  Object.keys(avatar1).forEach((key) => {
    if (avatar2 === undefined) {
      return;
    }
    if (avatar1[key as keyof Configs] !== avatar2[key as keyof Configs]) {
      equlality = false;
    }
  });
  return equlality;
}

/**
 * Active le bouton d'enregistrement si les données ont changé
 */
function enableButton() {
  updateDisabled.value = avatarEquals(config.value, userCar.car.avatar) && refPseudo.value.toString() === car.pseudo?.toString();
}

/**
 * Quitter la page de modification
 */
function cancel() {
  router.push({ path: '/' });
}

/**
 * Lancement au changement de pseudo
 */
function atChangePseudo() {
  localStorage.setItem('piloteName', refPseudo.value);
  enableButton();
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
    refPseudo.value = userCar.car.pseudo ?? '';
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

  //Stockage de "l'ancienne" config
  localStorage.setItem('lastConfigAvatar', JSON.stringify(config.value));
  localStorage.setItem('lastPiloteName', refPseudo.value);

  //Ajout du nouvel avatar et du nom dans Pinia
  userCar.car.avatar = JSON.parse(JSON.stringify(config.value));
  userCar.car.pseudo = JSON.parse(JSON.stringify(refPseudo.value));
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

  //Stockage dans le localstorage
  localStorage.setItem('configAvatar', JSON.stringify(config.value));
}

/**
 * Ferme la fenêtre modal
 */
function closeModal() {
  dialogExit.value?.close();
}

/**
 * Ouvre la page cliquée par l'utilisateur
 */
function openOtherPage() {
  closeModal();
  router.push({ path: nextRoute.value });
}

function quitPage() {
  updateDisabled.value = true;

  //Changement de la localstorage
  localStorage.setItem('configAvatar', localStorage.getItem('lastConfigAvatar') || '');
  localStorage.setItem('piloteName', localStorage.getItem('lastPiloteName') || '');

  openOtherPage();
}

function saveAndQuit() {
  updateUser().then(openOtherPage);
}

//Initialisation des constantes
const NAME_HEAD_PROPS = 'head';
const NAME_CLOTHES_PROPS = 'clothes';
const TYPE_PROPS_TXT = 'txt';
const TYPE_PROPS_COLOR = 'color';

let avatarProperties = ref([
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
    propNameFr: 'Type de cheveux',
    propNameEn: 'hairType',
    propNameSnakeCase: 'hair-type',
    propType: TYPE_PROPS_TXT,
    propGroups: NAME_HEAD_PROPS,
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
    propNameFr: 'Couleur de fond',
    propNameEn: 'bgColor',
    propNameSnakeCase: 'bg-color',
    propType: TYPE_PROPS_COLOR,
    propGroups: NAME_CLOTHES_PROPS,
    propValues: [
      {
        propValueEn: '#CCC',
        propValueFr: 'Gris',
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
]);

//Tri de l'interface pour les deux tabs
const avatarPropertiesHead = avatarProperties.value.filter(props => props.propGroups === NAME_HEAD_PROPS);
const avatarPropertiesClothes = avatarProperties.value.filter(props => props.propGroups === NAME_CLOTHES_PROPS);

/**
 * Rempli les valeurs sélectionnées à l'écran en fonction de sa config
 * @param config Config de l'utilisateur
 */
function fillAvatarPropreties(config: Configs) {
  for (let prop of avatarProperties.value) {
    let value = config[prop.propNameEn as keyof Configs];
    if (typeof value !== 'boolean') {
      prop.selectedValueEn = value;
    }
  }
}

/**
 * Fonction qui change la valeur du tab cliqué
 * @param numTab Numéro de la tab cliqué
 */
function clickTab(numTab: number) {
  numTabOpen.value = numTab;
  localStorage.setItem('numTabOpen', numTabOpen.value.toString());
}

//Lancement d'un premier calcul de la largeur de la page
changeValueWidthScreen();

//Si l'id de la voiture n'est pas défini alors retour à la page d'accueil
if (!userCar.car.idCar) {
  router.push('/');
}

// Afficher la fenêtre de connexion si l'utilisateur n'est pas connecté
userCar.token = localStorage.getItem('carToken') || '';
onMounted(() => {
  if (userCar.token === '') {
    dialog.value?.showModal();
  }
});

//Initialisation des variables
let numTabOpen = ref(1);
if (localStorage.getItem('numTabOpen')) {
  numTabOpen.value = Number(localStorage.getItem('numTabOpen'));
}

//Quand on quitte la page alors on confirme si il y a eu des changements
onBeforeRouteLeave((to) => {

  //Récupération de la route cliqué
  nextRoute.value = to.path;

  //Affichage de la page de confirmation
  if (updateDisabled.value === false) {
    dialogExit.value?.showModal();
    return false;
  }
});


</script>

<style scoped lang="scss">
@import "@/assets/css/consts";


.none {
  display: none !important;
}

.display {
  display: flex !important;
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
  padding: 12px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
  width: 120px;
  text-align: center;
  transition: ease-in-out 0.3s;

  &:not(:disabled):hover {
    font-weight: bold;
  }
}

div.modify-avatar-phone {
  flex-direction: column;

  div.content-avatar {
    display: flex;
    justify-content: end;
    transition: all ease-in-out 0.2s;
    margin-top: 10px;
    margin-bottom: 10px;

    div.avatar {
      width: 250px;
      height: 250px;
      box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
      border-radius: 200px;
    }
  }

  .tab-content {
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    max-width: 595px;
    margin: 0 auto;
    border-radius: 7px;
    padding: 2px 10px 8px 10px;
  }

  div.title {
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;

    div:nth-last-child(1) {
      margin-right: 0;
    }

    div:nth-child(1) {
      margin-left: 0;
    }

    .tab, .not-clicked {
      width: 45px;
      padding: 8px;
      border-radius: 5px;
      margin: 5px;
      box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
      filter: grayscale(0.95);
      transition: 0.2s ease-in-out;

    }

    .tab:hover, .clicked {
      filter: none;
      transition: 0.2s ease-in-out;
      cursor: pointer;


      img {
        cursor: pointer;
      }
    }

    input {
      display: none;
    }
  }

  div.bt-save-phone {
    margin: 15px 0;
    display: flex;
    width: 100%;
    justify-content: center;
  }
}

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
  }

  div.tab {
    display: flex;
    width: 60%;
    min-height: 480px;

    div.title {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      border-right: 1px solid rgba(194, 194, 194, 0.45);
      padding-right: 20px;

      > div {
        transition: all 300ms ease-in-out;

        * {
          transition: all 300ms ease-in-out;
        }

        &.tab-checked {
          box-shadow: inset 0 0 27px rgba(50, 50, 93, 0.1), rgba(50, 50, 93, 0) 0 13px 27px -5px;
          cursor: default;

          * {
            cursor: default;

          }
        }

        &:not(.tab-checked):hover {
          box-shadow: inset 0 0 27px rgba(50, 50, 93, 0.1), rgba(50, 50, 93, 0) 0 13px 27px -5px;
        }
      }

      .tab1 {
        margin-bottom: 8px;
      }

      .tab2 {
        margin-top: 8px;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        box-shadow: inset 0 0 27px rgba(50, 50, 93, 0), rgba(50, 50, 93, 0.2) 0 13px 27px -5px;
        border: 1px solid rgba(50, 50, 93, 0.1);
        padding: 4px;
        border-radius: 10px;
        cursor: pointer;


        label {
          cursor: pointer;
          text-align: center;
          width: 50px;
        }

        input {
          display: none;
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


#connection-dialog, #exit-dialog {
  border: none;
  border-radius: 1em;
  padding: 15px 20px;

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
      width: fit-content;
      margin-right: 5px;
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
      margin-bottom: 10px;
    }

    button[type="submit"] {
      background-color: var(--white);
      border: 2px solid var(--accent);
      color: var(--accent);
      padding: 8px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: all ease-in-out 0.2s;
      width: fit-content;
    }

    button[type="submit"]:hover {
      background-color: var(--accent);
      border: 2px solid var(--accent);
      color: var(--white);
      transition: all ease-in-out 0.2s;
    }

    div.button-container {
      display: flex;
      justify-content: center;
    }
  }
}


#exit-dialog {
  width: 500px;
  min-height: 200px;


  div.button-container {
    display: flex;
    justify-content: end;
    margin-top: 35px;

    button {
      margin: 0 5px;
      padding: 5px 3px;
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
  z-index: 900;
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
