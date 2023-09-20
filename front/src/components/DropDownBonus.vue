<template>
    <div>
        <div class="section-name" @click="clickBonus = !clickBonus" :style="{
            color : props.realised ? color : 'var(--gray)',
            border: props.realised ? `3px solid ${color}` : '3px solid var(--gray)',
            opacity: props.realised ? `1` : '0.75',
            backgroundColor: props.realised ? '' : '#e5e8ec'

        }">
            <div class="trophee-name">
                <img :src="trophy" alt="Trophé indiquant l'état de l'activité"
                     :class="props.realised ? '' : 'not-realised'">
                <p>{{ sectionName }}</p>
            </div>
            <img :src="arrow" alt="Flèche pour dérouler l'element" :style="{transform: `rotate(${rotateImage}deg)`}" :class="props.realised ? '' : 'not-realised'">
        </div>
        <transition>
            <div class="activity" v-if="clickBonus">
                <ul>
                    <li v-for="(activity, key) in listActivity" :key="key">
                        <img :src="trophy" alt="Image de trophée" :class="activity.realised ? '' : 'not-realised'">
                        {{ activity.name }}
                    </li>
                </ul>
            </div>
        </transition>
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
  realised: boolean,
  listActivity: {
    name: string,
    realised: boolean
  }[]
}>();

const clickBonus = ref(false);
const color = ref(getColor(Section.formatName(props.sectionName)));

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

  div.trophee-name {
    display: flex;
    align-items: center;

  }

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
    font-weight: bold;
    text-align: left;

    img {
      width: 15px;
      height: 15px;
      margin-right: 10px;
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

  .not-realised {
    opacity: 0.8;
    filter: grayscale(1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>