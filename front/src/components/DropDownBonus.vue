<template>
    <div>
        <div :class="`section-name${realised ? ' section-realised' : ''}`" @click="clickBonus = !clickBonus"
             :style="styleDropDown(color)">
            <div class="trophee-name">
                <img :src="trophy" alt="Trophé indiquant l'état de l'activité"
                     :class="props.realised ? '' : 'not-realised'">
                <p>{{ sectionName }}</p>
            </div>
            <img :src="arrow" alt="Flèche pour dérouler l'element" :style="styleImg()"
                 :class="props.realised ? '' : 'not-realised'">
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
import trophy from '@/assets/img/trophy.webp';
import arrow from '@/assets/img/arrows-symbol.webp';

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

/**
 * Retourne le style pour l'élément
 * @param bColorHover Couleur de l'élément
 */
const styleDropDown = (bColorHover: string) => {
  return {
    color: props.realised ? clickBonus.value ? 'var(--white)' : color.value : 'var(--gray)',
    border: props.realised ? `3px solid ${color.value}` : '3px solid var(--gray)',
    opacity: props.realised ? `1` : '0.75',
    backgroundColor: props.realised ? clickBonus.value ? color.value : '' : '#eceef3',
    '--bColor-hover': bColorHover
  };
};

/**
 * Style de l'image du drop down
 */
const styleImg = () => {
  return {
    transform: `rotate(${rotateImage.value}deg)`,
    filter: clickBonus.value && props.realised ? 'grayscale(1) invert(1)' : '',
    '--filter-color': !clickBonus.value && props.realised ? Section.getFilterColor(Section.formatName(props.sectionName)) : 'grayscale(1) invert(1)'
  };
};

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
    transition: all ease-in-out 0.3s;

    &.section-realised img:nth-child(2) {
      filter: var(--filter-color) !important;
    }

    &.section-realised:hover {
      background-color: var(--bColor-hover);
      color: var(--white) !important;

      img:nth-child(2) {
        filter: grayscale(1) invert(1) !important;
      }
    }

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
