<template>
    <div :class="'classement-element '+ classUserCarElement">
        <div v-if="props.rank > 3" class="rank">{{ props.rank }}</div>
        <div v-else class="rank-image" :style="{ backgroundImage: `url(../src/assets/img/rank${props.rank}.png)`}"></div>
        <AutoRegeneratedAvatar :avatar-config="props.avatar"/>
        <div class="pseudo">{{ props.pseudo }}</div>
        <div class="time">{{ formatTime(props.time) }}</div>
    </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/models/race';
import { useCarStore } from '@/stores/car';
import { ref } from 'vue';
import type { models } from '@/models/api';
import AutoRegeneratedAvatar from '@/components/AutoRegeneratedAvatar.vue';

const props = defineProps<{
  rank: number;
  pseudo: string;
  time: Date;
  avatar: models.Avatar;
}>();

const userCar = useCarStore();
let classUserCarElement = ref('');

// Ajoute une classe si l'élément de l'utilisateur
classUserCarElement.value = userCar.car.pseudo == props.pseudo ? 'user-element' : '';

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
    border: 1px solid var(--blue);

    div.time {
        font-size: 24px;
    }
}

div.avatar {
    width: 45px;
    height: 45px;
}
</style>
