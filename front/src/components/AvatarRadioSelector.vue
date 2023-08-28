<template>
    <fieldset class="rd-property" @change="emit('regenerateAvatar',props.avatarProperty.propNameEn, ($event.target as any).value)">
        <div class="img-avatar">
            <img v-if="!isPhone"
                :src="imgRd?.default"
                 :alt="`Icon changeant l'avatar ${props.avatarProperty.propNameFr}`">
        </div>
        <div class="rdbt-choice">
            <template v-for="(item, key) in props.avatarProperty.propValues" :key="key">
                <input type="radio" :name=props.avatarProperty.propNameSnakeCase
                       :id="`${item.propValueEn.concat(props.avatarProperty.propNameSnakeCase)}-${props.isPhone ? 'phone' : 'big'}`" :value=item.propValueEn
                       :checked="props.avatarProperty.selectedValueEn === item.propValueEn">
                <label :for="`${item.propValueEn.concat(props.avatarProperty.propNameSnakeCase)}-${props.isPhone ? 'phone' : 'big'}`"
                       class="radio-avatar">{{ item.propValueFr }}</label>
            </template>
        </div>
    </fieldset>
</template>

<script setup lang="ts">
import type { models } from '@/models/avatar';
import { ref } from 'vue';

const props = defineProps<{
    avatarProperty: models.radioProperty
    isPhone : boolean
}>();

const emit = defineEmits(['regenerateAvatar']);
const imgRd = ref();

//Importation de l'image de selector
async function importImage() {
  return await import(`../assets/img/${props.avatarProperty.propNameSnakeCase}.webp`);
}

//Importation de l'image
importImage().then((v) => {
  imgRd.value = v;
});

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
  width: 100%;
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  border: 0;
  padding: 0;

  img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  div.img-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  div.rdbt-choice {
    width: fit-content;
  }
}
</style>
