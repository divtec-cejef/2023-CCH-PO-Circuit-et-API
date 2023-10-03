<template>
    <fieldset class="color">
        <img v-if="props.property.propNameEn === 'bgColor' && !isPhone " class="background" :src=colorImg
             alt="Palette de couleurs">
        <img v-if="props.property.propNameEn === 'faceColor' && !isPhone " class="faceSkin" :src=faceImg
             alt="Couleur de peau">
        <template v-for="(item, key) in props.property.propValues" :key="key">
            <input type="radio"
                   :name="`${props.property.propNameSnakeCase}-${props.isPhone ? 'phone' : 'big'}`"
                   :id="`${item.value.concat(props.property.propNameSnakeCase)}-${props.isPhone ? 'phone' : 'big'}`"
                   :value=item.value
                   :checked=" props.property.selectedValue === item.value">
            <label :class="`radio-avatar ${item.label}`"
                   :for="`${item.value.concat(props.property.propNameSnakeCase)}-${props.isPhone ? 'phone' : 'big'}`"
                   :style="{backgroundColor: item.value}"
                   @click="() => onChanged(item)"></label>
        </template>
    </fieldset>
</template>

<script setup lang="ts">
import colorImg from '@/assets/img/bg-color.avif';
import faceImg from '@/assets/img/skin.avif';
import type { models } from '@/models/avatar';


const props = defineProps<{
  property: models.RadioProperty<string>,
  isPhone: boolean
}>();

const emit = defineEmits<{
  (e: 'update:property', property: models.RadioProperty): void;
}>();

const onChanged = (item: {value: string, label: string}) => {
  const current = props.property;
  current.selectedValue = item.value;
  emit('update:property',current );
};
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

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.4) 0 5px 20px;
        border: solid 3px var(--white);
    }
}

label.Blanc:hover {
    border: solid 3px var(--black);
}

input[type=radio]:checked + label {
    box-shadow: rgba(0, 0, 0, 0.4) 0 5px 20px;
    border: solid 3px var(--white);

    &.Blanc {
        border: solid 3px var(--black);
    }
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
