<template>
    <fieldset @change="emit('regenerateAvatar',props.avatarProperty.propNameEn, ($event.target as any).value)">
        <div class="img-avatar">
            <img :src="`../src/assets/img/${props.avatarProperty.propNameSnakeCase}.png`"
                :alt="`Icon changeant l'avatar ${props.avatarProperty.propNameFr}`">
        </div>
        <div class="rdbt-choice">
            <template v-for="(item, key) in props.avatarProperty.propValues" :key="key">
                <input type="radio" :name=props.avatarProperty.propNameSnakeCase
                       :id=item.propValueEn.concat(props.avatarProperty.propNameSnakeCase) :value=item.propValueEn
                       :checked="props.avatarProperty.selectedValueEn === item.propValueEn">
                <label :for=item.propValueEn.concat(props.avatarProperty.propNameSnakeCase)
                       class="radio-avatar">{{ item.propValueFr }}</label>
            </template>
        </div>
    </fieldset>
</template>

<script setup lang="ts">
import type { radioProperty } from '@/models/avatar';

const props = defineProps<{ avatarProperty: radioProperty }>();
const emit = defineEmits(['regenerateAvatar']);
</script>

<style scoped lang="scss">
input[type=radio] {
    display: none;
}

.radio-avatar {
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0.5em;
    box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
    border-radius: 3px;
    cursor: pointer;
}

.radio-avatar:hover {
    background-color: var(--blue);
    color: var(--white);
}

input[type=radio]:checked + label {
    background-color: #b9b9b9;
}

fieldset {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 0;
    padding: 0;

    img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    div.img-avatar {
        height: 100%;
    }

    div.rdbt-choice {
        width: fit-content;
        max-width: 320px;
    }
}
</style>