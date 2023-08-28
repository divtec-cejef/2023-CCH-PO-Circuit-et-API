<template>
    <img :src=svg alt="Carte de la division">

    <div ref="icon" v-for="section in sections" :key="section.labelSection" class="icon" :style="{top: section.posY + '%', left: section.posX + '%', border: `2px solid ${Section.getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))}`}" @mouseover="atHover($event, section)" @mouseleave="atLeave($event)" @click="props.displayLabel($event.target.getBoundingClientRect().left, $event.target.getBoundingClientRect().top, section.labelSection)">
        <img :src=trophy alt="image de trophé (médaille)" :style="{filter: `${activatedSection.includes(section.id) ? 'none': 'grayscale(100%)'}`}">
        <p :style="{color: Section.getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))}">{{section.labelSection}}</p>
    </div>



</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import svg from '../assets/svg/division-plan.svg';
import trophy from '../assets/img/rank1.webp';
import { Section } from '@/models/section';
import Car from '@/models/car';

const props = defineProps<{
    displayLabel: (posx, posy, sectionLabel) => void;
    hideLabel: () => void;
    sections: {
        section: string;
        id: number;
        labelSection: string;
        posX: number;
        posY: number;
    }[];
    activatedSection: number[];
}>();

// const props = defineProps(['displayLabel', 'hideLabel', 'sections', 'activatedSection']);
console.log('test', props.sections);

function atHover(event, section) {
  if (event.target.tagName === 'IMG' || event.target.tagName === 'P') {
    event.target.parentElement.style.background = Section.getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  } else {
    event.target.style.background = Section.getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  }
}

function atLeave(event) {
  event.target.style.background = 'var(--white)';
}

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

<style scoped lang="scss">

template {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.icon {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    background-color: var(--white);
    border: 2px solid var(--pink-divtec);
    padding: clamp(0px, 0.5vw, 7px) 0;
    border-radius: 30px;
    white-space: pre-wrap;
    transition: ease-in-out 0.15s;

    p {
        color: var(--pink-divtec);
        font-size: clamp(1px, 2.25vw, 24px);
        padding: 0 10px 0 0;
        white-space: nowrap;
    }

    img {
        height: clamp(1px, 2.25vw, 24px);
        padding: 0 10px 0 10px;
    }
}

.icon:hover {
    cursor: pointer;
    background-color: var(--pink-divtec);
    p {
        color: var(--white) !important;
    }
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