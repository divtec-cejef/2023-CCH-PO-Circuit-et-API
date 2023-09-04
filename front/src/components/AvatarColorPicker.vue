<template>
    <fieldset class="color"
              @change="emit('regenerateAvatar',props.avatarProperty.propNameEn, ($event.target as any).value)">
        <img v-if="avatarProperty.propNameEn == 'bgColor' && !isPhone " class="background" :src=colorImg
             alt="Palette de couleurs">
        <img v-if="avatarProperty.propNameEn == 'faceColor' && !isPhone " class="faceSkin" :src=faceImg
             alt="Couleur de peau">
        <template v-for="(item, key) in props.avatarProperty.propValues" :key="key">
            <input type="radio"
                   :name="`${props.avatarProperty.propNameSnakeCase}-${props.isPhone ? 'phone' : 'big'}`"
                   :id="`${item.propValueEn.concat(props.avatarProperty.propNameSnakeCase)}-${props.isPhone ? 'phone' : 'big'}`"
                   :value=item.propValueEn
                   :checked=" props.config[props.avatarProperty.propNameEn as keyof Configs] === item.propValueEn">
            <label :class="`radio-avatar ${item.propValueFr}`"
                   :for="`${item.propValueEn.concat(props.avatarProperty.propNameSnakeCase)}-${props.isPhone ? 'phone' : 'big'}`"
                   :style="{'background-color': item.propValueEn}"></label>
        </template>
    </fieldset>
</template>

<script setup lang="ts">
import colorImg from '../assets/img/bg-color.webp';
import faceImg from '../assets/img/skin.webp';
import type { models } from '@/models/avatar';
import type { Configs } from 'holiday-avatar';

const props = defineProps<{
  avatarProperty: models.radioProperty,
  isPhone: boolean
  config: Configs
}>();

const emit = defineEmits(['regenerateAvatar']);


</script>

<style scoped>
input[type=radio] {
    display: none;
}

.radio-avatar {
    display: inline-block;
    height: 30px;
    width: 32px;
    margin: 0.5em;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.25) 0 5px 15px;
}

.radio-avatar:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 0 5px 20px;

    border: solid 3px var(--white);
}

input[type=radio]:checked + label.Blanc {
    border: solid 3px var(--black);
}

label.Blanc:hover {
    border: solid 3px var(--black);
}

input[type=radio]:checked + label {
    box-shadow: rgba(0, 0, 0, 0.4) 0 5px 20px;
    border: solid 3px var(--white);
}

fieldset {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border: 0;
    padding: 0;
    width: 100%;
}

img.background, img.faceSkin {
    width: 25px;
    height: 25px;
}

img.faceSkin {
    margin-right: 5px;
}
</style>
