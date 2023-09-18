<template>
    <div :class="'classement-element '+ classUserCarElement"
         :style="{ backgroundColor: backgroundColor || undefined, color : colorFont || undefined}"
         @click="clickClassementElement">
        <div v-if="props.rank > PODIUM" class="rank">#{{ props.rank }}</div>
        <div v-else class="rank-image" :style="{ backgroundImage: `url(${backgroundImage?.default})`}">
        </div>
        <AutoRegeneratedAvatar :avatar-config="props.avatar"/>
        <div class="pseudo">{{ props.pseudo }}</div>
        <div class="time">{{ formatTime(props.time) }}</div>
    </div>
    <div v-if="dropDownClicked" class="user-content">
        <template v-if="codeBackApi == api.ReturnCodes.Success">
            <div>
                <h3>Meilleure course</h3>
                Vitesse : {{ raceData.races[0].speed}}
                Temps inter :
            </div>

            <div>
                <video src=""></video>
            </div>

            <div>
                Bonus
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/models/race';
import { useCarStore } from '@/stores/car';
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import type { Configs } from 'holiday-avatar';
import { usePreferredColorScheme } from '@vueuse/core';
import Color from 'color';
import api from '@/models/api';
import type { models } from '@/models/api';

const props = defineProps<{
  idCar: number | string;
  rank: number;
  pseudo: string;
  time: Date;
  avatar: Configs;
}>();

const userCar = useCarStore();
const dropDownClicked = ref(false);
const classUserCarElement = ref('');
const PODIUM = 4;
const backgroundImage = ref();
const raceData: Ref<models.parsedData.RacesData> | Ref<undefined> | Ref<models.rawData.Error> = ref();
const codeBackApi = ref();
const backgroundColor = ref(userCar.car.pseudo == props.pseudo ?
  userCar.car.avatar?.bgColor?.toString() :
  null);


const colorFont = computed<string | null>(() => {
  if (userCar.car.pseudo == props.pseudo) {
    if (Color(userCar.car.avatar?.bgColor ?? '#000').hsl().lightness() > 50) {
      return colorScheme.value === 'dark' ? '#000' : null;
    } else {
      return colorScheme.value === 'dark' ? null : '#fff';
    }
  } else {
    return null;
  }
});

const colorScheme = usePreferredColorScheme();

// Ajoute une classe si l'élément de l'utilisateur
classUserCarElement.value = userCar.car.pseudo == props.pseudo ? 'user-element' : '';

//Importation de l'image de rank
async function importImage() {
  return await import(`../assets/img/rank${props.rank}.webp`);
}

function clickClassementElement() {
  api.getAllRaceOneCar(props.idCar).then(v => {
    codeBackApi.value = v.status;
    if (v.status == api.ReturnCodes.Success) {
      raceData.value = v.json;
      console.log(raceData.value);
    }
  }
  );

  dropDownClicked.value = !dropDownClicked.value;
}

//Si l'utilisateur est sur le podium alors import image
if (props.rank <= PODIUM) {
  importImage().then((v) => {
    backgroundImage.value = v;
  });
}

</script>

<style scoped lang="scss">
@import "src/assets/css/consts";

div.classement-element {
  font-size: 14px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: start;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  padding: 9px;
  border-radius: 4px;

  div.rank-image {
    width: 30px;
    height: 30px;
    background-size: 30px 30px;
    background-position: center;
    margin-right: 10px;
    margin-left: 5px;
  }

  div.rank {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-right: 10px;
  }

  img {
    width: 30px;
    margin-left: 12px;
  }

  div.pseudo {
    flex: 10;
    margin-left: 15px;
  }

  div.time {
    justify-self: end;
    font-family: 'Digital-7 Mono', sans-serif;
    font-size: 22px;
  }
}

div.avatar {
  width: 45px;
  height: 45px;
}

.user-content {
  border-radius: 4px;
  box-shadow: $default-shadow;
  padding: 15px;
}

.user-content {
  display: flex;

  > div {
    flex: 1;
  }
}
</style>
