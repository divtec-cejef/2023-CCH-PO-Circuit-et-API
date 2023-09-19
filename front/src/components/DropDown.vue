<template>
    <div>
        <div class="button-checked" @click="clickDropDown">
            <h3>{{ props.name }}</h3>
            <img :src=arrowImg alt="Flèche dépliable"
                 :style="{transform: `rotate(${rotateImage}deg)`}">
        </div>

        <div :class="`drop-down-content ${dropDownIsClicked ? '' : 'hide-drop-down'}`">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import arrowImg from '../assets/img/arrow.webp';

const props = defineProps<{
  name: string;
}>();

/**
 * Stocke si le dropdown est cliqué ou non dans le localstorage
 */
function clickDropDown() {
  dropDownIsClicked.value = !dropDownIsClicked.value;
  localStorage.setItem('dropDownIsClicked', dropDownIsClicked.value ? 'true' : 'false');
}

// Retourne l'angle de l'image en fonction de si l'utilisateur a cliqué
const rotateImage = computed(() => {
  return dropDownIsClicked.value ? '90' : '0';
});

//Si aucune donnée n'est dans le localstorage alors initialisation
let dropDownIsClicked = ref(localStorage.getItem('dropDownIsClicked') == 'true');
if (!localStorage.getItem('dropDownIsClicked')) {
  localStorage.setItem('dropDownIsClicked', 'false');
  dropDownIsClicked.value = false;
}
</script>

<style scoped lang="scss">
div {
  width: 100%;
}

div.button-checked {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  width: 100%;

  img {
    width: 12px;
    height: 12px;
    margin-left: 15px;
    margin-top: 2px;
      transition: all ease-in-out 0.3s;
  }
}

h3 {
  margin: 0;
}

input {
  display: none;
}


div.drop-down-content {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

div.hide-drop-down {
  display: none;
}

</style>