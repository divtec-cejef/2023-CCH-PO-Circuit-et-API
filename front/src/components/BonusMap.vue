<template>
    <img :src=svg alt="Carte de la division">

    <div ref="icon"
         v-for="(section, index) in sections"
         :key="section.labelSection"
         class="icon"
         :style="{
             top: section.posY + '%',
             left: section.posX + '%',
             border: `2px solid ${getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))}`
         }"
         @mouseover="event => atHover(event, section)"
         @mouseleave="event => atLeave(event, index)"
         @click="(event) => {
             unHighlight()
             props.displayLabel(
             (event?.target as HTMLDivElement)?.getBoundingClientRect().left,
             (event?.target as HTMLDivElement)?.getBoundingClientRect().top,
             section.labelSection)
             isClicked = index
             highlight(event, section)
         }">

        <img v-if="section.id !== -1"
            :src=trophy
            alt="image de trophé (médaille)"
            :style="{filter: `${activatedSection.includes(section.id) ? 'none': 'grayscale(100%)'}`}">
        <p
            :style="{color: getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')), paddingLeft: `${section.id === -1 ? '10px' : 'unset'}`}">
            {{section.labelSection}}
        </p>
    </div>



</template>

<script setup lang="ts">
import svg from '../assets/img/division-plan.png';
import trophy from '../assets/img/trophy.png';
import { Section } from '@/models/section';
import { ref, watch } from 'vue';

const getColor = Section.getColor;

const isClicked = ref<number | null>(null);
let targetOld: HTMLDivElement | null = null;

const props = defineProps<{
    displayLabel: (posx: number, posy: number, sectionLabel: string) => void;
    sections: {
        section: string;
        id: number;
        labelSection: string;
        posX: number;
        posY: number;
    }[];
    activatedSection: number[];
    unClicked: boolean;
    noActivitySections: number[];
}>();

watch(() => props.unClicked, (unClicked) => {
  if (unClicked) {
    unHighlight();
  }
});

function unHighlight() {
  if (targetOld) {
    targetOld.classList.remove('clicked');
    targetOld.style.background = 'var(--white)';
    isClicked.value = null;
  }
}

function highlight(event, section: { section: string; id: number; labelSection: string; posX: number; posY: number; }) {
  let target: HTMLDivElement = ((event.target as HTMLElement).tagName === 'IMG' || (event.target as HTMLElement).tagName === 'P') ?
    ((event.target as HTMLElement).parentElement as HTMLDivElement) :
    (event.target as HTMLDivElement);
  target.style.background = Section.getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  target.classList.add('clicked');
  targetOld = target;
}

// const props = defineProps(['displayLabel', 'hideLabel', 'sections', 'activatedSection']);

function atHover(event: Event, section: { section: string; id: number; labelSection: string; posX: number; posY: number; }) {
  let target: HTMLDivElement = ((event.target as HTMLElement).tagName === 'IMG' || (event.target as HTMLElement).tagName === 'P') ?
    ((event.target as HTMLElement).parentElement as HTMLDivElement) :
    (event.target as HTMLDivElement);
  target.style.background = Section.getColor(section.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
}

function atLeave(event: Event, index: number) {
  if (index !== isClicked.value) {
    (event.target as HTMLDivElement).style.background = 'var(--white)';
  }
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
    height: calc(100vh - var(--height-screen-diff) - 70px) !important;
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

div.clicked {
    p {
        color: var(--white) !important;
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