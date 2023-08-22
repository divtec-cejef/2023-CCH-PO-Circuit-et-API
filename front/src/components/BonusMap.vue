<template>
    <img src="../assets/svg/division-plan.svg" alt="Carte de la division">

    <div ref="icon" v-for="activity in activities" :key="activity.labelActivity" class="icon" :style="{position: 'absolute', top: 'calc('+ activity.posY + '% - 12px)', left: 'calc(' + activity.posX + '% - 12px)'}" @mouseover="props.displayLabel($event.target.getBoundingClientRect().left, $event.target.getBoundingClientRect().top, activity.labelActivity)" @mouseleave="props.hideLabel">
        <img src="../assets/img/clock.webp" alt="Drapeau">
    </div>



</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const props = defineProps(['displayLabel', 'hideLabel', 'activities']);
// const icon = ref<HTMLElement | null>(null);
//
// onMounted(() => {
//   if ('getBoundingClientRect' in icon.value) {
//     console.log(icon.value.getBoundingClientRect().left);
//   } else {
//     console.log('getBoundingClientRect not in icon');
//   }
//   if ('getBoundingClientRect' in icon.value) {
//     console.log(icon.value.getBoundingClientRect().top);
//   }
// });

</script>

<style scoped>

template {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.icon {
    width: 24px;
}

.icon:hover {
    width: 30px;
    cursor: pointer;
}

.bonus-label {
    width: 250px;
    height: 50px;
    padding : 5px;
    background-color: #ffffff;
    border-radius: 10px;
    border: #7f7f7f 1px solid;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
}

</style>