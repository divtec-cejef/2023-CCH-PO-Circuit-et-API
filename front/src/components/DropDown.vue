<template>
    <div>
        <div class="button-checked" @click="clickDropDown">
            <h3>{{ props.name }}</h3>
            <img :src=arrowImg alt="Flèche dépliable"
                 :style="{transform: `rotate(${rotateImage}deg)`}">
        </div>

        <div :class="`drop-down-content ${props.dropDownClicked ? '' : 'hide-drop-down'}`">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, computed } from 'vue';
import arrowImg from '@/assets/img/arrow.webp';

const props = defineProps<{
  name: string
  dropDownClicked: boolean;
}>();


/**
 * Emit pour le clique
 */
const clickDropDown = () => {
  emit('update:dropDownClicked', !props.dropDownClicked);
};


const emit = defineEmits<{
  (e: 'update:dropDownClicked', clicked: boolean): void
}>();


// Retourne l'angle de l'image en fonction de si l'utilisateur a cliqué
const rotateImage = computed(() => {
  return props.dropDownClicked ? '90' : '0';
});

</script>

<style scoped lang="scss">
@import '@/assets/css/consts.scss';
div {
  width: 100%;
}

div.button-checked {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;
  border-radius: 20px;
  box-shadow: $default-shadow;
  width: 100%;
  transition: all ease-in-out 0.2s;


  @media screen and (prefers-color-scheme: dark) {
    box-shadow: none;
    border: $dark-border;
  }

  img {
    width: 12px;
    height: 12px;
    margin-left: 15px;
    margin-top: 2px;
    transition: all ease-in-out 0.3s;

    @media screen and (prefers-color-scheme: dark) {
      filter: invert(1);
    }
  }

  &:hover {
    opacity: 0.75;
  }
}

h3 {
  margin: 0;
}

input {
  display: none;
}


div.drop-down-content {
  margin-top: 18px;
  display: flex;
  justify-content: center;

}

div.hide-drop-down {
  display: none;
}

</style>
