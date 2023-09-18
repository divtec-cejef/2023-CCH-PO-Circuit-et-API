<template>
    <div>
        <div class="section-name" @click="clickBonus = !clickBonus" :style="{
            backgroundColor : color
        }">{{ sectionName }}
            <img :src="arrow" alt="Flèche pour dérouler l'element" :style="{transform: `rotate(${rotateImage}deg)`}">
        </div>
        <div class="activity" v-if="clickBonus">
            <ul>
                <li v-for="(activity, key) in listeActivity" :key="key">
                    <img :src="trophy" alt="Image de trophée">
                    {{ activity }}
                </li>
            </ul>
        </div>
    </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Section from '@/models/section';
import getColor = Section.getColor;
import trophy from '@/assets/img/trophy.png';
import arrow from '@/assets/img/arrows-symbol.png';

const props = defineProps<{
  sectionName: string,
  listeActivity: string[]
}>();

const clickBonus = ref(false);
const color = ref(getColor(props.sectionName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')));

// Retourne l'angle de l'image en fonction de si l'utilisateur a cliqué
const rotateImage = computed(() => {
  return clickBonus.value ? '90' : '0';
});
</script>

<style scoped lang="scss">
@import "src/assets/css/consts";

ul {
  padding-left: 20px;

  li {
    list-style: none;
  }
}

div {
  width: 100%;

  > div.section-name {
    color: var(--white);
    padding: 10px;
    box-shadow: $default-shadow;
    border-radius: 10px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 15px;
      margin-right: 4px;
      transition: all ease-in-out 0.3s;
    }

    ul {
      padding: 0;
    }
  }

  div.activity {
    margin-top: 10px;

    ul li {
      display: flex;
      align-items: center;

      img {
        width: 17px;
        margin-right: 10px;
      }
    }
  }
}
</style>