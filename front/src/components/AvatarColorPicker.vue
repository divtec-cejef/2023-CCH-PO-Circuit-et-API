<template>
    <fieldset class="color"
              @change="emit('regenerateAvatar',props.avatarProperty.propNameEn, ($event.target as any).value)">
        <img v-if="avatarProperty.propNameEn == 'bgColor' " class="background" src="../assets/img/color.png" alt="Palette de couleurs">
        <template v-for="(item, key) in props.avatarProperty.propValues" :key="key">
            <input type="radio"
                   :name=props.avatarProperty.propNameSnakeCase
                   :id=item.propValueEn.concat(props.avatarProperty.propNameSnakeCase)
                   :value=item.propValueEn
                   :checked="props.avatarProperty.selectedValueEn === item.propValueEn">
            <label :class="`radio-avatar ${item.propValueFr}`"
                   :for=item.propValueEn.concat(props.avatarProperty.propNameSnakeCase)
                   :style="{'background-color': item.propValueEn}"></label>
        </template>
    </fieldset>
</template>

<script setup lang="ts">
import type { radioProperty } from '@/models/avatar';

const props = defineProps<{ avatarProperty: radioProperty }>();

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
    border: solid 3px var(--white);
}

input[type=radio]:checked + label.Blanc {
    border: solid 3px var(--black);
}
label.Blanc:hover {
    border: solid 3px var(--black);
}

input[type=radio]:checked + label {
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

img.background {
    width: 25px;
    height: 25px;
}
</style>