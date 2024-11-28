<template>
    <img :src=svg alt="Carte de la division">

    <div ref="icon"
         v-for="(section, index) in sections"
         :key="section.labelSection"
         class="icon"
         :style="{
             top: section.posY + '%',
             left: section.posX + '%',
             backgroundColor: colorScheme !== 'dark' ?
                               (isClicked === index ? getColor(formatName(section.section)) : 'var(--white)') : (
                                isClicked === index ? 'var(--black)' : getColor(formatName(section.section))
                               ),
             '--bColor-hover': colorScheme !== 'dark' ? getColor(formatName(section.section)) : 'var(--black)',
             border: `2px solid ${getColor(formatName(section.section))}`,
         }"
         >

        <img v-if="section.id"
             :src=trophy
             alt="image de trophée (médaille)"
             :style="{filter: `${activatedSection.includes(section.id) ? 'none': 'grayscale(100%)'}`,
                      opacity: `${activatedSection.includes(section.id) ? '1': '0.4'}`}">
        <p
                :style="{
                 color: colorScheme !== 'dark' ?
                         (isClicked === index ? 'var(--white)' : getColor(formatName(section.section))) : (
                          'var(--white)'
                         ),
             }">
            {{ section.labelSection }}
        </p>
    </div>


</template>

<script setup lang="ts">
import svg from '@/assets/img/division-plan.png';
import trophy from '@/assets/img/trophy.webp';
import { ref, watch } from 'vue';
import { usePreferredColorScheme } from '@vueuse/core';
import Section from '@/models/section';

const colorScheme = usePreferredColorScheme();
const getColor = Section.getColor;
const formatName = Section.formatName;

const isClicked = ref<number | null>(null);

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
    isClicked.value = null;
  }
});

</script>

<style scoped lang="scss">
@import "@/assets/css/consts";

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
  padding: clamp(0px, 0.5vw, 7px) 0;
  border-radius: 30px;
  white-space: pre-wrap;
  transition: ease-in-out 0.15s;
  align-items: center;

  p {
    font-size: clamp(1px, 2.25vw, 24px);
    padding: 0 10px 0 0;
    white-space: nowrap;
  }

  img {
    height: clamp(1px, 2.25vw, 20px);
    padding: 0 10px 0 10px;
  }
}

.icon:hover {
  cursor: pointer;
  background-color: var(--bColor-hover)!important;
  p {
    color: var(--white) !important;
  }
}

.bonus-label {
  width: 250px;
  height: 50px;
  padding: 5px;
  background-color: #ffffff;
  border-radius: 10px;
  border: #7f7f7f 1px solid;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

  @media screen and (prefers-color-scheme: dark) {
    box-shadow: none;
    border: $dark-border;
  }
}

</style>
