<template>
    <div :class="'classement-element '+ classUserCarElement"
         :style="{ backgroundColor: backgroundColor, color : colorFont}">
        <div v-if="props.rank > PODIUM" class="rank">{{ props.rank }}</div>
        <div v-else class="rank-image" :style="{ backgroundImage: `url(${backgroundImage?.default})`}">
        </div>
        <AutoRegeneratedAvatar :avatar-config="props.avatar"/>
        <div class="pseudo">{{ props.pseudo }}</div>
        <div class="time">{{ formatTime(props.time) }}</div>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/models/race';
import { useCarStore } from '@/stores/car';
import { ref } from 'vue';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';
import type { Avatar } from 'holiday-avatar';


const props = defineProps<{
  rank: number;
  pseudo: string;
  time: Date;
  avatar: typeof Avatar;
}>();

const userCar = useCarStore();
const classUserCarElement = ref('');
const PODIUM = 4;
const backgroundImage = ref();
const backgroundColor = ref(userCar.car.pseudo == props.pseudo ? userCar.car.avatar?.bgColor?.toString() : 'var(--white)');
const colorFont = ref( 'var(--black)');

if (userCar.car.avatar?.bgColor?.toString() != '#FFF' && userCar.car.pseudo == props.pseudo) {
  colorFont.value = 'var(--white)';
}

// Ajoute une classe si l'élément de l'utilisateur
classUserCarElement.value = userCar.car.pseudo == props.pseudo ? 'user-element' : '';

//Importation de l'image de rank
async function importImage() {
  return await import(`../assets/img/rank${props.rank}.webp`);
}

//Si l'utilisateur est sur le podium alors import image
if (props.rank <= PODIUM) {
  importImage().then((v) => {
    backgroundImage.value = v;
  });
}

</script>

<style scoped lang="scss">
div.classement-element {
  font-size: 14px;
  margin: 10px 10px;
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

div.user-element {
  //background-color: var(--light-green);

}

div.avatar {
  width: 45px;
  height: 45px;
}
</style>
